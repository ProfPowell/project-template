# Observability Skill

Implement runtime error tracking, performance monitoring, and user issue detection to catch problems in production.

---

## When to Use

- Adding error handling to JavaScript applications
- Implementing performance monitoring
- Setting up error reporting
- Creating user feedback mechanisms
- Debugging production issues

---

## Global Error Handling

### Window Error Handler

Catch unhandled errors globally:

```javascript
/**
 * Global error handler for uncaught exceptions
 * @param {string} message - Error message
 * @param {string} source - Script URL
 * @param {number} lineno - Line number
 * @param {number} colno - Column number
 * @param {Error} error - Error object
 */
window.onerror = function(message, source, lineno, colno, error) {
  const errorData = {
    type: 'uncaught-error',
    message,
    source,
    lineno,
    colno,
    stack: error?.stack,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  // Send to reporting endpoint
  reportError(errorData);

  // Return false to allow default error handling
  return false;
};
```

### Unhandled Promise Rejections

Catch unhandled promise rejections:

```javascript
/**
 * Handle unhandled promise rejections
 */
window.onunhandledrejection = function(event) {
  const errorData = {
    type: 'unhandled-rejection',
    message: event.reason?.message || String(event.reason),
    stack: event.reason?.stack,
    timestamp: Date.now(),
    url: window.location.href
  };

  reportError(errorData);
};
```

### Error Reporting Function

Send errors to your backend:

```javascript
/**
 * Queue and send error reports
 * Uses navigator.sendBeacon for reliability on page unload
 */
const errorQueue = [];
let flushTimeout = null;

function reportError(errorData) {
  // Add to queue
  errorQueue.push(errorData);

  // Debounce flush
  if (!flushTimeout) {
    flushTimeout = setTimeout(flushErrors, 1000);
  }
}

function flushErrors() {
  if (errorQueue.length === 0) return;

  const errors = errorQueue.splice(0, errorQueue.length);
  flushTimeout = null;

  // Use sendBeacon for reliability (works during page unload)
  const success = navigator.sendBeacon(
    '/api/errors',
    JSON.stringify({ errors })
  );

  // Fallback to fetch if sendBeacon fails
  if (!success) {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errors }),
      keepalive: true
    }).catch(() => {
      // Re-queue on failure
      errorQueue.unshift(...errors);
    });
  }
}

// Flush on page unload
window.addEventListener('beforeunload', flushErrors);
```

---

## Error Boundaries (Components)

### Web Component Error Boundary

Wrap components to catch render errors:

```javascript
/**
 * Error boundary custom element
 * Catches errors in child components and displays fallback
 */
class ErrorBoundary extends HTMLElement {
  connectedCallback() {
    this.originalContent = this.innerHTML;

    // Catch errors in child component lifecycle
    this.addEventListener('error', this.handleError.bind(this), true);
  }

  handleError(event) {
    event.stopPropagation();

    const error = event.error || event;
    console.error('ErrorBoundary caught:', error);

    // Report error
    reportError({
      type: 'component-error',
      message: error.message,
      stack: error.stack,
      component: this.getAttribute('name') || 'unknown',
      timestamp: Date.now()
    });

    // Show fallback UI
    this.showFallback(error);
  }

  showFallback(error) {
    const fallback = this.querySelector('[slot="fallback"]');

    if (fallback) {
      this.innerHTML = '';
      this.appendChild(fallback.cloneNode(true));
    } else {
      this.innerHTML = `
        <div class="error-fallback" role="alert">
          <p>Something went wrong.</p>
          <button type="button" onclick="this.closest('error-boundary').retry()">
            Try again
          </button>
        </div>
      `;
    }
  }

  retry() {
    this.innerHTML = this.originalContent;
  }
}

customElements.define('error-boundary', ErrorBoundary);
```

**Usage:**

```html
<error-boundary name="user-profile">
  <user-profile user-id="123"></user-profile>
  <template slot="fallback">
    <p>Could not load user profile.</p>
  </template>
</error-boundary>
```

---

## Try/Catch Patterns

### Async Function Wrapper

Wrap async functions with consistent error handling:

```javascript
/**
 * Wrap async function with error handling
 * @param {Function} fn - Async function to wrap
 * @param {object} context - Additional context for error reports
 * @returns {Function} - Wrapped function
 */
function withErrorHandling(fn, context = {}) {
  return async function(...args) {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      reportError({
        type: 'caught-error',
        message: error.message,
        stack: error.stack,
        context: {
          ...context,
          functionName: fn.name,
          arguments: args.map(a => typeof a)
        },
        timestamp: Date.now()
      });

      throw error;  // Re-throw for caller to handle
    }
  };
}

// Usage
const fetchUser = withErrorHandling(
  async function fetchUser(id) {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  { feature: 'user-profile' }
);
```

### Safe JSON Parse

Parse JSON without throwing:

```javascript
/**
 * Safely parse JSON with error reporting
 * @param {string} json - JSON string
 * @param {*} fallback - Default value on failure
 * @returns {*} - Parsed value or fallback
 */
function safeJsonParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch (error) {
    reportError({
      type: 'json-parse-error',
      message: error.message,
      jsonPreview: json?.slice(0, 100),
      timestamp: Date.now()
    });
    return fallback;
  }
}
```

---

## Performance Monitoring

### Performance Marks and Measures

Track timing of operations:

```javascript
/**
 * Performance timing utilities
 */
const perf = {
  /**
   * Mark start of an operation
   * @param {string} name - Operation name
   */
  start(name) {
    performance.mark(`${name}-start`);
  },

  /**
   * Mark end and measure duration
   * @param {string} name - Operation name
   * @returns {number} - Duration in milliseconds
   */
  end(name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const entries = performance.getEntriesByName(name, 'measure');
    const duration = entries[entries.length - 1]?.duration || 0;

    // Clean up marks
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);

    return duration;
  },

  /**
   * Time an async operation
   * @param {string} name - Operation name
   * @param {Function} fn - Async function to time
   * @returns {Promise<*>} - Function result
   */
  async time(name, fn) {
    this.start(name);
    try {
      return await fn();
    } finally {
      const duration = this.end(name);

      // Report slow operations (> 1 second)
      if (duration > 1000) {
        reportPerformance({
          type: 'slow-operation',
          name,
          duration,
          timestamp: Date.now()
        });
      }
    }
  }
};

// Usage
await perf.time('fetch-user-data', async () => {
  const user = await fetchUser(123);
  return user;
});
```

### Web Vitals Reporting

Report Core Web Vitals:

```javascript
/**
 * Report Web Vitals metrics
 * Uses web-vitals library or native PerformanceObserver
 */
function reportWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lcp = entries[entries.length - 1];
    reportPerformance({
      metric: 'LCP',
      value: lcp.startTime,
      element: lcp.element?.tagName
    });
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // First Input Delay
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      reportPerformance({
        metric: 'FID',
        value: entry.processingStart - entry.startTime,
        eventType: entry.name
      });
    });
  }).observe({ type: 'first-input', buffered: true });

  // Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });

  // Report CLS on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportPerformance({
        metric: 'CLS',
        value: clsValue
      });
    }
  });
}

/**
 * Send performance data
 */
function reportPerformance(data) {
  navigator.sendBeacon('/api/performance', JSON.stringify({
    ...data,
    url: window.location.href,
    timestamp: Date.now()
  }));
}

// Initialize on load
if (document.readyState === 'complete') {
  reportWebVitals();
} else {
  window.addEventListener('load', reportWebVitals);
}
```

---

## Network Failure Handling

### Fetch with Retry

Resilient fetch with automatic retry:

```javascript
/**
 * Fetch with automatic retry and timeout
 * @param {string} url - Request URL
 * @param {object} options - Fetch options
 * @param {object} retryOptions - Retry configuration
 * @returns {Promise<Response>}
 */
async function fetchWithRetry(url, options = {}, retryOptions = {}) {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 10000,
    retryOn = [500, 502, 503, 504]
  } = retryOptions;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Add timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Check if should retry based on status
      if (retryOn.includes(response.status) && attempt < retries) {
        await delay(retryDelay * Math.pow(2, attempt));  // Exponential backoff
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;

      // Report network errors
      reportError({
        type: 'network-error',
        url,
        attempt: attempt + 1,
        message: error.message,
        timestamp: Date.now()
      });

      // Don't retry on abort (user cancelled)
      if (error.name === 'AbortError' && attempt === 0) {
        throw error;
      }

      // Retry with backoff
      if (attempt < retries) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    }
  }

  throw lastError;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Offline Detection

Handle offline/online transitions:

```javascript
/**
 * Offline state management
 */
const networkStatus = {
  online: navigator.onLine,
  listeners: new Set(),

  init() {
    window.addEventListener('online', () => this.setOnline(true));
    window.addEventListener('offline', () => this.setOnline(false));
  },

  setOnline(online) {
    this.online = online;
    this.listeners.forEach(fn => fn(online));

    if (!online) {
      reportError({
        type: 'network-offline',
        timestamp: Date.now()
      });
    }
  },

  onChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
};

networkStatus.init();

// Usage
networkStatus.onChange((online) => {
  if (online) {
    // Retry pending requests
    retryPendingRequests();
  } else {
    // Show offline indicator
    showOfflineNotice();
  }
});
```

---

## Console Error Tracking

Intercept console errors for reporting:

```javascript
/**
 * Console interceptor for error tracking
 * Use sparingly - can affect debugging experience
 */
function interceptConsole() {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = function(...args) {
    reportError({
      type: 'console-error',
      args: args.map(stringifyArg),
      timestamp: Date.now()
    });
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    // Only report in production
    if (process.env.NODE_ENV === 'production') {
      reportError({
        type: 'console-warn',
        args: args.map(stringifyArg),
        timestamp: Date.now()
      });
    }
    originalWarn.apply(console, args);
  };
}

function stringifyArg(arg) {
  if (arg instanceof Error) {
    return { message: arg.message, stack: arg.stack };
  }
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}
```

---

## User Issue Reporting

### Feedback Widget

Allow users to report issues with context:

```javascript
/**
 * User feedback reporter
 */
class FeedbackReporter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button type="button" class="feedback-trigger" aria-label="Report an issue">
        <x-icon name="message-circle"></x-icon>
      </button>
      <dialog class="feedback-dialog">
        <form method="dialog">
          <h2>Report an Issue</h2>
          <label>
            What happened?
            <textarea name="description" required rows="4"></textarea>
          </label>
          <label>
            <input type="checkbox" name="includeScreenshot"/>
            Include screenshot
          </label>
          <div class="actions">
            <button type="button" value="cancel">Cancel</button>
            <button type="submit" value="submit">Submit</button>
          </div>
        </form>
      </dialog>
    `;

    this.dialog = this.querySelector('dialog');
    this.form = this.querySelector('form');

    this.querySelector('.feedback-trigger').onclick = () => this.open();
    this.form.onsubmit = (e) => this.submit(e);
  }

  open() {
    this.dialog.showModal();
  }

  async submit(event) {
    event.preventDefault();
    const formData = new FormData(this.form);

    const report = {
      type: 'user-feedback',
      description: formData.get('description'),
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Include screenshot if requested
    if (formData.get('includeScreenshot')) {
      try {
        report.screenshot = await this.captureScreenshot();
      } catch {
        // Screenshot capture failed, continue without it
      }
    }

    // Include recent errors
    report.recentErrors = errorQueue.slice(-5);

    // Send report
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });

    this.dialog.close();
    this.showConfirmation();
  }

  async captureScreenshot() {
    // Requires html2canvas or similar library
    if (typeof html2canvas === 'function') {
      const canvas = await html2canvas(document.body);
      return canvas.toDataURL('image/png', 0.5);
    }
    return null;
  }

  showConfirmation() {
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'feedback-toast';
    toast.textContent = 'Thank you for your feedback!';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

customElements.define('feedback-reporter', FeedbackReporter);
```

**Usage:**

```html
<feedback-reporter></feedback-reporter>
```

---

## Initialization Script

Complete observability setup:

```javascript
/**
 * Initialize all observability features
 * Include in page head or early in body
 */
(function initObservability() {
  // Only in production
  if (window.location.hostname === 'localhost') return;

  // Global error handlers
  window.onerror = handleError;
  window.onunhandledrejection = handleRejection;

  // Performance monitoring
  if ('PerformanceObserver' in window) {
    reportWebVitals();
  }

  // Network status
  networkStatus.init();

  // Console interception (optional)
  // interceptConsole();

  console.log('[Observability] Initialized');
})();
```

---

## Checklist

When implementing observability:

- [ ] Add global window.onerror handler
- [ ] Add unhandledrejection handler
- [ ] Wrap async functions with error handling
- [ ] Use error boundaries for components
- [ ] Implement performance marks for key operations
- [ ] Report Core Web Vitals (LCP, FID, CLS)
- [ ] Add retry logic for network requests
- [ ] Handle offline/online transitions
- [ ] Provide user feedback mechanism
- [ ] Set up error reporting endpoint
- [ ] Test error handling in development
- [ ] Don't expose stack traces to end users
