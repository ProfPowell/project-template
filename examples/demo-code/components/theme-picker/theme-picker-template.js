export const template = (t) => `
    <div class="theme-picker">
        <label for="theme-select">${t.label}</label>
        <select id="theme-select">
            ${Object.entries(t.themes)
                .map(([value, label]) => 
                    `<option value="${value}">${label}</option>`
                ).join('')}
        </select>
    </div>
`; 
