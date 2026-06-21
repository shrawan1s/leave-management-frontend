# Leave Management System — Frontend

A Next.js web application for managing employee leave requests with separate Employee and Admin interfaces.

---

## Overview

This is the frontend for the Leave Management System built as part of the Nrolled IT Team Selection Assignment. It provides a clean UI for employees to apply for leaves and track status, and for admins to review and action all requests.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + shadcn/ui |
| HTTP Client | Axios |
| Auth | JWT stored in localStorage |
| Package Manager | pnpm |
| Deployment | Vercel |

---

## Setup

### Prerequisites
- Node.js >= 18
- pnpm
- Backend service running (see leave-management-backend)

### Installation

```bash
git clone https://github.com/<your-username>/leave-management-frontend.git
cd leave-management-frontend
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run

```bash
# development
pnpm run dev

# production
pnpm run build
pnpm run start
```

App will be available at `http://localhost:3000`

---

## Architecture

```
src/
├── app/
│   ├── (auth)/         → /login, /register
│   ├── (employee)/     → /dashboard, /apply, /my-leaves
│   └── (admin)/        → /admin/dashboard, /admin/requests
├── components/
│   ├── shared/         → DashboardShell, PageHeader, ProtectedPageShell, ThemeToggle
│   ├── leave/          → Employee leave containers and admin request review
│   └── dashboard/      → Admin dashboard cards
├── lib/
│   ├── axios.ts        → Axios instance with auth interceptor
│   └── auth.ts         → Token/user helpers
├── hooks/              → useAuth, useEmployeeLeave, useAdminLeave
├── constants/          → Routes, API endpoints, UI text
├── types/              → Shared TypeScript interfaces
└── proxy.ts            → Route protection by role
```

### Auth Flow
- Employee registers via 2-step onboarding form → JWT stored in localStorage
- Admin logs in with seeded credentials
- Next proxy protects routes by role — wrong role gets redirected
- Axios interceptor auto-attaches Bearer token to every request
- Axios interceptor refreshes expired access tokens through `/api/auth/refresh` when a refresh token is available.
- Logout calls `/api/auth/logout`, then clears local browser auth state.
- Auth helpers store the JWT, refresh token, and user in localStorage and mirror token/role to cookies so proxy-based route protection can run before the page loads.
- Visible UI text comes from `src/constants/ui-text.ts`; routes and API endpoints come from `src/constants/routes.ts`.
- Theme switching is handled through `next-themes`, `ThemeProvider`, and the shared `ThemeToggle` component.

### Page Structure

| Route | Role | Description |
|---|---|---|
| /login | Public | Login for both roles |
| /register | Public | Employee 2-step onboarding |
| /dashboard | Employee | Balance card + recent requests |
| /apply | Employee | Leave application form |
| /my-leaves | Employee | Full leave history |
| /admin/dashboard | Admin | Stats overview |
| /admin/requests | Admin | All requests with approve/reject |

Protected employee and admin route groups use the shared `DashboardShell` sidebar. The shell owns role-specific navigation, active route highlighting, theme toggle access, logout confirmation, and full-width responsive content spacing.

### Employee Leave UI
- `/dashboard` fetches leave balance and the recent 5 employee requests.
- `/apply` fetches current balance, validates date range/reason/balance, and submits `POST /api/leave`.
- `/my-leaves` fetches `GET /api/leave/my` and renders the employee leave history table.
- Leave dates are displayed as `DD MMM YYYY`; API date payloads use `YYYY-MM-DD`.
- Status display must use the shared `StatusBadge` component.
- Leave tables keep a minimum table width with horizontal overflow on narrow screens instead of compressing columns.

### Admin Leave UI
- `/admin/dashboard` fetches leave stats from `GET /api/leave/stats` and renders the request and employee totals.
- `/admin/requests` fetches `GET /api/leave/all`, supports status/type filters, and lets admins approve or reject pending requests.
- Status changes submit `PATCH /api/leave/:id/status` with the selected action and optional admin comment.
- The actions column supports view, edit, and delete for every request. Edits submit `PATCH /api/leave/:id`; deletes submit `DELETE /api/leave/:id`.
- Admin request data and actions are owned by `useAdminLeave`; API functions stay in `src/lib/api/leave.ts`.
- Admin and employee tables both use the shared `StatusBadge` component for consistent status display.

---

## AI Usage

This project was built with assistance from **Claude (Anthropic)** and **Codex**:

- **Architecture design** — Claude helped plan the route structure, component hierarchy, and auth flow
- **Code generation** — Codex used to scaffold pages, components, and hooks
- **UI decisions** — Claude suggested shadcn/ui component choices and layout patterns
- **Type definitions** — Claude generated TypeScript interfaces aligned with the backend schema
- **README and documentation** — Claude assisted in writing structured documentation

All AI-generated code was reviewed, tested, and adjusted manually.

---

## Assumptions

- JWT is stored in `localStorage` (no httpOnly cookies for simplicity)
- Refresh token is stored in `localStorage` for the same assignment-level auth model.
- Admin credentials are fixed — seeded directly in the backend DB
- Leave balance is displayed in real time from the backend (not cached locally)
- Days are shown as calendar days inclusive — no weekend exclusions
- Toast notifications (via sonner) are used for all success/error feedback
- No email notifications — all updates are visible in the UI only
