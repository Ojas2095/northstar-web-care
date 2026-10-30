# Deployment Guide — Northstar Web Care

This guide outlines how to deploy **Northstar Web Care** at zero software cost using GitHub and Vercel.

---

## 1. Zero-Cost Infrastructure Architecture

```
[ GitHub Repository ]
        │
        ▼ (Auto Webhook on push to main)
[ Vercel Free Tier (Global Edge CDN) ]
        │
        ├── SPA Client Routing (Vite static bundle)
        ├── Dynamic Client-Side Routing (vercel.json rewrite)
        └── Fast SSL & Global Edge Caching
```

---

## 2. GitHub Version Control Setup

1. Initialize git if not already present:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Northstar Web Care launch-ready platform"
   ```

2. Create a private or public repository on GitHub (e.g. `northstar-web-care`).
3. Push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/northstar-web-care.git
   git push -u origin main
   ```

---

## 3. Vercel Deployment (Step-by-Step)

### Option A: 1-Click Instant Import via Vercel Web Dashboard (Recommended)

1. Open this direct import link:
   👉 **[Deploy on Vercel (Ojas2095/northstar-web-care)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOjas2095%2Fnorthstar-web-care)**
2. Click **Deploy**. Vercel will automatically build the Vite production bundle and assign your live `.vercel.app` URL.

### Option B: Via Vercel CLI (Active Device Code)

Run `npx vercel` or approve the active device code:
- **Authorization URL:** https://vercel.com/oauth/device?user_code=QFFQ-FBWX
- Once confirmed in your browser, the CLI deploys automatically.

---

## 4. Single-Page Application (SPA) Routing Configuration

To ensure routes such as `/pricing`, `/dashboard/monitoring`, and `/crm/leads` load cleanly on hard refresh, verify that `vercel.json` exists in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Let's ensure `vercel.json` is committed in our repository.

---

## 5. Custom Domain Configuration (When Ready)

Once you purchase `northstarwebcare.com`:

1. Open your Vercel Project Settings → **Domains**.
2. Add `northstarwebcare.com` and `www.northstarwebcare.com`.
3. Set DNS records at your registrar (Namecheap, Cloudflare, Porkbun):
   - **A Record:** `@` points to `76.76.21.21`
   - **CNAME Record:** `www` points to `cname.vercel-dns.com`
4. SSL certificates are provisioned and auto-renewed by Vercel for free.

---

## 6. Scheduled Automation (GitHub Actions Free Tier)

The automated health checks in `.github/workflows/scheduled-health-check.yml` run on GitHub Actions free compute (2,000 free minutes/month for public/private repositories).

### Enabling Actions
1. In your GitHub repository, navigate to the **Actions** tab.
2. Select **"Northstar Automated Website Health Check"**.
3. Click **"Run workflow"** to trigger a manual test probe or let the cron daemon execute every 6 hours.

---

## 7. Pre-Launch Verification Checklist

- [ ] Verify homepage hero copy renders accurately.
- [ ] Test the contact assessment form in demo mode.
- [ ] Confirm CloudDesk dashboard charts render on desktop and mobile.
- [ ] Test CRM CSV lead import and export.
- [ ] Verify 404 handler functions properly when visiting invalid routes.
