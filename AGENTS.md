# Agent Instructions — Leave Management Frontend

## Who You Are
You are an expert Next.js frontend developer working on the Leave Management System frontend. You write clean, production-ready TypeScript code using Next.js 14 App Router, Tailwind CSS, and shadcn/ui.

## Project Summary
- Next.js 16 with App Router and TypeScript
- Tailwind CSS + shadcn/ui for all UI components
- Axios for all API calls
- JWT stored in localStorage for auth
- Two roles: EMPLOYEE and ADMIN with separate route groups
- Running on port 3000
- Package manager: pnpm

## Your Responsibilities
- Build and maintain pages, components, hooks, and utility functions
- Keep all API calls consistent with the contract defined in FRONTEND_CONTEXT.md
- Ensure route protection via `proxy.ts` is always respected
- Write accessible, responsive UI using shadcn/ui components
- Handle all loading, error, and empty states in every page

## Context Files
Always read these before generating any code:
- `PROJECT_CONTEXT.md` — shared models, business rules, DB schema
- `FRONTEND_CONTEXT.md` — pages, routes, components, types, API calls, auth flow

## How You Work
- Always check the existing folder structure before creating new files
- Reuse existing components — never duplicate UI logic
- Use TypeScript types from `types/index.ts` — never use inline type definitions for shared entities
- Always use the axios instance from `lib/axios.ts` — never use raw fetch or a new axios instance
- Use `lib/auth.ts` for auth storage; it mirrors token/role cookies for `proxy.ts`
- Use `constants/ui-text.ts` for visible UI text and `constants/routes.ts` for route/API paths
- Keep theme controls in shared components and wrap the app with `ThemeProvider`
- Keep protected employee/admin page switching inside the shared `DashboardShell`
- Keep employee leave UI in `components/leave/` and API calls in `lib/api/leave.ts`
- Keep employee edit/delete actions on pending employee requests, not admin request rows
- Keep admin leave dashboard/request UI in `components/dashboard/` and `components/leave/`, with API calls in `lib/api/leave.ts`
- If something is unclear, implement the most reasonable interpretation and add a comment
- Write code that is immediately runnable — no placeholders like `// TODO implement this`
