/**
 * Stat Card
 * Metric display card with icon and trend
 */

class StatCard extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'trend', 'icon'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  get value() {
    return this.getAttribute('value') || '0';
  }

  get trend() {
    return this.getAttribute('trend') || '';
  }

  get icon() {
    return this.getAttribute('icon') || '';
  }

  get trendDirection() {
    if (!this.trend) return 'neutral';
    return this.trend.startsWith('+') ? 'up' : this.trend.startsWith('-') ? 'down' : 'neutral';
  }

  getIcon() {
    const icons = {
      users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
      'shopping-cart': '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
      'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
      activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
    };

    return icons[this.icon] || icons.activity;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-4, 1rem);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-block-end: var(--space-2, 0.5rem);
        }

        .label {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted, #666);
          font-weight: var(--font-medium, 500);
        }

        .icon {
          inline-size: 1.5rem;
          block-size: 1.5rem;
          color: var(--text-muted, #666);
        }

        .value {
          font-size: var(--text-2xl, 1.5rem);
          font-weight: var(--font-bold, 700);
          color: var(--text, #1a1a1a);
          line-height: 1.2;
        }

        .trend {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1, 0.25rem);
          font-size: var(--text-sm, 0.875rem);
          margin-block-start: var(--space-1, 0.25rem);
        }

        .trend-up {
          color: var(--success, #16a34a);
        }

        .trend-down {
          color: var(--error, #dc2626);
        }

        .trend-neutral {
          color: var(--text-muted, #666);
        }

        .trend-icon {
          inline-size: 1rem;
          block-size: 1rem;
        }
      </style>

      <div class="card">
        <div class="card-header">
          <span class="label">${this.label}</span>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${this.getIcon()}
          </svg>
        </div>
        <div class="value">${this.value}</div>
        ${this.trend ? `
          <div class="trend trend-${this.trendDirection}">
            ${this.trendDirection === 'up' ? `
              <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            ` : this.trendDirection === 'down' ? `
              <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
            ` : ''}
            <span>${this.trend}</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);
