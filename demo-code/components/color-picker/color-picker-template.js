export const template = (t) => `
    <div class="color-picker">
        <label for="color-select">${t.label}</label>
        <select id="color-select">
            ${Object.entries(t.colors)
                .map(([value, label]) => 
                    `<option value="${value}" style="color: ${value}">${label}</option>`
                ).join('')}
        </select>
    </div>
`; 
