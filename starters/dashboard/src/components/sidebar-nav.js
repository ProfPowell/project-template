/**
 * Sidebar Navigation
 * Dashboard navigation menu
 */

import { auth } from '../app/auth.js';
import { router } from '../app/router.js';

class SidebarNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.updateActiveLink();

    // Update active link on navigation
    window.addEventListener('popstate', () => this.updateActiveLink());
  }

  updateActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.shadowRoot.querySelectorAll('.nav-link');

    links.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === currentPath ||
        (href !== '/' && currentPath.startsWith(href));
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  render() {
    const user = auth.getUser();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          block-size: 100%;
        }

        .sidebar-header {
          padding: var(--space-4, 1rem);
          border-block-end: 1px solid var(--border, #e5e5e5);
        }

        .logo {
          font-size: var(--text-lg, 1.125rem);
          font-weight: var(--font-bold, 700);
          color: var(--primary, #1e40af);
          text-decoration: none;
        }

        .nav {
          flex: 1;
          padding: var(--space-4, 1rem);
        }

        .nav-section {
          margin-block-end: var(--space-4, 1rem);
        }

        .nav-section-title {
          font-size: var(--text-xs, 0.75rem);
          font-weight: var(--font-semibold, 600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted, #666);
          margin-block-end: var(--space-2, 0.5rem);
          padding-inline: var(--space-3, 0.75rem);
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
          padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
          color: var(--text, #1a1a1a);
          text-decoration: none;
          border-radius: var(--radius-md, 0.375rem);
          font-size: var(--text-sm, 0.875rem);
          transition: background-color 0.15s;
        }

        .nav-link:hover {
          background: var(--hover-bg, #f5f5f5);
        }

        .nav-link.active {
          background: var(--primary-bg, #eff6ff);
          color: var(--primary, #1e40af);
          font-weight: var(--font-medium, 500);
        }

        .nav-icon {
          inline-size: 1.25rem;
          block-size: 1.25rem;
          opacity: 0.7;
        }

        .nav-link.active .nav-icon {
          opacity: 1;
        }

        .sidebar-footer {
          padding: var(--space-4, 1rem);
          border-block-start: 1px solid var(--border, #e5e5e5);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
        }

        .user-avatar {
          inline-size: 2rem;
          block-size: 2rem;
          border-radius: 50%;
          background: var(--primary, #1e40af);
          color: var(--primary-foreground, #fff);
          display: grid;
          place-items: center;
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-medium, 500);
        }

        .user-details {
          flex: 1;
          min-inline-size: 0;
        }

        .user-name {
          font-size: var(--text-sm, 0.875rem);
          font-weight: var(--font-medium, 500);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: var(--text-xs, 0.75rem);
          color: var(--text-muted, #666);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <header class="sidebar-header">
        <a href="/" data-link class="logo">{{DISPLAY_NAME}}</a>
      </header>

      <nav class="nav">
        <div class="nav-section">
          <ul class="nav-list">
            <li>
              <a href="/dashboard" data-link class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/list" data-link class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                Items
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h2 class="nav-section-title">Settings</h2>
          <ul class="nav-list">
            <li>
              <a href="/settings" data-link class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <footer class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">${user?.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div class="user-details">
            <div class="user-name">${user?.name || 'User'}</div>
            <div class="user-email">${user?.email || ''}</div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('sidebar-nav', SidebarNav);
