/**
 * Home View
 * Landing page for the application
 */

import { BaseView } from './base-view.js';

class HomeView extends BaseView {
  static get tag() {
    return 'home-view';
  }

  render() {
    return `
      <header class="hero">
        <h1>Welcome to {{DISPLAY_NAME}}</h1>
        <p class="lead">{{DESCRIPTION}}</p>
        <div class="actions">
          <a href="/about" data-link class="button-primary">Learn More</a>
          <a href="/settings" data-link class="button-secondary">Settings</a>
        </div>
      </header>

      <section class="features">
        <h2>Features</h2>
        <div class="feature-grid">
          <article class="feature-card">
            <h3>Offline Support</h3>
            <p>Works without an internet connection thanks to service workers.</p>
          </article>
          <article class="feature-card">
            <h3>Fast Navigation</h3>
            <p>Client-side routing for instant page transitions.</p>
          </article>
          <article class="feature-card">
            <h3>Installable</h3>
            <p>Add to your home screen for a native app experience.</p>
          </article>
        </div>
      </section>
    `;
  }

  styles() {
    return `
      ${super.styles()}

      .hero {
        text-align: center;
        padding: var(--spacing-3xl, 4rem) var(--spacing-lg, 1.5rem);
        background: var(--surface-alt, #f5f5f5);
        margin: calc(-1 * var(--spacing-lg, 1.5rem));
        margin-bottom: var(--spacing-2xl, 3rem);
      }

      .lead {
        font-size: var(--font-size-lg, 1.25rem);
        max-width: 40rem;
        margin: 0 auto var(--spacing-xl, 2rem);
      }

      .actions {
        display: flex;
        gap: var(--spacing-md, 1rem);
        justify-content: center;
        flex-wrap: wrap;
      }

      .button-primary,
      .button-secondary {
        display: inline-flex;
        padding: var(--spacing-sm, 0.5rem) var(--spacing-lg, 1.5rem);
        border-radius: var(--radius-md, 0.25rem);
        text-decoration: none;
        font-weight: 500;
      }

      .button-primary {
        background: var(--primary, #1e40af);
        color: white;
      }

      .button-secondary {
        background: transparent;
        color: var(--primary, #1e40af);
        border: 1px solid var(--primary, #1e40af);
      }

      .features h2 {
        text-align: center;
        margin-bottom: var(--spacing-xl, 2rem);
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg, 1.5rem);
      }

      .feature-card {
        padding: var(--spacing-lg, 1.5rem);
        background: var(--surface, white);
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.5rem);
      }

      .feature-card h3 {
        margin-bottom: var(--spacing-sm, 0.5rem);
      }
    `;
  }
}

customElements.define(HomeView.tag, HomeView);
