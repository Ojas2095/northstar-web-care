// ============================================================
// DEMO DATA — All data below is simulated for demonstration
// purposes only. No real websites have been monitored.
// ============================================================

import {
  MonitoredWebsite,
  BrokenLink,
  PerformanceMetric,
  MaintenanceTask,
  MaintenanceReport,
  Lead,
  Client,
  RevenueEntry,
  FollowUp,
  OutreachTemplate,
} from '../types';

export const DEMO_WEBSITES: MonitoredWebsite[] = [
  {
    id: 'site-1',
    name: 'CloudDesk Demo Site',
    url: 'https://demo.clouddesk-example.com',
    status: 'up',
    httpStatus: 200,
    responseTime: 182,
    lastChecked: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    uptimePercentage: 99.85,
    isDemo: true,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: i === 14 ? 'degraded' : 'up',
      responseTime: Math.floor(160 + Math.random() * 40 + (i === 14 ? 300 : 0)),
      httpStatus: 200,
    })),
  },
  {
    id: 'site-2',
    name: 'TechStack Blog',
    url: 'https://blog.techstack-example.org',
    status: 'up',
    httpStatus: 200,
    responseTime: 245,
    lastChecked: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    uptimePercentage: 99.4,
    isDemo: true,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: i === 8 ? 'down' : 'up',
      responseTime: Math.floor(220 + Math.random() * 50),
      httpStatus: i === 8 ? 502 : 200,
    })),
  },
  {
    id: 'site-3',
    name: 'SaaS Launchpad Landing',
    url: 'https://saas-launchpad-example.io',
    status: 'degraded',
    httpStatus: 200,
    responseTime: 620,
    lastChecked: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    uptimePercentage: 98.7,
    isDemo: true,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: i > 25 ? 'degraded' : 'up',
      responseTime: i > 25 ? 650 : Math.floor(190 + Math.random() * 60),
      httpStatus: 200,
    })),
  },
  {
    id: 'site-4',
    name: 'E-commerce Starter Store',
    url: 'https://store.craftbrand-example.com',
    status: 'up',
    httpStatus: 200,
    responseTime: 310,
    lastChecked: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    uptimePercentage: 99.6,
    isDemo: true,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'up',
      responseTime: Math.floor(290 + Math.random() * 50),
      httpStatus: 200,
    })),
  },
  {
    id: 'site-5',
    name: 'API Documentation Portal',
    url: 'https://docs.apihub-example.dev',
    status: 'up',
    httpStatus: 200,
    responseTime: 142,
    lastChecked: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    uptimePercentage: 99.95,
    isDemo: true,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'up',
      responseTime: Math.floor(130 + Math.random() * 30),
      httpStatus: 200,
    })),
  },
];

export const DEMO_BROKEN_LINKS: BrokenLink[] = [
  {
    id: 'bl-1',
    sourceUrl: 'https://demo.clouddesk-example.com/pricing',
    brokenUrl: 'https://demo.clouddesk-example.com/assets/whitepaper-v1.pdf',
    httpStatus: 404,
    discoveredAt: '2026-10-25T10:15:00Z',
    fixed: false,
  },
  {
    id: 'bl-2',
    sourceUrl: 'https://demo.clouddesk-example.com/about',
    brokenUrl: 'https://demo.clouddesk-example.com/team/sarah-adams',
    httpStatus: 404,
    discoveredAt: '2026-10-26T14:22:00Z',
    fixed: true,
  },
  {
    id: 'bl-3',
    sourceUrl: 'https://blog.techstack-example.org/react-performance',
    brokenUrl: 'https://blog.techstack-example.org/benchmarks-2025',
    httpStatus: 404,
    discoveredAt: '2026-10-28T09:05:00Z',
    fixed: false,
  },
  {
    id: 'bl-4',
    sourceUrl: 'https://saas-launchpad-example.io/integrations',
    brokenUrl: 'https://saas-launchpad-example.io/auth/callback/slack-old',
    httpStatus: 500,
    discoveredAt: '2026-10-29T11:40:00Z',
    fixed: false,
  },
  {
    id: 'bl-5',
    sourceUrl: 'https://store.craftbrand-example.com/checkout/terms',
    brokenUrl: 'https://store.craftbrand-example.com/return-policy-2024',
    httpStatus: 404,
    discoveredAt: '2026-10-22T08:12:00Z',
    fixed: true,
  },
  {
    id: 'bl-6',
    sourceUrl: 'https://docs.apihub-example.dev/v2/webhooks',
    brokenUrl: 'https://docs.apihub-example.dev/schemas/event-payload.json',
    httpStatus: 403,
    discoveredAt: '2026-10-29T16:50:00Z',
    fixed: false,
  },
];

export const DEMO_PERFORMANCE: PerformanceMetric[] = [
  {
    id: 'perf-1',
    websiteId: 'site-1',
    timestamp: '2026-10-30T10:00:00Z',
    performanceScore: 94,
    accessibilityScore: 98,
    bestPracticesScore: 96,
    seoScore: 100,
    firstContentfulPaint: 0.9,
    largestContentfulPaint: 1.6,
    totalBlockingTime: 40,
    cumulativeLayoutShift: 0.02,
    isLabData: true,
  },
  {
    id: 'perf-2',
    websiteId: 'site-2',
    timestamp: '2026-10-30T10:00:00Z',
    performanceScore: 82,
    accessibilityScore: 91,
    bestPracticesScore: 88,
    seoScore: 92,
    firstContentfulPaint: 1.5,
    largestContentfulPaint: 2.8,
    totalBlockingTime: 180,
    cumulativeLayoutShift: 0.08,
    isLabData: true,
  },
  {
    id: 'perf-3',
    websiteId: 'site-3',
    timestamp: '2026-10-30T10:00:00Z',
    performanceScore: 68,
    accessibilityScore: 85,
    bestPracticesScore: 78,
    seoScore: 88,
    firstContentfulPaint: 2.1,
    largestContentfulPaint: 3.9,
    totalBlockingTime: 420,
    cumulativeLayoutShift: 0.16,
    isLabData: true,
  },
  {
    id: 'perf-4',
    websiteId: 'site-4',
    timestamp: '2026-10-30T10:00:00Z',
    performanceScore: 76,
    accessibilityScore: 90,
    bestPracticesScore: 84,
    seoScore: 95,
    firstContentfulPaint: 1.8,
    largestContentfulPaint: 3.2,
    totalBlockingTime: 260,
    cumulativeLayoutShift: 0.05,
    isLabData: true,
  },
  {
    id: 'perf-5',
    websiteId: 'site-5',
    timestamp: '2026-10-30T10:00:00Z',
    performanceScore: 98,
    accessibilityScore: 100,
    bestPracticesScore: 100,
    seoScore: 98,
    firstContentfulPaint: 0.6,
    largestContentfulPaint: 1.1,
    totalBlockingTime: 10,
    cumulativeLayoutShift: 0.01,
    isLabData: true,
  },
];

export const DEMO_TASKS: MaintenanceTask[] = [
  {
    id: 'task-1',
    websiteId: 'site-1',
    title: 'Fix 404 on pricing whitepaper link',
    description: 'Update the PDF href link on the pricing comparison table.',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-10-26T09:00:00Z',
    estimatedTime: 20,
    actualTime: 15,
    notes: ['Located missing asset in CDN', 'Awaiting new copy from client'],
  },
  {
    id: 'task-2',
    websiteId: 'site-3',
    title: 'Optimize hero video payload for mobile',
    description: 'Compress 18MB hero video to WebM under 2MB to improve LCP from 3.9s to <2.0s.',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-10-29T12:30:00Z',
    updatedAt: '2026-10-29T12:30:00Z',
    estimatedTime: 45,
    notes: ['Video bitrate currently too high for 4G connections'],
  },
  {
    id: 'task-3',
    websiteId: 'site-2',
    title: 'Re-verify weekly cloud backups',
    description: 'Ensure automated staging and production database snapshots are synced to S3 bucket.',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-10-27T08:00:00Z',
    updatedAt: '2026-10-27T08:35:00Z',
    completedAt: '2026-10-27T08:35:00Z',
    estimatedTime: 30,
    actualTime: 35,
    notes: ['All snapshots verified successfully. Checksum match confirmed.'],
  },
  {
    id: 'task-4',
    websiteId: 'site-4',
    title: 'Repair contact form validation bug on Safari iOS',
    description: 'Form submission fails silently on iOS 17 due to unhandled datepicker attribute.',
    priority: 'critical',
    status: 'completed',
    createdAt: '2026-10-24T15:10:00Z',
    updatedAt: '2026-10-24T16:25:00Z',
    completedAt: '2026-10-24T16:25:00Z',
    estimatedTime: 60,
    actualTime: 75,
    notes: ['Patched regex validator and polyfilled date input', 'Tested on iPhone 15 simulator'],
  },
  {
    id: 'task-5',
    websiteId: 'site-5',
    title: 'Audit SSL certificate expiry dates',
    description: 'Check Let’s Encrypt auto-renewal hook and certbot cron daemon status.',
    priority: 'medium',
    status: 'completed',
    createdAt: '2026-10-28T10:00:00Z',
    updatedAt: '2026-10-28T10:20:00Z',
    completedAt: '2026-10-28T10:20:00Z',
    estimatedTime: 20,
    actualTime: 15,
    notes: ['Valid until January 28, 2027. Auto-renewal dry run succeeded.'],
  },
];

export const DEMO_REPORTS: MaintenanceReport[] = [
  {
    id: 'rep-2026-10',
    websiteId: 'site-1',
    generatedAt: '2026-10-30T14:00:00Z',
    period: { start: '2026-10-01', end: '2026-10-30' },
    summary: {
      totalChecks: 1440,
      uptimePercentage: 99.85,
      issuesFound: 4,
      issuesFixed: 3,
      tasksCompleted: 4,
    },
    details: DEMO_TASKS,
    recommendations: [
      'Upgrade Webpack bundler to Vite or modern Next.js output for faster script execution.',
      'Configure Cloudflare Brotli compression to save ~18% bandwidth on CSS assets.',
      'Schedule quarterly SSL cert renewal drills.',
    ],
  },
  {
    id: 'rep-2026-09',
    websiteId: 'site-1',
    generatedAt: '2026-09-30T14:00:00Z',
    period: { start: '2026-09-01', end: '2026-09-30' },
    summary: {
      totalChecks: 1440,
      uptimePercentage: 99.92,
      issuesFound: 2,
      issuesFixed: 2,
      tasksCompleted: 3,
    },
    details: DEMO_TASKS.slice(2),
    recommendations: [
      'Preload hero font assets to eliminate layout shifts on slower mobile connections.',
      'Archive blog posts from 2022 to improve database query index performance.',
    ],
  },
];

// --- CRM & BUSINESS OPERATIONS DEMO DATA ---

export const DEMO_LEADS: Lead[] = [
  {
    id: 'lead-1',
    companyName: 'VeloMetrics SaaS',
    website: 'https://velometrics-example.io',
    founderName: 'Alex Mercer',
    founderLinkedIn: 'https://linkedin.com/in/alexmercer-demo',
    publicEmail: 'alex@velometrics-example.io',
    country: 'United Kingdom',
    industry: 'DevOps / Observability',
    techStack: 'Next.js, Vercel, Tailwind',
    identifiedIssue: 'Docs search button returns 404; footer newsletter form throws unhandled JS exception on Safari.',
    potentialService: 'Growth Care ($49/mo)',
    prospectSource: 'Product Hunt Launch Archive',
    contactDate: '2026-10-24',
    followUpDate: '2026-10-31',
    response: 'Showed interest in 1-hour audit pilot.',
    dealStatus: 'replied',
    estimatedDealValue: 49,
    notes: 'Alex is sole technical founder, currently overwhelmed by backend feature sprints.',
    createdAt: '2026-10-24T10:00:00Z',
    updatedAt: '2026-10-28T14:20:00Z',
  },
  {
    id: 'lead-2',
    companyName: 'Loomi Studio',
    website: 'https://loomistudio-example.co',
    founderName: 'Clara Dupont',
    founderLinkedIn: 'https://linkedin.com/in/claradupont-demo',
    publicEmail: 'contact@loomistudio-example.co',
    country: 'France',
    industry: 'Design Agency / SaaS Templates',
    techStack: 'Webflow, Zapier, Stripe',
    identifiedIssue: 'Stripe webhook occasionally fails to trigger onboarding email after checkout.',
    potentialService: 'Growth Care ($49/mo)',
    prospectSource: 'Twitter / Indie Hackers',
    contactDate: '2026-10-20',
    followUpDate: '2026-10-27',
    response: 'Asked for proposal & scope outline.',
    dealStatus: 'proposal-sent',
    estimatedDealValue: 49,
    notes: 'Sent formal proposal on 2026-10-25. Follow up due today.',
    createdAt: '2026-10-20T11:00:00Z',
    updatedAt: '2026-10-25T16:00:00Z',
  },
  {
    id: 'lead-3',
    companyName: 'HyperDraft AI',
    website: 'https://hyperdraft-example.com',
    founderName: 'David Chen',
    founderLinkedIn: 'https://linkedin.com/in/davidchen-demo',
    publicEmail: 'hello@hyperdraft-example.com',
    country: 'United States',
    industry: 'AI Content Generation',
    techStack: 'React, Node.js, AWS CloudFront',
    identifiedIssue: 'Landing page LCP is 4.8s; mobile hero section elements overlap on viewport < 375px.',
    potentialService: 'Technical Partner ($99/mo)',
    prospectSource: 'Y Combinator Startup Directory',
    contactDate: '2026-10-26',
    followUpDate: '2026-11-02',
    response: 'Booked 15-minute quick alignment call for Friday.',
    dealStatus: 'meeting-scheduled',
    estimatedDealValue: 99,
    notes: 'Prioritizing mobile redesign fixes before Product Hunt relaunch.',
    createdAt: '2026-10-26T09:00:00Z',
    updatedAt: '2026-10-29T18:10:00Z',
  },
  {
    id: 'lead-4',
    companyName: 'NordicFin B2B',
    website: 'https://nordicfin-example.se',
    founderName: 'Henrik Larsson',
    founderLinkedIn: 'https://linkedin.com/in/henriklarsson-demo',
    publicEmail: 'support@nordicfin-example.se',
    country: 'Sweden',
    industry: 'FinTech Micro-SaaS',
    techStack: 'Vue.js, Nuxt, Netlify',
    identifiedIssue: 'Outdated contact form without CSRF protection and broken footer navigation links.',
    potentialService: 'Essential Care ($19/mo)',
    prospectSource: 'LinkedIn Search',
    contactDate: '2026-10-28',
    followUpDate: '2026-11-03',
    response: 'No response yet.',
    dealStatus: 'contacted',
    estimatedDealValue: 19,
    notes: 'Initial outreach sent on 28th. Follow-up scheduled for Day 4.',
    createdAt: '2026-10-28T14:00:00Z',
    updatedAt: '2026-10-28T14:00:00Z',
  },
  {
    id: 'lead-5',
    companyName: 'KipFlow Project Tools',
    website: 'https://kipflow-example.dev',
    founderName: 'Rohan Sharma',
    founderLinkedIn: 'https://linkedin.com/in/rohansharma-demo',
    publicEmail: 'rohan@kipflow-example.dev',
    country: 'Singapore',
    industry: 'Productivity Software',
    techStack: 'Remix, Supabase, Tailwind',
    identifiedIssue: 'Identified 5 broken links on docs index and broken pricing monthly/annual toggle.',
    potentialService: 'Growth Care ($49/mo)',
    prospectSource: 'BetaList',
    contactDate: '',
    followUpDate: '2026-10-31',
    response: '',
    dealStatus: 'not-contacted',
    estimatedDealValue: 49,
    notes: 'Draft email ready for review in operations system.',
    createdAt: '2026-10-29T11:00:00Z',
    updatedAt: '2026-10-29T11:00:00Z',
  },
  {
    id: 'lead-6',
    companyName: 'Zestful Analytics',
    website: 'https://zestful-example.com',
    founderName: 'Elena Rostova',
    founderLinkedIn: 'https://linkedin.com/in/elenarostova-demo',
    publicEmail: 'elena@zestful-example.com',
    country: 'Germany',
    industry: 'Marketing Tech',
    techStack: 'WordPress, PHP, MySQL',
    identifiedIssue: 'Plugin conflict causing fatal error in contact form submissions.',
    potentialService: 'Paid Pilot ($39 one-time)',
    prospectSource: 'Reddit r/SaaS',
    contactDate: '2026-10-15',
    followUpDate: '2026-10-22',
    response: 'Converted to Paid Pilot. Successful fix delivered.',
    dealStatus: 'paid-pilot',
    estimatedDealValue: 39,
    notes: 'Targeting upgrade to Monthly Growth Care on next sprint.',
    createdAt: '2026-10-15T10:00:00Z',
    updatedAt: '2026-10-24T12:00:00Z',
  },
  {
    id: 'lead-7',
    companyName: 'PulseNode Cloud',
    website: 'https://pulsenode-example.net',
    founderName: 'Marcus Wright',
    founderLinkedIn: 'https://linkedin.com/in/marcuswright-demo',
    publicEmail: 'marcus@pulsenode-example.net',
    country: 'Canada',
    industry: 'Cloud Hosting / Tools',
    techStack: 'SvelteKit, Cloudflare Workers',
    identifiedIssue: 'Regular monitoring required for status page and SSL auto-renewals.',
    potentialService: 'Technical Partner ($99/mo)',
    prospectSource: 'Hacker News Who Is Hiring / Freelance',
    contactDate: '2026-10-01',
    followUpDate: '2026-10-05',
    response: 'Signed up for recurring Technical Partner tier.',
    dealStatus: 'monthly-client',
    estimatedDealValue: 99,
    notes: 'Active client since Oct 5. Excellent relationship.',
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-05T15:00:00Z',
  },
  {
    id: 'lead-8',
    companyName: 'OmniDesk CRM Lite',
    website: 'https://omnidesk-example.org',
    founderName: 'Sophie Van Der Bilt',
    founderLinkedIn: 'https://linkedin.com/in/sophievanderbilt-demo',
    publicEmail: 'sophie@omnidesk-example.org',
    country: 'Netherlands',
    industry: 'B2B CRM',
    techStack: 'Ruby on Rails, Heroku',
    identifiedIssue: 'Internal developer handles updates.',
    potentialService: 'Essential Care ($19/mo)',
    prospectSource: 'Crunchbase',
    contactDate: '2026-10-18',
    followUpDate: '2026-10-22',
    response: 'Politely declined; existing full-time contractor on retainer.',
    dealStatus: 'not-interested',
    estimatedDealValue: 19,
    notes: 'Revisit in 6 months if developer arrangements change.',
    createdAt: '2026-10-18T10:00:00Z',
    updatedAt: '2026-10-22T09:30:00Z',
  },
];

export const DEMO_CLIENTS: Client[] = [
  {
    id: 'client-1',
    companyName: 'PulseNode Cloud',
    website: 'https://pulsenode-example.net',
    contactName: 'Marcus Wright',
    contactEmail: 'marcus@pulsenode-example.net',
    contactLinkedIn: 'https://linkedin.com/in/marcuswright-demo',
    country: 'Canada',
    industry: 'Cloud Infrastructure',
    contractStatus: 'active',
    selectedPackage: 'technical-partner',
    monthlyRevenue: 99,
    startDate: '2026-10-05',
    renewalDate: '2026-11-05',
    paymentStatus: 'paid',
    taskHistory: ['task-1', 'task-5'],
    supportRequests: [
      {
        id: 'sr-1',
        clientId: 'client-1',
        subject: 'Subdomain DNS routing issue after Cloudflare change',
        description: 'New staging portal returning 522 connection timed out.',
        priority: 'high',
        status: 'resolved',
        createdAt: '2026-10-20T10:00:00Z',
        resolvedAt: '2026-10-20T11:45:00Z',
      },
    ],
    notes: 'Prefers communication via email or asynchronous Loom summaries.',
    createdAt: '2026-10-05T08:00:00Z',
  },
  {
    id: 'client-2',
    companyName: 'OrbitFlow HR',
    website: 'https://orbitflow-example.io',
    contactName: 'Hannah Abbott',
    contactEmail: 'hannah@orbitflow-example.io',
    contactLinkedIn: 'https://linkedin.com/in/hannahabbott-demo',
    country: 'United Kingdom',
    industry: 'HR SaaS',
    contractStatus: 'active',
    selectedPackage: 'growth',
    monthlyRevenue: 49,
    startDate: '2026-09-15',
    renewalDate: '2026-11-15',
    paymentStatus: 'paid',
    taskHistory: ['task-3'],
    supportRequests: [],
    notes: 'Monthly 2-hour allotment used for marketing page copy tweaks and A/B test setups.',
    createdAt: '2026-09-15T12:00:00Z',
  },
  {
    id: 'client-3',
    companyName: 'CraftBrand Goods',
    website: 'https://store.craftbrand-example.com',
    contactName: 'Liam O’Connor',
    contactEmail: 'liam@craftbrand-example.com',
    contactLinkedIn: 'https://linkedin.com/in/liamoconnor-demo',
    country: 'Ireland',
    industry: 'Direct to Consumer / E-Commerce',
    contractStatus: 'active',
    selectedPackage: 'essential',
    monthlyRevenue: 19,
    startDate: '2026-10-10',
    renewalDate: '2026-11-10',
    paymentStatus: 'pending',
    taskHistory: ['task-4'],
    supportRequests: [],
    notes: 'Invoice for Nov renewal scheduled to be sent on Nov 3rd.',
    createdAt: '2026-10-10T14:00:00Z',
  },
];

export const DEMO_REVENUE: RevenueEntry[] = [
  {
    id: 'rev-1',
    clientId: 'client-1',
    amount: 99,
    type: 'recurring',
    description: 'Technical Partner Tier - Oct 2026',
    date: '2026-10-05',
    status: 'paid',
  },
  {
    id: 'rev-2',
    clientId: 'client-2',
    amount: 49,
    type: 'recurring',
    description: 'Growth Care Tier - Oct 2026',
    date: '2026-10-15',
    status: 'paid',
  },
  {
    id: 'rev-3',
    clientId: 'client-3',
    amount: 19,
    type: 'recurring',
    description: 'Essential Care Tier - Oct 2026',
    date: '2026-10-10',
    status: 'paid',
  },
  {
    id: 'rev-4',
    clientId: 'lead-6',
    amount: 39,
    type: 'one-time',
    description: 'WordPress Contact Form Conflict Emergency Fix',
    date: '2026-10-22',
    status: 'paid',
  },
  {
    id: 'rev-5',
    clientId: 'client-2',
    amount: 49,
    type: 'recurring',
    description: 'Growth Care Tier - Sep 2026',
    date: '2026-09-15',
    status: 'paid',
  },
];

export const DEMO_FOLLOW_UPS: FollowUp[] = [
  {
    id: 'fu-1',
    leadId: 'lead-2',
    type: 'follow-up',
    title: 'Follow up on Loomi Studio proposal (Day 4)',
    dueDate: new Date().toISOString().split('T')[0], // Today
    completed: false,
    notes: 'Check if Clara reviewed the 2-hour technical support scope and pricing.',
  },
  {
    id: 'fu-2',
    leadId: 'lead-1',
    type: 'proposal',
    title: 'Send paid pilot agreement to Alex at VeloMetrics',
    dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
    completed: false,
    notes: 'Draft scope for Safari form fix and broken docs link remediation.',
  },
  {
    id: 'fu-3',
    leadId: 'lead-3',
    type: 'meeting',
    title: 'Discovery alignment call with David (HyperDraft AI)',
    dueDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split('T')[0],
    completed: false,
    notes: 'Discuss mobile layout responsive fixes and performance optimizations.',
  },
  {
    id: 'fu-4',
    clientId: 'client-3',
    type: 'renewal',
    title: 'Send upcoming renewal reminder to CraftBrand Goods',
    dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
    completed: false,
    notes: 'Monthly health check report for October attached.',
  },
  {
    id: 'fu-5',
    leadId: 'lead-4',
    type: 'check-in',
    title: 'Day 4 gentle follow up email with Henrik (NordicFin)',
    dueDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0], // Overdue
    completed: false,
    notes: 'Friendly ping regarding identified form issue.',
  },
];

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: 'tpl-1',
    name: '1. Initial Founder Outreach',
    type: 'initial',
    subject: 'Quick question about {{companyName}}’s website / {{identifiedIssue}}',
    body: `Hi {{founderName}},

I came across {{companyName}} while researching modern startups in {{industry}} — love what you are building.

While browsing your site ({{website}}), I noticed a small technical issue:
👉 {{identifiedIssue}}

This can create friction for potential customers attempting to engage with your product.

I run Northstar Web Care — an independent website maintenance and technical support service for early-stage startups. We take care of recurring maintenance, bug fixes, responsiveness, and performance without the expense of hiring a dedicated developer.

Would you be open to me fixing this for you as a complimentary initial fix, or sharing a quick 3-point health check of your site?

No pushy sales pitch — just happy to help another startup founder.

Best regards,

Technical Partner
Northstar Web Care
https://northstarwebcare.com`,
    variables: ['companyName', 'founderName', 'industry', 'website', 'identifiedIssue'],
  },
  {
    id: 'tpl-2',
    name: '2. Follow-Up After 4 Working Days',
    type: 'follow-up',
    subject: 'Re: Quick question about {{companyName}}’s website',
    body: `Hi {{founderName}},

Following up briefly on my note from earlier this week regarding {{companyName}}’s site.

I know how demanding founder schedules can be, so I wanted to keep this brief. If you’ve already resolved the {{identifiedIssue}}, fantastic!

If you haven’t had a chance yet and need an experienced pair of hands to handle ongoing website maintenance, bug fixes, or performance checks from $19/month, we're here whenever helpful.

Wishing you smooth product traction this quarter.

Best regards,

Technical Partner
Northstar Web Care`,
    variables: ['companyName', 'founderName', 'identifiedIssue'],
  },
  {
    id: 'tpl-3',
    name: '3. Website Assessment Email',
    type: 'assessment',
    subject: 'Website Health Assessment for {{companyName}}',
    body: `Hi {{founderName}},

As discussed, I completed an initial technical assessment of {{website}}. Here is the summary of our findings:

1. High Priority:
- {{identifiedIssue}}
- Missing or malformed Open Graph metadata on product subpages.

2. Performance & Responsiveness:
- Desktop performance is strong, but mobile view experiences slight layout shifts on screens under 375px.
- Uncompressed assets could be optimized to save ~40% load time.

3. Health & Monitoring:
- SSL certificate is valid and auto-renewing.
- Core contact form endpoints responded within 320ms.

Recommended Next Step:
We can address these items within our {{potentialService}} tier, or resolve the high priority bugs in a single focused sprint.

Let me know if you would like me to proceed with a one-page scope outline.

Best regards,

Technical Partner
Northstar Web Care`,
    variables: ['companyName', 'founderName', 'website', 'identifiedIssue', 'potentialService'],
  },
  {
    id: 'tpl-4',
    name: '4. Paid Pilot Proposal',
    type: 'proposal',
    subject: 'One-Time Website Fix Pilot for {{companyName}}',
    body: `Hi {{founderName}},

Here is the concise proposal for our initial paid pilot to get {{companyName}}’s website into top shape:

OBJECTIVE:
Resolve {{identifiedIssue}} and perform a complete cross-browser verification.

SCOPE:
- Isolate and patch the reported bug.
- Verify responsiveness across mobile (iOS/Android) and modern desktop browsers.
- Perform link integrity check on all public pages.
- Deliver code modifications with a clean summary of changes.

INVESTMENT & TIMELINE:
- Fixed Fee: $39 (one-time)
- Turnaround: 24–48 hours from repository/staging access
- Guarantee: 100% money-back if the identified bug is not resolved to your satisfaction.

To proceed, simply reply "Approved" and provide access instructions or let me know the best repository invitation handle.

Best regards,

Technical Partner
Northstar Web Care`,
    variables: ['companyName', 'founderName', 'identifiedIssue'],
  },
  {
    id: 'tpl-5',
    name: '5. Maintenance Agreement',
    type: 'agreement',
    subject: 'Northstar Web Care — {{selectedPackage}} Agreement for {{companyName}}',
    body: `WEBSITE MAINTENANCE AGREEMENT

Client: {{companyName}} ({{contactName}})
Provider: Northstar Web Care
Selected Service Tier: {{selectedPackage}}
Monthly Rate: {{monthlyRate}} / month (Billed monthly, cancel anytime)

INCLUDED SERVICES:
- Continuous availability and uptime monitoring.
- Broken link scans and periodic health checks.
- Monthly technical allocation: {{allocatedHours}} of minor technical changes and bug fixes.
- Verified backup status reviews.
- Monthly maintenance executive report.

SCOPE EXCLUSIONS:
- Web hosting and domain registration fees.
- Complete website redesigns or ground-up application rebuilds.
- Third-party SaaS license subscriptions.
- 24/7 on-call emergency response (support provided during agreed business hours).

TERMS:
- Invoices are issued monthly in advance.
- Work begins immediately upon receipt of initial retainer.
- Agreement may be paused or cancelled at any time prior to the next billing cycle.

Approved by: _______________________
Date: {{date}}`,
    variables: ['companyName', 'contactName', 'selectedPackage', 'monthlyRate', 'allocatedHours', 'date'],
  },
  {
    id: 'tpl-6',
    name: '6. Project Completion Email',
    type: 'completion',
    subject: 'Work Completed: Website Updates for {{companyName}}',
    body: `Hi {{founderName}},

All planned maintenance tasks for {{companyName}} have been successfully deployed and verified:

COMPLETED WORK:
- {{taskSummary}}
- Verified HTTP status codes across all modified templates.
- Cross-tested across Chrome, Safari, and Firefox.

DOCUMENTATION:
- Commit notes and modified files have been documented in your client log.
- Backup verified prior to production push.

Everything is currently operating smoothly in production. Please let me know if you would like any further adjustments!

Best regards,

Technical Partner
Northstar Web Care`,
    variables: ['founderName', 'companyName', 'taskSummary'],
  },
  {
    id: 'tpl-7',
    name: '7. Monthly Maintenance Report',
    type: 'report',
    subject: 'Monthly Website Maintenance Report — {{month}} — {{companyName}}',
    body: `MONTHLY WEBSITE MAINTENANCE SUMMARY

Website: {{website}}
Reporting Period: {{month}}
Service Plan: {{selectedPackage}}

HIGHLIGHTS:
- Uptime Record: {{uptimePercentage}}%
- Average Response Time: {{avgResponseTime}}ms
- Total Health Checks Performed: 1,440
- Broken Links Detected & Remediated: {{brokenLinksCount}}
- Maintenance Tasks Completed: {{tasksCompletedCount}}

KEY ACTIVITIES CARRIED OUT:
{{completedActivitiesList}}

UPCOMING RECOMMENDATIONS:
{{upcomingRecommendations}}

Your site is in robust condition. If you have any tasks for next month's hours allotment, feel free to send them over anytime.

Best regards,

Technical Partner
Northstar Web Care`,
    variables: [
      'month',
      'companyName',
      'website',
      'selectedPackage',
      'uptimePercentage',
      'avgResponseTime',
      'brokenLinksCount',
      'tasksCompletedCount',
      'completedActivitiesList',
      'upcomingRecommendations',
    ],
  },
  {
    id: 'tpl-8',
    name: '8. Client Onboarding Checklist',
    type: 'onboarding',
    subject: 'Welcome to Northstar Web Care — Onboarding Checklist for {{companyName}}',
    body: `Hi {{founderName}},

Welcome to Northstar Web Care! We are thrilled to partner with {{companyName}} to keep your website fast, stable, and reliable.

To get your maintenance coverage up and running, please complete this quick 3-step checklist:

[ ] Step 1: Technical Access
Share read/write access to your website repository (GitHub/GitLab) or deployment hosting (Vercel/Netlify/cPanel).
*Tip: If you prefer, you can invite us as a contributor to an isolated deployment team.*

[ ] Step 2: Emergency Contact & Preferred Communication
Let us know your preferred communication channel (Email, Slack Connect, or Discord) and hours for urgent notifications.

[ ] Step 3: Priority Task List
Share any immediate bugs, visual glitches, or content updates you would like us to tackle within your first month's allotment.

Once Step 1 is ready, we will conduct our baseline website health audit and activate continuous monitoring.

Looking forward to working together!

Best regards,

Technical Partner
Northstar Web Care`,
    variables: ['founderName', 'companyName'],
  },
];
