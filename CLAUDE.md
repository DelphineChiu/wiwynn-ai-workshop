# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

AI 課程練習專案，用於學習 OpenSpec 規格驅動開發與 Agent Skills。課程連結：deanlin.net/course/wiwynn

## Two Projects in One Repo

This repo contains two distinct projects:

1. **Root project** (`/`) — Node.js ESM training project. Contains intentional ESLint violations and failing tests in `src/skills/echo.js` for teaching purposes. Do not "fix" these unless explicitly asked.

2. **`vehicle-mgmt/`** — React + Vite + shadcn/ui vehicle management SPA, built as the course deliverable.

## Commands

### Root project

```bash
npm run lint          # ESLint (flat config)
npm run lint:fix      # Auto-fix ESLint issues
npm test              # Jest (requires --experimental-vm-modules for ESM)
npm run test:watch    # Jest watch mode
```

To run a single test file:
```bash
node --experimental-vm-modules node_modules/.bin/jest src/skills/__tests__/echo.test.js
```

Pre-commit hook runs `lint` and `test` in parallel — both must pass.

### vehicle-mgmt app

```bash
cd vehicle-mgmt
npm run dev     # Vite dev server (http://localhost:5173)
npm run build   # Production build
npm run lint    # ESLint for the app
```

Node.js ≥ 20 required. The nvm binary path on this machine is `/c/Users/9108012/AppData/Local/nvm/v22.22.2/`.

## vehicle-mgmt Architecture

**Stack**: Vite + React + React Router v6 + shadcn/ui (Tailwind CSS v4) + MSW v2 + Recharts + react-hook-form + Zod

**Key architectural decisions:**

- **No real backend** — MSW v2 intercepts all `/api/*` requests via Service Worker. Initial data is defined in `src/mocks/data.js` (in-memory, resets on refresh).
- **Auth state** — React Context (`src/context/AuthContext.jsx`) + `sessionStorage`. Two roles: `admin` and `user`.
- **Route protection** — `src/components/ProtectedRoute.jsx` accepts optional `requiredRole` prop. Unauthenticated → `/login`; wrong role → `/dashboard`.
- **MSW startup** — `src/main.jsx` awaits `worker.start()` before rendering the React tree (`import.meta.env.DEV` guard ensures MSW is excluded from production builds).

**Default credentials**: `admin / admin123` (full access) · `user / user123` (no `/employees` page)

## OpenSpec Workflow

Specs live in `openspec/`. Active changes go in `openspec/changes/<name>/`, archived changes in `openspec/changes/archive/`.

The openspec CLI binary: `/c/Users/9108012/AppData/Local/nvm/v22.22.2/openspec`

Available slash commands (invoke via Skill tool):
- `/opsx:propose` — create a new change with all artifacts in one step
- `/opsx:apply` — implement tasks from a change
- `/opsx:verify` — verify implementation matches specs
- `/opsx:archive` — sync specs and archive a completed change

Main specs (source of truth after archiving) live in `openspec/specs/<capability>/spec.md`.
