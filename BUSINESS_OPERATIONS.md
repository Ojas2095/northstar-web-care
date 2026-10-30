# Business Operations Playbook — Northstar Web Care

## 1. Executive Summary & Business Model

**Northstar Web Care** provides dedicated website maintenance, responsiveness remediation, bug fixing, and continuous availability support to overseas early-stage startups and bootstrapped founders.

### Initial Revenue Milestone
- **Target Monthly Revenue:** ₹5,000 to ₹10,000 INR (~$60 to $120 USD)
- **Target Customer Base:** 2 to 4 clients on Essential ($19/mo) or Growth ($49/mo) tiers, or 1 client on Technical Partner ($99/mo).
- **Core Value Proposition:** Startups get reliable technical care for their primary conversion asset without the overhead, recruitment complexity, or high retainers of agency developers.

---

## 2. Daily & Weekly Operating Cadence

### Daily Workflow (20–30 minutes)
1. **Inbox & Health Probe Review:** Check automated GitHub Actions health check run logs for flagged HTTP 4xx/5xx status codes or broken links.
2. **Follow-Up Queue:** Open `/crm/follow-ups` to review any Day-4 follow-up emails due for delivery.
3. **Client Support Inquiries:** Respond to any client support tickets within agreed business hours (aim for < 4-hour initial acknowledgement).

### Weekly Workflow (1–2 hours)
1. **Proactive Health Audit:** Run manual verification on active client contact forms and checkout pathways.
2. **Task Backlog Sprint:** Execute client task allocations (minor copy adjustments, CSS responsive fixes, API integration tweaks).
3. **Outbound Prospecting:** Research 5 to 10 new startups on Product Hunt, BetaList, or Hacker News, spot genuine site friction points, and log them into `/crm`.

### Monthly Workflow (1 hour per client)
1. **Generate Executive Report:** Run `node scripts/generate_monthly_report.js "<ClientName>"` or use `/dashboard/reports`.
2. **Invoice & Renewal Notice:** Issue renewal receipts via Stripe / Wise 5 days prior to month-end.
3. **Strategic Recommendations:** Offer 2 high-impact technical suggestions for next month's engineering allotment.

---

## 3. Client Onboarding Standard Operating Procedure (SOP)

```
[ Step 1: Proposal Approval ]
          │
          ▼
[ Step 2: Welcome Email + Checklist (Template 8) ]
          │
          ├── Request Repository or Deployment Access (GitHub/Vercel/cPanel)
          ├── Confirm Emergency Communication Channel (Email / Slack Connect)
          └── Collect Initial 3 Priority Glitches
          │
          ▼
[ Step 3: Baseline Website Health Audit ]
          │
          ├── Check DNS & SSL auto-renewal status
          ├── Run responsive inspection on iPhone & Android viewports
          └── Register domain into CloudDesk monitor
          │
          ▼
[ Step 4: First Fix Delivered within 48 Hours ]
          │
          └── Establish immediate trust and competence
```

---

## 4. Scope Management & Boundary Defense

To maintain profitability and prevent scope creep:

### Strict Inclusions
- Minor HTML/CSS responsiveness fixes (fixing collisions on mobile viewports).
- Bug fixes on existing contact forms, email dispatch webhooks, and analytics tracking.
- Broken link fixes and 301 redirection configuration.
- Availability polling and basic performance optimizations (compressing images, caching).
- Minor text/copy updates within allocated plan hours.

### Explicit Exclusions (Enforced in Contracts)
- Full site rebuilds, ground-up architectural redesigns, or re-theming.
- Web hosting infrastructure costs, domain registration fees, or third-party SaaS subscription charges.
- 24/7 on-call emergency response (support is delivered during defined business hours).
- Custom mobile app development or native iOS/Android codebases.

---

## 5. Pricing & Financial Policy

- **Currency:** Billed in USD via Stripe Payment Links or Wise Invoices.
- **Billing Cadence:** 100% upfront monthly retainer.
- **Cancellation Policy:** Cancel anytime prior to next billing date. No long-term lock-in.
- **Refund Policy:** 100% money-back guarantee on initial paid pilot if the reported defect is not resolved to customer satisfaction.
