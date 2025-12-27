# Project Scaffold Wizard

Help the user scaffold a new project by guiding them through starter selection and configuration.

## Available Starters

1. **Static Website (Standard)** - Multi-page HTML/CSS/JS site
2. **Static Website (Astro)** - Astro framework with content collections
3. **PWA/SPA** - Single-page app with Web Components and client-side routing
4. **REST API** - Node.js backend with Express/PostgreSQL
5. **Dashboard** - Admin interface with sidebar layout
6. **Chrome Extension** - Browser extension with Manifest V3

## Instructions

1. Ask the user which type of project they want to scaffold
2. Use AskUserQuestion to present the options
3. Based on their selection, run the appropriate scaffold command:
   - Static Website → `/scaffold-site`
   - Astro Site → `/scaffold-astro`
   - PWA/SPA → `/scaffold-spa`
   - REST API → `/scaffold-api`
   - Dashboard → `/scaffold-dashboard`
   - Chrome Extension → `/scaffold-extension`

## Starter Locations

All starters are in `starters/`:
- `starters/static-standard/`
- `starters/static-astro/`
- `starters/pwa-spa/`
- `starters/rest-api/`
- `starters/dashboard/`
- `starters/chrome-extension/`

Shared resources are in `starters/_shared/`.

Each starter has a `manifest.yaml` defining prompts, includes, and required skills.
