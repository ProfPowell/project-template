# Scaffold PWA/SPA

Generate a single-page application with Web Components using the `starters/pwa-spa/` template.

## Template Location
`starters/pwa-spa/`

## Prompts to Collect

Read `starters/pwa-spa/manifest.yaml` for the full prompt configuration.

Key prompts:
- `PROJECT_NAME` - Folder name (required, lowercase with hyphens)
- `DISPLAY_NAME` - Application name (required)
- `DESCRIPTION` - App description (required, max 160 chars)
- `THEME_COLOR` - Theme color (default: #1e40af)
- `BACKGROUND_COLOR` - Background color (default: #ffffff)
- `API_BASE_URL` - API endpoint (default: /api)
- `ENABLE_AUTH` - Include authentication (default: false)
- `INITIAL_ROUTES` - Comma-separated routes (default: home,about,settings)

## Instructions

1. Use AskUserQuestion to collect the required prompts
2. Create the project directory at `examples/[PROJECT_NAME]/`
3. Copy all files from `starters/pwa-spa/` to the project
4. Copy shared resources from `starters/_shared/`:
   - `styles/_reset.css` → `src/styles/_reset.css`
   - `styles/_tokens.css` → `src/styles/_tokens.css`
   - `components/x-icon/` → `src/components/x-icon/`
5. Replace all `{{PLACEHOLDER}}` values with collected prompts
6. Handle conditional sections `{{#IF_ENABLE_AUTH}}...{{/IF_ENABLE_AUTH}}`
7. Generate view components based on INITIAL_ROUTES
8. Register routes in main.js

## Skills to Apply
- javascript-author
- custom-elements
- service-worker
- api-client
- state-management
- accessibility-checker
