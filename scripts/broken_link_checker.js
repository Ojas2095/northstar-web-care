/**
 * Northstar Web Care — Automated Internal Broken Link Scanner
 *
 * Scans authorized client entry pages for dead hyperlinks.
 *
 * Usage:
 *   node scripts/broken_link_checker.js
 */

import https from 'node:https';
import http from 'node:http';

export async function checkLink(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.get(url, { timeout: 5000 }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode < 400 });
      });
      req.on('error', (err) => resolve({ url, status: 500, ok: false, error: err.message }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ url, status: 408, ok: false, error: 'Timeout' });
      });
    } catch (err) {
      resolve({ url, status: 0, ok: false, error: err.message });
    }
  });
}

export async function runLinkCheck() {
  console.log(`[${new Date().toISOString()}] Starting Northstar Link Verification Scan...`);

  const linksToAudit = [
    'https://httpbin.org/status/200',
    'https://httpbin.org/status/404',
    'https://httpbin.org/status/500',
  ];

  const results = [];
  for (const url of linksToAudit) {
    const outcome = await checkLink(url);
    results.push(outcome);
    console.log(
      `  -> Target: ${outcome.url} | Result: HTTP ${outcome.status} [${outcome.ok ? 'HEALTHY' : 'BROKEN'}]`
    );
  }

  const brokenCount = results.filter((r) => !r.ok).length;
  console.log(`[FINISHED] Audited ${results.length} links. Broken links discovered: ${brokenCount}`);
}

runLinkCheck();
