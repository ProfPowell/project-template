export const styles = `
    :host {
        display: inline-block;
        margin: var(--size-2);
    }

    .lang-picker {
        display: flex;
        align-items: center;
        gap: var(--size-2);
    }

    label {
        color: var(--text-2);
        font-size: var(--font-size-1);
        font-family: var(--font-sans);
    }

    select {
        font-size: var(--font-size-1);
        font-family: var(--font-sans);
        padding: var(--size-1) var(--size-2);
        border: 1px solid var(--surface-3);
        border-radius: var(--radius-2);
        background-color: var(--surface-1);
        color: var(--text-1);
        cursor: pointer;
    }

    select:hover {
        border-color: var(--surface-4);
    }

    select:focus {
        outline: 2px solid var(--brand);
        outline-offset: 2px;
        border-color: var(--brand);
    }

    select:active {
        transform: scale(0.98);
    }
`; 
