/**
 * Northstar Web Care — Automated Health & Uptime Probe
 *
 * Safe synthetic HTTP probe with SSRF protection.
 * Can be scheduled via GitHub Actions, cron, or local node execution.
 *
 * Usage:
 *   node scripts/health_check.js
 */

import https from 'node:https';
import http from 'node:http';

// Configured list of authorized client websites
const MONITORED_DOMAINS = [
  { name: 'CloudDesk Demo Target', url: 'https://httpbin.org/status/200' },
  { name: 'Public API Probe', url: 'https://httpbin.org/delay/0' },
];

// SSRF Guardrail: Disallow local/private/cloud metadata IP ranges
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

export async function probeSite(site) {
  if (!isUrlSafe(site.url)) {
    console.error(`[BLOCKED] SSRF protection rejected unsafe URL: ${site.url}`);
    return { ...site, status: 'BLOCKED', httpStatus: 0, latencyMs: 0 };
  }

  return new Promise((resolve) => {
    const startTime = Date.now();
    const client = site.url.startsWith('https') ? https : http;

    const req = client.get(
      site.url,
      {
        timeout: 8000,
        headers: { 'User-Agent': 'Northstar-WebCare-Bot/1.0 (+https://northstarwebcare.com)' },
      },
      (res) => {
        const latencyMs = Date.now() - startTime;
        resolve({
          name: site.name,
          url: site.url,
          status: res.statusCode >= 200 && res.statusCode < 400 ? 'UP' : 'DEGRADED',
          httpStatus: res.statusCode,
          latencyMs,
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: site.name,
        url: site.url,
        status: 'DOWN (TIMEOUT)',
        httpStatus: 408,
        latencyMs: 8000,
      });
    });

    req.on('error', (err) => {
      resolve({
        name: site.name,
        url: site.url,
        status: 'DOWN',
        httpStatus: 500,
        error: err.message,
        latencyMs: Date.now() - startTime,
      });
    });
  });
}

export async function runAllChecks() {
  console.log(`[${new Date().toISOString()}] Starting Northstar Scheduled Health Probe...`);
  const results = [];

  for (const site of MONITORED_DOMAINS) {
    const res = await probeSite(site);
    results.push(res);
    console.log(`  -> ${res.name}: [${res.status}] HTTP ${res.httpStatus} (${res.latencyMs}ms)`);
  }

  console.log(`[COMPLETED] Checked ${results.length} properties.`);
  return results;
}

runAllChecks();
