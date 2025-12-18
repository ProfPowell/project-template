export const styles = `
    :host {
        display: inline-block;
        margin: var(--size-2);
    }

    .theme-picker {
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
        padding-right: var(--size-8);
        border: 1px solid var(--surface-3);
        border-radius: var(--radius-2);
        background-color: var(--surface-1);
        color: var(--text-1);
        cursor: pointer;
        appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, var(--text-2) 50%),
                         linear-gradient(135deg, var(--text-2) 50%, transparent 50%);
        background-position: 
            calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px);
        background-size: 
            5px 5px,
            5px 5px;
        background-repeat: no-repeat;
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

    /* Theme preview styles */
    option {
        background-color: var(--surface-1);
        color: var(--text-1);
        padding: var(--size-2);
    }
`; 
