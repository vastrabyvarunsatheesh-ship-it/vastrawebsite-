# VASTRA BY VARUN 2.0 - ENTERPRISE ARCHITECTURE

A high-performance luxury Indian fashion e-commerce platform built with Next.js (App Router), Cloudflare Workers/Pages, Cloudflare D1 (Edge Database), Cloudflare R2 (Media Storage), Tailwind CSS, Shadcn UI, and Razorpay.

---

## 🚀 Technology Stack

* **Frontend**: Next.js 15 (App Router, React 19, TypeScript)
* **Styling**: Tailwind CSS + Shadcn UI + Framer Motion (Luxury Gold & Obsidian Palette)
* **Database**: Cloudflare D1 (SQLite Edge DB)
* **Storage**: Cloudflare R2 Object Storage
* **Edge Runtime**: Cloudflare Pages / Workers
* **State & Data Fetching**: TanStack Query
* **Authentication Architecture**: Better Auth Stub
* **Payments Architecture**: Razorpay Gateway (Cards, UPI, NetBanking, Wallets)
* **Transactional Email**: Resend
* **Testing**: Vitest (Unit/Integration) & Playwright (E2E)

---

## 📁 Repository & Folder Structure

```
d:\VASTRA WEBSITE\
├── .env.example              # Production environment variable schema
├── .eslintrc.json            # ESLint rules
├── .prettierrc               # Code formatting standard
├── .lintstagedrc.json        # Pre-commit formatting rules
├── wrangler.jsonc            # Cloudflare Pages / Workers D1/R2/KV bindings
├── components.json           # Shadcn UI registry & aliases
├── tailwind.config.ts        # Bespoke luxury Indian fashion design tokens
├── tsconfig.json             # Strict TypeScript configuration
├── vitest.config.ts          # Vitest testing engine config
├── playwright.config.ts      # E2E test engine config
├── src/
│   ├── app/                  # Next.js App Router (Layouts, Providers, Styling)
│   ├── components/           # UI Primitives, Common, and Layout Shells
│   ├── config/               # Site, Theme, and Cloudflare Binding Configs
│   ├── constants/            # Typed Routes and RBAC Permission Matrix
│   ├── hooks/                # Reusable Custom React Hooks
│   ├── lib/                  # Database, R2 Storage, Razorpay, Resend, & Logger
│   ├── providers/            # Root, Theme, & TanStack Query Providers
│   ├── services/             # Domain Services (Auth, Product, Order, Payment, Email, Storage)
│   ├── styles/               # Global Luxury Styles & Custom Tokens
│   └── types/                # Domain Interfaces & Cloudflare Binding Types
```

---

## 🌿 GitHub Branching Strategy & Conventions

### Branch Naming Conventions
* `main`: Production release branch (automatically deployed to Cloudflare Pages).
* `staging`: Pre-production validation branch.
* `feature/<chapter-number>-<feature-name>`: Feature development (e.g. `feature/ch2-authentication`).
* `fix/<bug-description>`: Bugfix branches.

### Commit Conventions (Conventional Commits)
Format: `<type>(<scope>): <short summary>`
* `feat`: A new feature (e.g., `feat(auth): integrate Better Auth with Cloudflare D1`)
* `fix`: A bug fix (e.g., `fix(cart): resolve currency calculation rounding error`)
* `docs`: Documentation changes
* `style`: Formatting, missing semi-colons, css tokens
* `refactor`: Code restructuring without changing behavior
* `test`: Adding or modifying unit/integration tests
* `chore`: Maintenance tasks or dependency updates

---

## ⚙️ Development Commands

```bash
# Run local development server
npm run dev

# Run TypeScript strict type check
npm run type-check

# Run ESLint validation
npm run lint

# Run Prettier code formatting
npm run format

# Run Unit & Integration tests
npm run test

# Run End-to-End tests
npm run test:e2e

# Build for Cloudflare Pages production
npm run build
```
