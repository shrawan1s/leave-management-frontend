# Rules — Leave Management Frontend

## Architecture Rules
- ALWAYS use the App Router — never use the pages/ directory
- NEVER mix server and client component logic in the same file
- Use `'use client'` only when the component needs hooks, event handlers, or browser APIs
- Pages should be server components by default — push `'use client'` down to the smallest component possible
- NEVER put API calls directly in a page — use hooks or server actions

## File & Folder Rules
- Pages go in `app/` following the route group structure: `(auth)`, `(employee)`, `(admin)`
- Shared components go in `components/shared/`
- Feature components go in `components/leave/` or `components/dashboard/`
- shadcn/ui components live in `components/ui/` — never modify them directly
- Hooks go in `hooks/`
- Utility functions go in `lib/`
- UI text, route paths, and API endpoint paths go in `constants/`
- All TypeScript types go in `types/index.ts`

## Naming Conventions
- Component files: PascalCase (e.g. `LeaveTable.tsx`, `StatusBadge.tsx`)
- Page files: always `page.tsx`
- Layout files: always `layout.tsx`
- Hook files: camelCase starting with `use` (e.g. `useAuth.ts`, `useLeave.ts`)
- Lib/util files: camelCase (e.g. `axios.ts`, `auth.ts`)
- CSS classes: use Tailwind utility classes only — no custom CSS files

## TypeScript Rules
- NEVER use `any` type
- ALWAYS import shared types from `types/index.ts`
- NEVER define inline interfaces for User, LeaveRequest, ApiResponse — use the shared types
- Use `type` for simple aliases, `interface` for object shapes
- Always type component props explicitly

## Component Rules
- ALWAYS use shadcn/ui components — never build from scratch what shadcn already has
- Available shadcn components: Button, Input, Label, Card, Badge, Table, Sonner, Dialog
- NEVER install additional UI libraries without confirmation
- ALWAYS handle loading state — disable buttons and show spinner during async operations
- ALWAYS handle empty state — show a meaningful message when lists are empty
- ALWAYS handle error state — show toast on API error

## API Rules
- ALWAYS use the axios instance from `lib/axios.ts`
- NEVER use raw `fetch()` or create a new `axios` instance
- NEVER hardcode the API base URL — it comes from `process.env.NEXT_PUBLIC_API_URL`
- NEVER hardcode API endpoint paths in feature code — use constants from `constants/routes.ts`
- ALWAYS wrap API calls in try/catch
- ALWAYS show a toast (sonner) on both success and error

## Auth Rules
- ALWAYS use helpers from `lib/auth.ts` for token and user operations
- NEVER read/write localStorage for auth directly — go through `lib/auth.ts`
- NEVER store the password anywhere on the frontend
- Next proxy in `proxy.ts` handles all route protection — do not add redirect logic inside pages
- On 401 response, the axios interceptor handles logout and redirect — do not duplicate this logic
- On 401 response, the axios interceptor attempts `/api/auth/refresh` before clearing auth state
- `lib/auth.ts` is the only place that reads/writes auth localStorage and auth cookies

## Routing Rules
- Employee routes: `/dashboard`, `/apply`, `/my-leaves`
- Admin routes: `/admin/dashboard`, `/admin/requests`
- Auth routes: `/login`, `/register`
- Protected employee and admin route groups must use the shared `DashboardShell` for page switching
- Protected logout must go through the shared `DashboardShell` confirmation dialog
- Dashboard content should use the available viewport width on desktop and responsive padding from `DashboardShell`
- Sidebar labels and route targets must come from `constants/ui-text.ts` and `constants/routes.ts`
- NEVER link an employee to an admin route or vice versa
- Use Next.js `<Link>` for all internal navigation — never use `window.location.href` except in the axios interceptor

## Styling Rules
- Use Tailwind utility classes only — no inline styles
- Visible UI text must come from `constants/ui-text.ts`, not inline component strings
- Use shadcn/ui `cn()` utility from `lib/utils.ts` for conditional classes
- Status colors must be consistent everywhere:
  - PENDING → yellow
  - APPROVED → green
  - REJECTED → red
- Use `StatusBadge` component for all status displays — never reimplement badge colors inline

## Form Rules
- ALWAYS validate on the frontend before submitting
- For leave form: validate `endDate >= startDate` and `days <= leaveBalance` before API call
- Never validate leave balance against a fake `0` while balance is still loading
- Show field-level error messages, not just toast errors
- Disable submit button while request is in flight
- Employee leave API calls must go through `lib/api/leave.ts`
- Employee leave pages must use hooks/containers, not direct API calls in page files
- Admin leave API calls must go through `lib/api/leave.ts`
- Admin leave pages must use hooks/containers, not direct API calls in page files
- Admin approve/reject actions must only be shown for `PENDING` requests
- Admin request rows must expose view, edit, and delete actions through centralized dialogs
- Leave tables must remain scroll-safe on narrow screens instead of forcing columns to shrink or overlap

## Date Rules
- Display all dates in `DD MMM YYYY` format (e.g. `22 Jun 2026`)
- Always send dates to the API in ISO format (`YYYY-MM-DD`)
- Days calculation: `endDate - startDate + 1` (calendar days, inclusive)
- Recalculate days live as the user changes dates in the form

## What NOT To Do
- Do NOT use `pages/` directory — App Router only
- Do NOT use `getServerSideProps` or `getStaticProps` — they are Pages Router patterns
- Do NOT install or use Redux, Zustand, or any global state library — use hooks and props
- Do NOT use raw HTML form elements — use shadcn Input, Label, Button
- Do NOT create a new axios instance anywhere — always import from `lib/axios.ts`
- Do NOT add any packages without confirming they are needed
- Do NOT use `<img>` tag — use Next.js `<Image>` if images are needed
- Do NOT duplicate the StatusBadge logic — always use the shared component
