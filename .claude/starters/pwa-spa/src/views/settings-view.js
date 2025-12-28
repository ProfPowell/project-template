/**
 * Settings View
 * User preferences and configuration
 */

import { BaseView } from './base-view.js';
import { store } from '../app/store.js';

class SettingsView extends BaseView {
  static get tag() {
    return 'settings-view';
  }

  render() {
    return `
      <h1>Settings</h1>
      <p class="lead">Customize your experience.</p>

      <form id="settings-form">
        <fieldset>
          <legend>Appearance</legend>

          <div class="form-field">
            <label for="theme">Color Theme</label>
            <select id="theme" name="theme">
              <option value="auto">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Notifications</legend>

          <div class="form-field checkbox">
            <input type="checkbox" id="notifications" name="notifications" />
            <label for="notifications">Enable notifications</label>
          </div>
        </fieldset>

        <div class="form-actions">
          <button type="submit" class="button-primary">Save Settings</button>
        </div>
      </form>
    `;
  }

  styles() {
    return `
      ${super.styles()}

      .lead {
        margin-bottom: var(--spacing-2xl, 3rem);
      }

      form {
        max-width: 32rem;
      }

      fieldset {
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-lg, 0.5rem);
        padding: var(--spacing-lg, 1.5rem);
        margin-bottom: var(--spacing-lg, 1.5rem);
      }

      legend {
        font-weight: 600;
        padding: 0 var(--spacing-sm, 0.5rem);
      }

      .form-field {
        margin-bottom: var(--spacing-md, 1rem);
      }

      .form-field label {
        display: block;
        margin-bottom: var(--spacing-xs, 0.25rem);
        font-weight: 500;
      }

      .form-field.checkbox {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm, 0.5rem);
      }

      .form-field.checkbox label {
        margin-bottom: 0;
        font-weight: normal;
      }

      select,
      input[type="text"] {
        width: 100%;
        padding: var(--spacing-sm, 0.5rem);
        border: 1px solid var(--border, #e5e5e5);
        border-radius: var(--radius-md, 0.25rem);
        font: inherit;
      }

      .form-actions {
        margin-top: var(--spacing-xl, 2rem);
      }

      .button-primary {
        padding: var(--spacing-sm, 0.5rem) var(--spacing-lg, 1.5rem);
        background: var(--primary, #1e40af);
        color: white;
        border: none;
        border-radius: var(--radius-md, 0.25rem);
        font: inherit;
        font-weight: 500;
        cursor: pointer;
      }

      .button-primary:hover {
        background: var(--primary-hover, #1e3a8a);
      }
    `;
  }

  onMount() {
    const form = this.$('#settings-form');

    // Load saved settings
    this.loadSettings();

    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.saveSettings();
    });
  }

  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');

    const theme = this.$('#theme');
    const notifications = this.$('#notifications');

    if (settings.theme) {
      theme.value = settings.theme;
    }
    if (settings.notifications !== undefined) {
      notifications.checked = settings.notifications;
    }
  }

  saveSettings() {
    const theme = this.$('#theme').value;
    const notifications = this.$('#notifications').checked;

    const settings = { theme, notifications };
    localStorage.setItem('settings', JSON.stringify(settings));

    // Apply theme
    document.documentElement.dataset.mode = theme === 'auto' ? '' : theme;

    // Store in global state
    store.set('settings', settings);

    alert('Settings saved!');
  }
}

customElements.define(SettingsView.tag, SettingsView);
