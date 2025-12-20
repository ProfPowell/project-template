export const styles = `
    :host {
        display: block;
        margin: var(--size-3);
    }

    details {
        border: 1px solid var(--surface-3);
        border-radius: var(--radius-2);
        background-color: var(--surface-1);
    }

    summary {
        padding: var(--size-2) var(--size-3);
        font-family: var(--font-mono);
        color: var(--text-1);
        cursor: pointer;
    }

    summary:hover {
        background-color: var(--surface-2);
    }

    textarea {
        display: block;
        width: calc(100% - var(--size-4));
        margin: var(--size-2);
        padding: var(--size-2);
        font-family: var(--font-mono);
        font-size: var(--font-size-1);
        color: var(--text-2);
        background-color: var(--surface-2);
        border: 1px solid var(--surface-3);
        border-radius: var(--radius-2);
        resize: vertical;
    }
`; 
