# Northstar Web Care

> **"Your website deserves more than occasional attention."**  
> Reliable website maintenance and technical support for early-stage startups, without the cost of hiring a full-time developer.

---

## 🌟 Overview

**Northstar Web Care** is an independent website maintenance and technical support partner tailored for overseas startup founders, bootstrapped businesses, and early-stage SaaS companies.

This repository contains the complete, production-ready, launchable platform comprising:

1. **Project A: Public Business Website** — High-converting, responsive showcase detailing services, transparent pricing tiers, FAQs, terms, privacy, and assessment request forms.
2. **Project B: CloudDesk Website Health Monitor** — Polished SaaS demonstration dashboard illustrating real-world website health checks, HTTP uptime tracking, broken link scanners, Core Web Vitals telemetry, and maintenance task management.
3. **Project C: Internal Business Operations System (CRM)** — Founder CRM with lead prospecting, CSV import/export, pipeline conversion metrics, active client retainers, hour allocations, and revenue dashboards.
4. **Project D: Sales & Outreach Toolkit** — Reusable cold outbound sequences, Day-4 follow-ups, assessment reports, and an interactive one-page service proposal generator.
5. **Project E: Scheduled Automation Engine** — Reusable Node.js scripts and GitHub Actions workflows for continuous HTTP availability checks, link crawler scans, contract renewal alerts, and executive monthly summaries.

---

## 🎨 Brand Identity

- **Navy:** `#101B2D`
- **Teal:** `#16C7B0`
- **Light Neutral:** `#F5F7FA`
- **White:** `#FFFFFF`
- **Typography:** Inter

---

## 🏗️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Data Parsing:** PapaParse (CSV)
- **SEO & Meta:** React Helmet Async, XML Sitemap, Robots.txt
- **Persistence:** LocalStorage with typed custom hooks
- **Automation:** Node.js (ES Modules), GitHub Actions Scheduled Cron

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or navigate to the project directory
cd northstar-web-care

# Install project dependencies
npm install
```

### 2. Local Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser:
- **Public Website:** `http://localhost:3000/`
- **CloudDesk Dashboard Demo:** `http://localhost:3000/dashboard`
- **Internal Operations CRM:** `http://localhost:3000/crm`

### 3. Production Build & Verification

```bash
npm run build
npm run preview
```

---

## 📁 Repository Structure

```
northstar-web-care/
├── .github/
│   └── workflows/
│       └── scheduled-health-check.yml   # 6-hour cron probe workflow
├── public/
│   ├── favicon.svg                      # Brand SVG favicon
│   ├── robots.txt                       # Search indexing rules
│   └── sitemap.xml                      # XML sitemap
├── scripts/
│   ├── health_check.js                  # Synthetic HTTP & SSL probe
│   ├── broken_link_checker.js           # Internal hyperlink auditor
│   ├── renewal_reminder.js              # Contract renewal scanning
│   └── generate_monthly_report.js       # Monthly client executive summary
├── src/
│   ├── components/
│   │   └── ui/                          # Reusable UI component primitives
│   ├── data/
│   │   └── demoData.ts                  # Comprehensive demo state & templates
│   ├── hooks/
│   │   └── useLocalStorage.ts           # Type-safe persistent client state
│   ├── layouts/
│   │   ├── WebsiteLayout.tsx            # Public portal layout
│   │   ├── DashboardLayout.tsx          # CloudDesk SaaS monitor layout
│   │   └── CRMLayout.tsx                # Internal Operations layout
│   ├── pages/
│   │   ├── website/                     # 10 public marketing & legal pages
│   │   ├── dashboard/                   # 6 CloudDesk telemetry pages
│   │   └── crm/                         # 6 internal CRM & sales pages
│   ├── types/
│   │   └── index.ts                     # Core domain interfaces
│   ├── App.tsx                          # App routing hierarchy
│   ├── index.css                        # Tailwind configuration & base styling
│   └── main.tsx                         # Client application entry point
├── BUSINESS_OPERATIONS.md               # Operations & founder playbook
├── DEPLOYMENT.md                        # Zero-cost Vercel & GitHub deployment guide
├── OUTREACH_PLAYBOOK.md                 # Cold outbound & prospecting guide
├── PRICING.md                           # Detailed packaging & tier boundaries
├── PROJECT_STATUS.md                    # Current state & pending founder actions
├── SECURITY.md                          # SSRF, rate-limiting & safe probe guidelines
└── SETUP.md                             # Step-by-step development setup
```

---

## 🛡️ Trust & Security Principles

- **No Fabricated Proof:** Zero invented customer logos, fake testimonials, or false revenue claims.
- **Explicit Demo Labels:** All simulated data in the CloudDesk dashboard and CRM is clearly labeled.
- **SSRF Guardrails:** All monitoring scripts and endpoints enforce strict denial of RFC 1918 subnets, localhost, and cloud metadata IPs (`169.254.169.254`).
- **Human-in-the-Loop:** All prospecting emails require explicit founder verification prior to manual sending.

---

## 📄 License

Proprietary — All rights reserved by Northstar Web Care.
