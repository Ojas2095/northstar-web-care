# Sales & Outreach Playbook — Northstar Web Care

## 1. Ethical Outbound Prospecting Philosophy

Northstar Web Care practices **value-first, problem-identified outreach**:
- **Never fabricate an issue:** Only contact a founder if you have observed an authentic, reproducible bug, broken link, or visual glitch on their live site.
- **Never mass-scrape or spam:** Keep outreach personalized, respectful, and strictly one-to-one.
- **Always respect privacy:** Use public contact emails listed on the company website or founders' public LinkedIn profiles.

---

## 2. 7-Step Prospecting Standard Operating Procedure

```
1. Research Startup
   └── Browse Product Hunt launches, BetaList, Indie Hackers, or YC Directory.
   └── Filter for bootstrapped B2B tools or early SaaS with 1–5 team members.

2. Inspect Public Website
   └── Open DevTools in mobile viewport (375px / 390px).
   └── Check for overlapping buttons, unreadable headers, broken form validations, or dead links.

3. Isolate the Friction Point
   └── Take a clean screenshot or note exact steps to reproduce.
   └── Ensure it represents real user friction (e.g., failed form submission, broken pricing toggle).

4. Add Lead to CRM
   └── Open http://localhost:3000/crm/leads.
   └── Record company, founder name, public email, identified issue, and estimated deal tier.

5. Draft Personalized Email
   └── Open http://localhost:3000/crm/templates and copy Template 1.
   └── Interpolate founder name, company name, and specific bug notes.

6. Human Founder Verification
   └── Read through the message aloud.
   └── Ensure the tone is collegial, helpful, and free of hype or condescension.

7. Send Manually from Business Inbox
   └── Deliver from your authenticated business email (e.g. partner@northstarwebcare.com).
   └── Set follow-up date to Day 4 in the CRM.
```

---

## 3. Handling Founder Responses

### Scenario A: Founder says "Thanks for spotting this! How much to fix it?"
**Response:**
> "Glad it was helpful! We can fix this specific issue for you under our one-time pilot for $39, completed and verified within 24–48 hours. If you'd also like ongoing peace of mind, we can roll that directly into our $49/mo Growth Care tier, which includes 2 hours of technical updates each month. Let me know which you prefer and I'll send over the access checklist!"

### Scenario B: Founder says "We have an in-house developer."
**Response:**
> "Makes total sense! I know developers usually want to focus on core product architecture rather than spending time on CSS layout quirks and form debugging. If their sprint ever gets overloaded, we're always here as a backup pair of hands from $19/mo. Wishing you great momentum with [Company Name]!"

### Scenario C: No response after 4 working days
**Action:**
- Send Template 2 (Day 4 Gentle Follow-Up).
- If no response after Day 4, mark as `not-contacted` or `not-interested` and archive. Do not send further unsolicited emails.

---

## 4. Prospecting Channels & Search Queries

- **Product Hunt:** Browse the "Products Launched Last Week" archive. Look for solo makers.
- **BetaList:** Early-stage startups currently in private or public beta.
- **Hacker News "Ask HN: Who is hiring? / Who wants to be hired?":** Founders seeking freelance technical support.
- **LinkedIn Search:** `"Founder" AND ("early-stage" OR "bootstrapped") AND "SaaS"`.
