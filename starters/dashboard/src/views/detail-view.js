/**
 * Detail View
 * Single item detail page
 */

import { api } from '../app/api.js';
import { router } from '../app/router.js';

class DetailView extends HTMLElement {
  static get observedAttributes() {
    return ['id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.item = null;
  }

  connectedCallback() {
    this.render();
    this.loadItem();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'id' && oldValue !== newValue) {
      this.loadItem();
    }
  }

  async loadItem() {
    const id = this.getAttribute('id');
    if (!id) return;

    try {
      this.item = await api.get(`/items/${id}`);
      this.updateContent();
    } catch (error) {
      console.error('Failed to load item:', error);
      this.showError('Item not found');
    }
  }

  updateContent() {
    if (!this.item) return;

    const title = this.shadowRoot.querySelector('.item-title');
    const content = this.shadowRoot.querySelector('.item-content');

    if (title) title.textContent = this.item.name || 'Untitled';
    if (content) {
      content.innerHTML = `
        <dl class="detail-list">
          <div class="detail-item">
            <dt>ID</dt>
            <dd>${this.item.id}</dd>
          </div>
          <div class="detail-item">
            <dt>Status</dt>
            <dd><span class="status status-${this.item.status}">${this.item.status}</span></dd>
          </div>
          <div class="detail-item">
            <dt>Created</dt>
            <dd>${new Date(this.item.created).toLocaleDateString()}</dd>
          </div>
          <div class="detail-item">
            <dt>Description</dt>
            <dd>${this.item.description || 'No description'}</dd>
          </div>
        </dl>
      `;
    }
  }

  showError(message) {
    const content = this.shadowRoot.querySelector('.item-content');
    if (content) {
      content.innerHTML = `<p class="error">${message}</p>`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: var(--space-6, 1.5rem);
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: var(--space-4, 1rem);
          margin-block-end: var(--space-6, 1.5rem);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
          color: var(--text-muted, #666);
          text-decoration: none;
          font-size: var(--text-sm, 0.875rem);
        }

        .back-link:hover {
          color: var(--primary, #1e40af);
        }

        .item-title {
          font-size: var(--text-2xl, 1.5rem);
          font-weight: var(--font-bold, 700);
          margin: 0;
        }

        .detail-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-6, 1.5rem);
        }

        .detail-list {
          display: grid;
          gap: var(--space-4, 1rem);
          margin: 0;
        }

        .detail-item {
          display: grid;
          grid-template-columns: 8rem 1fr;
          gap: var(--space-2, 0.5rem);
        }

        .detail-item dt {
          font-weight: var(--font-medium, 500);
          color: var(--text-muted, #666);
        }

        .detail-item dd {
          margin: 0;
        }

        .status {
          display: inline-block;
          padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
          border-radius: var(--radius-sm, 0.25rem);
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-medium, 500);
        }

        .status-active {
          background: var(--success-bg, #dcfce7);
          color: var(--success, #16a34a);
        }

        .status-pending {
          background: var(--warning-bg, #fef3c7);
          color: var(--warning, #d97706);
        }

        .status-inactive {
          background: var(--error-bg, #fee2e2);
          color: var(--error, #dc2626);
        }

        .error {
          color: var(--error, #dc2626);
          text-align: center;
          padding: var(--space-4, 1rem);
        }

        .actions {
          display: flex;
          gap: var(--space-3, 0.75rem);
          margin-block-start: var(--space-6, 1.5rem);
          padding-block-start: var(--space-6, 1.5rem);
          border-block-start: 1px solid var(--border, #e5e5e5);
        }

        .btn {
          padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
          border-radius: var(--radius-md, 0.375rem);
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-medium, 500);
          cursor: pointer;
        }

        .btn-primary {
          background: var(--primary, #1e40af);
          color: var(--primary-foreground, #fff);
          border: none;
        }

        .btn-secondary {
          background: transparent;
          color: var(--text, #1a1a1a);
          border: 1px solid var(--border, #e5e5e5);
        }

        .btn-danger {
          background: transparent;
          color: var(--error, #dc2626);
          border: 1px solid var(--error, #dc2626);
        }
      </style>

      <header class="page-header">
        <a href="/list" data-link class="back-link">
          <span aria-hidden="true">&larr;</span>
          Back to list
        </a>
      </header>

      <h1 class="item-title">Loading...</h1>

      <div class="detail-card">
        <div class="item-content">
          <p>Loading item details...</p>
        </div>

        <div class="actions">
          <button type="button" class="btn btn-primary">Edit</button>
          <button type="button" class="btn btn-secondary">Duplicate</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
    `;
  }
}

customElements.define('detail-view', DetailView);
