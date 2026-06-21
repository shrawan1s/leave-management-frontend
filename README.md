# Leave Management System — Frontend

A Next.js web application for managing employee leave requests with separate Employee and Admin interfaces.

---

## Overview

This is the frontend for the Leave Management System built as part of the Nrolled IT Team Selection Assignment. It provides a clean UI for employees to apply for leaves and track status, and for admins to review and action all requests.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
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
│   ├── shared/         → Sidebar, Navbar, StatusBadge
│   ├── leave/          → LeaveForm, LeaveTable, ApproveRejectDialog
│   └── dashboard/      → StatsCard
├── lib/
│   ├── axios.ts        → Axios instance with auth interceptor
│   └── auth.ts         → Token/user helpers
├── hooks/              → useAuth, useLeave
├── types/              → Shared TypeScript interfaces
└── middleware.ts       → Route protection by role
```

### Auth Flow
- Employee registers via 2-step onboarding form → JWT stored in localStorage
- Admin logs in with seeded credentials
- Middleware protects routes by role — wrong role gets redirected
- Axios interceptor auto-attaches Bearer token to every request

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
- Admin credentials are fixed — seeded directly in the backend DB
- Leave balance is displayed in real time from the backend (not cached locally)
- Days are shown as calendar days inclusive — no weekend exclusions
- Toast notifications (via sonner) are used for all success/error feedback
- No email notifications — all updates are visible in the UI only