/**
 * Dashboard Layout
 * Main layout with sidebar and content area
 */

class DashboardLayout extends HTMLElement {
  static get observedAttributes() {
    return ['sidebar'];
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

  get sidebarPosition() {
    return this.getAttribute('sidebar') || 'left';
  }

  render() {
    const isRight = this.sidebarPosition === 'right';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: ${isRight ? '1fr 16rem' : '16rem 1fr'};
          min-block-size: 100dvh;
        }

        @media (max-width: 768px) {
          :host {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
        }

        .sidebar {
          order: ${isRight ? 2 : 1};
          background: var(--surface, #fff);
          border-inline-end: ${isRight ? 'none' : '1px solid var(--border, #e5e5e5)'};
          border-inline-start: ${isRight ? '1px solid var(--border, #e5e5e5)' : 'none'};
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .sidebar {
            order: 1;
            border-inline: none;
            border-block-end: 1px solid var(--border, #e5e5e5);
          }
        }

        .content {
          order: ${isRight ? 1 : 2};
          background: var(--background, #f5f5f5);
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .content {
            order: 2;
          }
        }

        ::slotted([slot="sidebar"]) {
          block-size: 100%;
        }
      </style>

      <aside class="sidebar">
        <slot name="sidebar"></slot>
      </aside>

      <div class="content">
        <slot name="content"></slot>
      </div>
    `;
  }
}

customElements.define('dashboard-layout', DashboardLayout);
