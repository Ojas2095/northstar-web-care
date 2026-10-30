# Security Policy & Defensive Architecture — Northstar Web Care

## 1. Core Security Tenets

Northstar Web Care handles client infrastructure and monitoring with strict defense-in-depth principles:

1. **Explicit Authorization Only:** Synthetic monitoring, link checks, and maintenance audits are performed solely on domains explicitly registered by authorized clients.
2. **Zero Exploitation or Penetration Testing:** We never execute aggressive vulnerability scanners, fuzzing, port scans, or exploit frameworks. All checks consist of standard, non-intrusive HTTP GET and HEAD requests.
3. **No Secret Storage in Frontend:** No API keys, database connection strings, or cloud tokens are bundled into client-side JavaScript.

---

## 2. Server-Side Request Forgery (SSRF) Protection

When users or scripts register URLs for monitoring, the target is validated against the following rules:

### Blocked Target Patterns
- **Localhost & Loopback:** `localhost`, `127.0.0.0/8`, `::1`
- **RFC 1918 Private Subnets:**
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`
- **Cloud Metadata Endpoints:**
  - `169.254.169.254` (AWS, GCP, Azure instance metadata services)
  - `metadata.google.internal`
- **Internal / Top-Level Domains:** `.local`, `.internal`, `.lan`
- **Protocol Restrictions:** Only public `https:` (and optionally `http:`) schemes are permitted; `file:`, `gopher:`, `ftp:`, `javascript:`, or `data:` URLs are rejected immediately.

### Reference SSRF Filter Implementation
```javascript
export function isUrlSafe(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    const forbidden = [
      /^localhost$/,
      /^127\./,
      /^10\./,
      /^192\.168\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^169\.254\./,
      /\.internal$/,
      /\.local$/,
    ];
    return !forbidden.some((regex) => regex.test(hostname));
  } catch {
    return false;
  }
}
```

---

## 3. Safe Client Credential Handling

When onboarding clients:
- **Repository Access:** Prefer inviting `northstar-webcare` as an outside collaborator to a specific repository or branch with write permissions, rather than requesting primary account passwords.
- **Hosting Access:** Use team-based access (e.g. Vercel / Netlify team invites) with member-level deployment permissions.
- **Environment Secrets:** Instruct clients never to share `.env` production database secrets via plaintext email. Use secure ephemeral secret tools (e.g. 1Password links, Bitwarden Send).

---

## 4. Rate Limiting & User-Agent Transparency

All synthetic probes identify themselves transparently:
- **User-Agent:** `Northstar-WebCare-Bot/1.0 (+https://northstarwebcare.com)`
- **Probe Interval:** Default minimum probe interval is 5 minutes to prevent edge server load.
- **Timeout:** Maximum 8-second request timeout to avoid holding connections open.
