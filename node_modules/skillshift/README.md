# SkillShift

Multi-tenant, AI-assisted 30-day upskilling platform built with Next.js 14 + Firebase. This README gives a complete overview for developers to continue implementation and deploy.

## Goals
- Help employees progress in 30 days using diagnosis, a tailored plan, and AI simulators.
- Provide manager visibility (engagement, progress, simulators, top performers).
- Enforce multi-tenancy: all data scoped by `tenantId` with secure handling end-to-end.

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Firebase: Auth, Firestore, Storage, Admin SDK (server-side)
- Genkit scaffolding for future AI flows (optional)

## Folder Structure
```
skillshift/
├─ .env.example
├─ firebase.json, firestore.rules, apphosting.yaml
├─ next.config.js, tailwind.config.js, tsconfig.json, postcss.config.js
├─ package.json
├─ scripts/
│  ├─ seed-emulator.js
│  └─ seed-claims.mjs
└─ src/
	├─ app/
	│  ├─ (auth)/
	│  │  ├─ login/page.tsx
	│  │  ├─ register/page.tsx
	│  │  └─ reset/page.tsx
	│  ├─ admin/page.tsx
	│  ├─ dashboard/page.tsx
	│  ├─ diagnosis/page.tsx
	│  ├─ evolution/page.tsx
	│  ├─ gestor/page.tsx
	│  ├─ health/page.tsx
	│  ├─ training/page.tsx
	│  ├─ training/[day]/page.tsx
	│  ├─ simulation/page.tsx
	│  ├─ api/
	│  │  ├─ auth/session/route.ts
	│  │  ├─ dashboard/route.ts
	│  │  ├─ diagnosis/route.ts
	│  │  ├─ gestor/metrics/route.ts
	│  │  ├─ plan/route.ts
	│  │  ├─ progress/route.ts
	│  │  ├─ simulation/route.ts
	│  │  └─ simulations/route.ts
	│  ├─ globals.css, layout.tsx, page.tsx, icon.svg
	│  └─ status-client.tsx
	├─ components/
	│  ├─ logout-button.tsx
	│  └─ ui/button.tsx, ui/card.tsx, ui/input.tsx, ui/toaster.tsx
	├─ lib/
	│  ├─ ai/diagnosis.ts, plan30.ts, simulators.ts
	│  ├─ auth/claims.ts, index.ts, tenant.ts
	│  ├─ config/env.ts
	│  ├─ data/provider.ts, index.ts, firebaseProvider.ts
	│  └─ firebase/config.ts, admin.ts
	├─ middleware.ts
	└─ types/plan.ts, simulation.ts, user.ts
```

## Pages
- `/` Home: Intro + CTAs for Login/Register.
- `/(auth)/login`: Email/password via Firebase; after login, exchanges ID token for `__session` cookie.
- `/(auth)/register`: Create account via Firebase Auth.
- `/(auth)/reset`: Send password reset email.
- `/dashboard`: Employee view (current day, next task, progress, recent simulations).
- `/diagnosis`: Simple questionnaire; calls `POST /api/diagnosis` and persists result.
- `/training`: 30-day list; `/training/[day]` shows the day’s task and a link to the simulator.
- `/simulation`: Simple chat-like simulator; persists simulations and lists history.
- `/evolution`: Demo blocks for progress/feedback.
- `/gestor`: Tenant-level indicators (active employees, avg progress, simulations, top performers).
- `/admin`: Admin can manage training types per role (CRUD). Other tenant settings/roles can be added here.
- `/health`: Health check page.

## API Endpoints
- `POST /api/auth/session`: Body `{ idToken }` → sets a secure `__session` cookie.
- `DELETE /api/auth/session`: Clears the session cookie.
- `GET /api/dashboard`: Dashboard data for the current tenant.
- `POST /api/diagnosis`: Saves a diagnosis (uses `tenantId`/`uid` from claims).
- `POST /api/plan`: Generates and saves a 30-day plan (AI placeholder).
- `POST /api/simulation`: Runs a simulator (placeholder) and saves conversation/score/feedback.
- `GET /api/simulations`: Lists tenant simulations (summary).
- `POST /api/progress`, `GET /api/progress`: Record/list daily progress.
- `GET /api/gestor/metrics`: Manager metrics for the current tenant.
 - `GET /api/training-types`: List training types (optional filter by `?role=`)
 - `POST /api/training-types`: Create training type (admin only)
 - `PATCH /api/training-types/:id`: Update training type (admin only)
 - `DELETE /api/training-types/:id`: Delete training type (admin only)

All endpoints resolve claims via `src/lib/auth/claims.ts` from either `Authorization: Bearer <idToken>` or the `__session` cookie (validated via Admin SDK).

## Auth & Sessions
- Client signs in with Firebase Auth (ID token).
- Exchange ID token for a session cookie: `POST /api/auth/session` → `__session` (httpOnly, secure, sameSite=lax).
- Middleware (`src/middleware.ts`) requires presence of `__session` on protected pages; full verification happens in APIs.
- APIs verify ID tokens or session cookies and extract `tenantId` and `uid`.
- Logout: a client button calls `DELETE /api/auth/session` and `firebase.auth().signOut()` (`src/components/logout-button.tsx`).

## Multi-Tenancy
- `tenantId` must be present as a custom claim on the user.
- Persistence: collections store `tenantId` where applicable (diagnostics, plans, simulations, progress, etc.).
- Queries: filtered by `tenantId` in the Firestore Admin data provider.

## Data Provider Pattern
- Interface: `src/lib/data/provider.ts` defines all operations.
- Firestore Admin implementation: `src/lib/data/firebaseProvider.ts`.
- Entry point: `src/lib/data/index.ts` exports the active provider (Firebase).

Core methods: `saveDiagnosis`, `createPlan`, `saveSimulation`, `listSimulations`, `saveProgress`, `listProgress`, `getDashboard`, `getGestorMetrics`.

## Environment (.env.local)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (wrap with quotes and keep newlines as `\n`)

## Run Locally
```powershell
cd skillshift
npm install
Copy-Item .env.example .env.local
# Fill .env.local with Firebase client and admin credentials
npm run dev
```
Open the URL shown in the console (usually `http://localhost:3000`).

## Seeding
- Emulator users: `npm run emulators` then `npm run seed:auth` (creates users and sets `tenantId` claim via emulator endpoints).
- Production claims: set `tenantId` (and optional `role`) for an existing Auth user:
```powershell
# Requires FIREBASE_ADMIN_* env vars in .env.local or environment
npm run seed:claims -- --uid <FIREBASE_UID> --tenant <TENANT_ID> --role <ROLE>
```

## Security & Best Practices
- Never commit secrets; use environment variables.
- Enable HTTPS in production for `secure` cookies.
- Validate claims/roles server-side; middleware only checks cookie presence.
- Page guards: `/admin` (admin only) and `/gestor` (manager/admin) are server-guarded and redirect unauthorized users to `/dashboard`.
- Keep Firestore rules (`firestore.rules`) aligned with multi-tenant model.
- Add indexes for dashboard/metrics queries as needed.

## Deployment
- Provide env vars in your host (Vercel/Firebase Hosting/etc.).
- Ensure Admin SDK credentials are valid in the environment.
- Apply Firestore security rules and create needed indexes.

## Roadmap
- Role-based checks per route (admin/gestor/employee).
- Real Genkit flows for diagnosis/simulators.
- Enhanced dashboards and aggregations with indexes.
- Additional seeds for tenants, users, and sample data.
