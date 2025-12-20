# Site Scaffold Skill

Generate standardized static site structures with all essential files for production deployment.

## When to Use

Invoke this skill when:
- Creating a new static website from scratch
- Setting up a demo or prototype site
- Need consistent site structure with SEO, PWA, and accessibility foundations

## Standard Site Structure

```
site-name/
├── index.html              # Homepage
├── 404.html                # Not found error page
├── 500.html                # Server error page
├── robots.txt              # Search engine directives
├── humans.txt              # Credits and team info
├── sitemap.xml             # XML sitemap for crawlers
├── manifest.json           # PWA web app manifest
├── browserconfig.xml       # Windows tile configuration
├── assets/
│   ├── css/
│   │   └── main.css        # Stylesheet with @layer structure
│   ├── js/
│   │   └── main.js         # Progressive enhancement script
│   └── images/
│       ├── favicon.svg     # Vector favicon (modern browsers)
│       ├── favicon.ico     # Legacy favicon (16x16, 32x32)
│       ├── apple-touch-icon.png  # iOS icon (180x180)
│       ├── icon-192.png    # PWA icon small
│       ├── icon-512.png    # PWA icon large
│       └── og-image.png    # Social sharing (1200x630)
└── pages/                  # Additional site pages
```

## Required Configuration

When scaffolding, collect these values:
- **Site name**: Display name (e.g., "Acme Corporation")
- **Site URL**: Production URL (e.g., "https://acme.example.com")
- **Description**: Site description for meta tags (max 160 chars)
- **Author**: Author or organization name
- **Theme color**: Primary brand color (hex, e.g., "#1e40af")
- **Background color**: PWA background (hex, e.g., "#ffffff")

## HTML Template Structure

All HTML pages must follow XHTML-strict patterns:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>

  <!-- Primary Meta -->
  <title>Page Title - Site Name</title>
  <meta name="description" content="Page description here"/>
  <meta name="author" content="Author Name"/>

  <!-- Favicon Set -->
  <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml"/>
  <link rel="icon" href="/assets/images/favicon.ico" sizes="32x32"/>
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png"/>

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json"/>
  <meta name="theme-color" content="#1e40af"/>

  <!-- Open Graph -->
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://example.com/"/>
  <meta property="og:title" content="Page Title"/>
  <meta property="og:description" content="Page description"/>
  <meta property="og:image" content="https://example.com/assets/images/og-image.png"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="Page Title"/>
  <meta name="twitter:description" content="Page description"/>
  <meta name="twitter:image" content="https://example.com/assets/images/og-image.png"/>

  <!-- Styles -->
  <link rel="stylesheet" href="/assets/css/main.css"/>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header>
    <!-- Site header with logo and navigation -->
  </header>

  <main id="main">
    <!-- Page content -->
  </main>

  <footer>
    <!-- Site footer -->
  </footer>

  <script src="/assets/js/main.js" defer=""></script>
</body>
</html>
```

## CSS Structure

Use @layer for cascade control:

```css
@layer reset, tokens, base, layout, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  img { max-width: 100%; height: auto; display: block; }
}

@layer tokens {
  :root {
    /* Colors */
    --color-primary: #1e40af;
    --color-text: #1f2937;
    --color-bg: #ffffff;

    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --space-xl: 4rem;

    /* Typography */
    --font-family: system-ui, -apple-system, sans-serif;
    --font-size-base: 1rem;
    --line-height: 1.6;

    /* Layout */
    --max-width: 1200px;
    --border-radius: 6px;
  }
}

@layer base {
  body {
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: var(--line-height);
    color: var(--color-text);
    background-color: var(--color-bg);
  }
}
```

## JavaScript Pattern

Use DOMContentLoaded with init function:

```javascript
/**
 * Site initialization
 * Progressive enhancement - site works without JS
 */
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Initialize site features
  initNavigation();
  initForms();
}

function initNavigation() {
  // Mobile menu, dropdowns, etc.
}

function initForms() {
  // Form validation, submission handling
}
```

## robots.txt Template

```
# Robots.txt for Site Name
# https://example.com/robots.txt

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://example.com/sitemap.xml

# Crawl-delay (optional, for rate limiting)
# Crawl-delay: 10
```

## sitemap.xml Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## humans.txt Template

```
/* TEAM */
Site: Site Name
Contact: email@example.com
Location: City, Country

/* SITE */
Last update: 2025/01/01
Language: English
Standards: HTML5, CSS3, JavaScript ES6+
IDE: Various
```

## manifest.json Template

```json
{
  "name": "Site Name",
  "short_name": "Site",
  "description": "Site description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e40af",
  "icons": [
    {
      "src": "/assets/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## browserconfig.xml Template

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/assets/images/icon-192.png"/>
      <TileColor>#1e40af</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

## Error Pages

### 404.html
- Friendly message explaining page not found
- Link back to homepage
- Search functionality (optional)
- Same header/footer as main site

### 500.html
- Apologetic message for server error
- No dynamic content (static fallback)
- Contact information for support
- Minimal dependencies (inline critical CSS)

## Favicon Requirements

| File | Size | Purpose |
|------|------|---------|
| favicon.svg | Vector | Modern browsers, scales perfectly |
| favicon.ico | 32x32 | Legacy browser support |
| apple-touch-icon.png | 180x180 | iOS home screen |
| icon-192.png | 192x192 | Android/PWA small |
| icon-512.png | 512x512 | Android/PWA large, splash |
| og-image.png | 1200x630 | Social sharing preview |

## Checklist

When scaffolding a new site:

- [ ] Create directory structure
- [ ] Generate index.html with full meta tags
- [ ] Generate 404.html and 500.html error pages
- [ ] Create robots.txt with sitemap reference
- [ ] Create sitemap.xml with homepage entry
- [ ] Create humans.txt with team info
- [ ] Create manifest.json for PWA
- [ ] Create browserconfig.xml for Windows
- [ ] Set up CSS with @layer structure
- [ ] Set up JS with init pattern
- [ ] Create/copy favicon set
- [ ] Validate all HTML files pass linters
