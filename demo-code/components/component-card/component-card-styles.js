/**
 * Styles for the component-card component
 */
export const styles = `
    :host {
        display: block;
    }

    .card {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--size-3);
        background-color: var(--surface-2);
        border-radius: var(--radius-2);
        border: 1px solid var(--surface-3);
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: var(--size-2);
        margin-bottom: var(--size-3);
    }

    .card-icon {
        width: var(--size-4);
        height: var(--size-4);
        color: var(--text-2);
    }

    h2 {
        color: var(--text-1);
        font-size: var(--font-size-3);
        margin: 0;
    }

    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    ::slotted(*) {
        display: block;
        width: 100%;
    }
`; 
