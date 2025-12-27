# Scaffold Dashboard

Generate an admin dashboard using the `starters/dashboard/` template.

## Template Location
`starters/dashboard/`

## Prompts to Collect

Read `starters/dashboard/manifest.yaml` for the full prompt configuration.

Key prompts:
- `PROJECT_NAME` - Folder name (required, lowercase with hyphens)
- `DISPLAY_NAME` - Dashboard name (required)
- `DESCRIPTION` - Description (required, max 160 chars)
- `API_BASE_URL` - API endpoint (default: /api)
- `AUTH_TYPE` - jwt/session/oauth (default: jwt)
- `INITIAL_VIEWS` - Comma-separated views (default: dashboard,settings,list,detail)
- `ENABLE_CHARTS` - Include chart component (default: true)
- `SIDEBAR_POSITION` - left/right (default: left)
- `THEME_COLOR` - Theme color (default: #1e40af)

## Instructions

1. Use AskUserQuestion to collect the required prompts
2. Create the project directory at `examples/[PROJECT_NAME]/`
3. Copy all files from `starters/dashboard/` to the project
4. Copy shared resources from `starters/_shared/`:
   - `styles/_reset.css` → `src/styles/_reset.css`
   - `styles/_tokens.css` → `src/styles/_tokens.css`
5. Replace all `{{PLACEHOLDER}}` values with collected prompts
6. Handle conditional sections `{{#IF_ENABLE_CHARTS}}...{{/IF_ENABLE_CHARTS}}`
7. Generate view components based on INITIAL_VIEWS
8. Register routes in main.js
9. Update sidebar-nav.js with navigation links

## Skills to Apply
- javascript-author
- custom-elements
- api-client
- authentication
- state-management
- accessibility-checker
