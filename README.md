# Adullam Frontend

Admin panel for the Adullam multi-tenant platform — retail and restaurant businesses managing products, categories, and promotions.

**Stack:** React 19 · Vite · TypeScript · antd v6 · TanStack Query · Formik · Tailwind CSS · SCSS Modules

---

## Prerequisites

- [Node.js](https://nodejs.org) v20.6 or higher
- Adullam backend running locally (see `adullam-backend` repo)

---

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:AndrewKalil/adullam-frontend.git
cd adullam-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_TENANT_SLUG=adullam
```

`VITE_TENANT_SLUG` is only needed for local development — in production the tenant is resolved from the subdomain.

---

## Running in development

```bash
npm run dev
```

The app starts on `http://localhost:5173`.

> Make sure the backend is running first (`npm run dev` in `adullam-backend`).

---

## Other scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and compile for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Project structure

```
src/
├── components/     # Shared reusable UI components
├── constants/      # App-wide constants and enums
├── hooks/          # Shared custom React hooks
├── integrations/   # Third-party service clients (API client)
├── pages/          # Route-level page components
├── providers/      # React context providers (Auth, Theme, etc.)
├── services/       # Data access layer — one folder per entity
├── types/          # Shared TypeScript types
├── utils/          # Pure utility functions
└── styles/         # Global SCSS
```
