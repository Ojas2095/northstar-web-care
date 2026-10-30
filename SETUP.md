# Development Setup Guide — Northstar Web Care

This document details the exact technical setup required to run, test, and contribute to **Northstar Web Care**.

---

## 1. Prerequisites

- **Node.js:** v20.x or v22.x LTS recommended (minimum v18.0)
- **Package Manager:** `npm` (v9+) or `pnpm`
- **Modern Browser:** Chrome, Edge, Safari, or Firefox with developer tools

Verify your runtime versions:
```bash
node --version
npm --version
```

---

## 2. Environment Configuration

Copy the example environment template into `.env`:

```bash
cp .env.example .env
```

### Environment Variable Reference

| Variable | Required | Default | Purpose |
| :--- | :--- | :--- | :--- |
| `VITE_SITE_URL` | No | `http://localhost:3000` | Canonical origin for Open Graph tags |
| `VITE_DEMO_MODE` | No | `true` | Toggles simulated indicators and sample data |
| `VITE_EMAIL_SERVICE_API_KEY` | No | *(empty)* | Optional Resend or SendGrid API key for contact form delivery |
| `VITE_CONTACT_EMAIL` | No | *(empty)* | Recipient inbox for live lead submissions |

> ⚠️ **Security Warning:** Never commit `.env` or production secrets to Git.

---

## 3. Dependency Installation

Execute a clean install within the project folder:

```bash
npm install
```

---

## 4. Running the Development Server

Start the local Vite development server:

```bash
npm run dev
```

The application will bind to `http://localhost:3000/`.

### Key Application Routes

- **Public Marketing Website:**
  - Home: `/`
  - Services: `/services`
  - Pricing: `/pricing`
  - How It Works: `/how-it-works`
  - Live Demo Showcase: `/demo`
  - FAQ: `/faq`
  - Assessment Request: `/contact`
  - Privacy Policy: `/privacy`
  - Terms of Service: `/terms`

- **CloudDesk SaaS Monitoring Demonstration:**
  - Overview: `/dashboard`
  - Website Monitoring: `/dashboard/monitoring`
  - Broken Link Detection: `/dashboard/broken-links`
  - Core Web Vitals: `/dashboard/performance`
  - Maintenance Tasks: `/dashboard/tasks`
  - Executive Reports: `/dashboard/reports`

- **Internal Business CRM & Operations:**
  - Lead Management: `/crm`
  - Client Retainers: `/crm/clients`
  - Task Backlog: `/crm/tasks`
  - Revenue Telemetry: `/crm/revenue`
  - Follow-Up Queue: `/crm/follow-ups`
  - Outreach Templates & Proposals: `/crm/templates`

---

## 5. Verification & Testing Commands

### TypeScript Compilation Check
```bash
npx tsc --noEmit
```

### Production Build
```bash
npm run build
```

### Local Preview of Production Assets
```bash
npm run preview
```

### Automation Scripts Verification
```bash
# Synthetic HTTP probe
node scripts/health_check.js

# Broken hyperlink scanner
node scripts/broken_link_checker.js

# Client renewal scanner
node scripts/renewal_reminder.js

# Monthly executive report compiler
node scripts/generate_monthly_report.js "Acme SaaS"
```

---

## 6. Troubleshooting

- **Port Conflict:** If port 3000 is occupied, adjust the `port` property in `vite.config.ts` or run `npm run dev -- --port 3001`.
- **LocalStorage Reset:** If you wish to reset demo data in the CRM or CloudDesk, clear localStorage keys `northstar-crm-leads`, `northstar-crm-clients`, and `northstar-crm-tasks` via DevTools Application tab.
