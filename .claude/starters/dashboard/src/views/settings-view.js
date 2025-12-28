/**
 * Settings View
 * User and application settings
 */

import { auth } from '../app/auth.js';
import { api } from '../app/api.js';

class SettingsView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.getElementById('settings-form');
    form?.addEventListener('submit', this.handleSubmit.bind(this));

    const logoutBtn = this.shadowRoot.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => auth.logout());
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Saving...';

    try {
      await api.patch('/users/me', {
        name: formData.get('name'),
        email: formData.get('email'),
      });

      this.showMessage('Settings saved successfully', 'success');
    } catch (error) {
      this.showMessage(error.message || 'Failed to save settings', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Save Changes';
    }
  }

  showMessage(text, type) {
    const message = this.shadowRoot.getElementById('message');
    message.textContent = text;
    message.className = `message message-${type}`;
    setTimeout(() => {
      message.textContent = '';
      message.className = 'message';
    }, 3000);
  }

  render() {
    const user = auth.getUser() || { name: '', email: '' };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: var(--space-6, 1.5rem);
        }

        .page-header {
          margin-block-end: var(--space-6, 1.5rem);
        }

        .page-header h1 {
          font-size: var(--text-2xl, 1.5rem);
          font-weight: var(--font-bold, 700);
          margin: 0;
        }

        .settings-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-6, 1.5rem);
          max-inline-size: 32rem;
        }

        .settings-card h2 {
          font-size: var(--text-lg, 1.125rem);
          font-weight: var(--font-semibold, 600);
          margin: 0 0 var(--space-4, 1rem);
        }

        .form-group {
          margin-block-end: var(--space-4, 1rem);
        }

        .form-group label {
          display: block;
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-medium, 500);
          margin-block-end: var(--space-1, 0.25rem);
        }

        .form-group input {
          inline-size: 100%;
          padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
          border: 1px solid var(--border, #e5e5e5);
          border-radius: var(--radius-md, 0.375rem);
          font-size: var(--text-base, 1rem);
        }

        .form-group input:focus {
          outline: 2px solid var(--primary, #1e40af);
          outline-offset: 2px;
        }

        .button-group {
          display: flex;
          gap: var(--space-3, 0.75rem);
          margin-block-start: var(--space-6, 1.5rem);
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

        .btn-primary:hover {
          background: var(--primary-hover, #1e3a8a);
        }

        .btn-danger {
          background: transparent;
          color: var(--error, #dc2626);
          border: 1px solid var(--error, #dc2626);
        }

        .btn-danger:hover {
          background: var(--error, #dc2626);
          color: #fff;
        }

        .message {
          padding: var(--space-3, 0.75rem);
          border-radius: var(--radius-md, 0.375rem);
          margin-block-end: var(--space-4, 1rem);
        }

        .message:empty {
          display: none;
        }

        .message-success {
          background: var(--success-bg, #dcfce7);
          color: var(--success, #16a34a);
          border: 1px solid var(--success, #16a34a);
        }

        .message-error {
          background: var(--error-bg, #fee2e2);
          color: var(--error, #dc2626);
          border: 1px solid var(--error, #dc2626);
        }
      </style>

      <header class="page-header">
        <h1>Settings</h1>
      </header>

      <div class="settings-card">
        <h2>Profile Settings</h2>

        <div id="message" class="message" role="alert"></div>

        <form id="settings-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" value="${user.name}" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="${user.email}" required />
          </div>

          <div class="button-group">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <button type="button" id="logout-btn" class="btn btn-danger">Log Out</button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('settings-view', SettingsView);
