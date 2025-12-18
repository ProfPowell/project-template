export const styles = `
    :host {
        display: block;
        font-family: var(--font-sans);
        margin: var(--size-3) 0;
    }
    
    input {
        padding: var(--size-2);
        font-size: var(--font-size-2);
        margin-inline-end: var(--size-2);
        border: 1px solid var(--surface-3);
        border-radius: var(--radius-2);
        background-color: var(--surface-1);
        color: var(--text-1);
    }
    
    input:hover {
        border-color: var(--surface-4);
    }
    
    input:focus {
        outline: 2px solid var(--brand);
        outline-offset: 2px;
        border-color: var(--brand);
    }
    
    button {
        padding: var(--size-2);
        font-size: var(--font-size-2);
        background-color: var(--brand);
        color: var(--surface-1);
        border: none;
        border-radius: var(--radius-2);
        cursor: pointer;
        transition: background-color var(--transition-ease-out);
    }
    
    button:hover {
        background-color: var(--brand-hover, var(--blue-7));
    }
    
    button:focus {
        outline: 2px solid var(--brand);
        outline-offset: 2px;
    }
    
    button:active {
        transform: scale(0.98);
    }
`;
