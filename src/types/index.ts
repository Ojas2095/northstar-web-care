// ============================================================
// Northstar Web Care — Shared Type Definitions
// ============================================================

// --- Website / Business Website Types ---

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  honeypot: string; // spam protection
}

// --- CloudDesk Dashboard Types ---

export interface MonitoredWebsite {
  id: string;
  url: string;
  name: string;
  status: 'up' | 'down' | 'degraded' | 'unknown';
  httpStatus: number | null;
  responseTime: number | null;
  lastChecked: string | null;
  uptimePercentage: number;
  history: UptimeRecord[];
  isDemo: boolean;
}

export interface UptimeRecord {
  timestamp: string;
  status: 'up' | 'down' | 'degraded';
  responseTime: number;
  httpStatus: number;
}

export interface BrokenLink {
  id: string;
  sourceUrl: string;
  brokenUrl: string;
  httpStatus: number;
  discoveredAt: string;
  fixed: boolean;
}

export interface PerformanceMetric {
  id: string;
  websiteId: string;
  timestamp: string;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  isLabData: boolean;
}

export interface MaintenanceTask {
  id: string;
  websiteId?: string;
  clientId?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  estimatedTime?: number; // minutes
  actualTime?: number; // minutes
  notes: string[];
  assignee?: string;
}

export interface MaintenanceReport {
  id: string;
  websiteId: string;
  generatedAt: string;
  period: { start: string; end: string };
  summary: {
    totalChecks: number;
    uptimePercentage: number;
    issuesFound: number;
    issuesFixed: number;
    tasksCompleted: number;
  };
  details: MaintenanceTask[];
  recommendations: string[];
}

// --- CRM / Business Operations Types ---

export type LeadStatus =
  | 'not-contacted'
  | 'contacted'
  | 'replied'
  | 'interested'
  | 'meeting-scheduled'
  | 'proposal-sent'
  | 'paid-pilot'
  | 'monthly-client'
  | 'not-interested';

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  'not-contacted': 'Not Contacted',
  'contacted': 'Contacted',
  'replied': 'Replied',
  'interested': 'Interested',
  'meeting-scheduled': 'Meeting Scheduled',
  'proposal-sent': 'Proposal Sent',
  'paid-pilot': 'Paid Pilot',
  'monthly-client': 'Monthly Client',
  'not-interested': 'Not Interested',
};

export interface Lead {
  id: string;
  companyName: string;
  website: string;
  founderName: string;
  founderLinkedIn: string;
  publicEmail: string;
  country: string;
  industry: string;
  techStack: string;
  identifiedIssue: string;
  potentialService: string;
  prospectSource: string;
  contactDate: string;
  followUpDate: string;
  response: string;
  dealStatus: LeadStatus;
  estimatedDealValue: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';

export interface Client {
  id: string;
  companyName: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactLinkedIn: string;
  country: string;
  industry: string;
  contractStatus: 'active' | 'paused' | 'cancelled' | 'pending';
  selectedPackage: 'essential' | 'growth' | 'technical-partner' | 'custom';
  monthlyRevenue: number;
  startDate: string;
  renewalDate: string;
  paymentStatus: PaymentStatus;
  taskHistory: string[];
  supportRequests: SupportRequest[];
  notes: string;
  createdAt: string;
}

export interface SupportRequest {
  id: string;
  clientId: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
}

export interface RevenueEntry {
  id: string;
  clientId: string;
  amount: number;
  type: 'recurring' | 'one-time';
  description: string;
  date: string;
  status: PaymentStatus;
}

export interface FollowUp {
  id: string;
  leadId?: string;
  clientId?: string;
  type: 'follow-up' | 'meeting' | 'proposal' | 'renewal' | 'check-in';
  title: string;
  dueDate: string;
  completed: boolean;
  notes: string;
}

// --- Outreach Template Types ---

export interface OutreachTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'initial' | 'follow-up' | 'assessment' | 'proposal' | 'agreement' | 'completion' | 'report' | 'onboarding';
  variables: string[]; // placeholders like {{companyName}}
}
