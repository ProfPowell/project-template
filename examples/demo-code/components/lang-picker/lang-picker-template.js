export const template = (t, supportedLanguages) => `
    <div class="lang-picker">
        <label for="lang-select">${t.label}</label>
        <select id="lang-select">
            ${Object.entries(supportedLanguages)
                .map(([code, name]) => 
                    `<option value="${code}">${name}</option>`
                ).join('')}
        </select>
    </div>
`; 
