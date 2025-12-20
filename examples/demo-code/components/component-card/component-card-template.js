/**
 * Template function for the component-card component
 * @param {Object} props - The properties to use in the template
 * @param {string} props.title - The card title
 * @param {string} props.icon - The card icon
 * @returns {string} The HTML template
 */
export const template = ({ title, icon }) => `
    <article class="card">
        <header class="card-header">
            ${icon ? `<span class="card-icon" aria-hidden="true">${icon}</span>` : ''}
            <h2>${title}</h2>
        </header>
        <div class="card-content">
            <slot></slot>
        </div>
    </article>
`; 
