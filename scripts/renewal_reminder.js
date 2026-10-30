/**
 * Northstar Web Care — Automated Contract Renewal & Follow-Up Scanner
 *
 * Scans active retainer contracts and outputs alerts for renewals due within 7 days.
 *
 * Usage:
 *   node scripts/renewal_reminder.js
 */

const CLIENTS = [
  { name: 'PulseNode Cloud', renewalDate: '2026-11-05', plan: 'Technical Partner ($99)', email: 'marcus@pulsenode-example.net' },
  { name: 'CraftBrand Goods', renewalDate: '2026-11-10', plan: 'Essential Care ($19)', email: 'liam@craftbrand-example.com' },
  { name: 'OrbitFlow HR', renewalDate: '2026-11-15', plan: 'Growth Care ($49)', email: 'hannah@orbitflow-example.io' },
];

export function checkRenewals(daysAhead = 7) {
  console.log(`[${new Date().toISOString()}] Scanning for renewals due within ${daysAhead} days...`);
  const now = new Date();
  const threshold = new Date(now.getTime() + daysAhead * 24 * 3600 * 1000);

  const upcomingRenewals = CLIENTS.filter((c) => {
    const renDate = new Date(c.renewalDate);
    return renDate >= now && renDate <= threshold;
  });

  if (upcomingRenewals.length === 0) {
    console.log('No client renewals scheduled within the target window.');
    return;
  }

  console.log(`Found ${upcomingRenewals.length} upcoming renewals requiring notice:`);
  upcomingRenewals.forEach((c) => {
    console.log(`  - Client: ${c.name}`);
    console.log(`    Plan: ${c.plan}`);
    console.log(`    Renewal Date: ${c.renewalDate}`);
    console.log(`    Contact: ${c.email}`);
    console.log(`    Action: Queue friendly renewal check-in email with monthly maintenance report.\n`);
  });
}

checkRenewals(12);
