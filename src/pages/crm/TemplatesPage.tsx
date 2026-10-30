import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  Download,
  ShieldCheck,
  Send,
  Eye,
  Edit3,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { OUTREACH_TEMPLATES } from '../../data/demoData';
import { OutreachTemplate } from '../../types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<OutreachTemplate[]>(OUTREACH_TEMPLATES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate>(OUTREACH_TEMPLATES[0]);

  // One-page proposal editable state
  const [proposalClient, setProposalClient] = useState('Acme SaaS Inc.');
  const [proposalFounder, setProposalFounder] = useState('Sarah Adams');
  const [proposalIssue, setProposalIssue] = useState('Navigation menu collision on iOS Safari + Broken checkout webhook');
  const [proposalTier, setProposalTier] = useState('Growth Care ($49/month)');
  const [proposalPrice, setProposalPrice] = useState('49');
  const [proposalTurnaround, setProposalTurnaround] = useState('24–48 hours');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadProposal = () => {
    const proposalContent = `========================================================================
NORTHSTAR WEB CARE — STATEMENT OF WORK & SERVICE PROPOSAL
========================================================================
Client: ${proposalClient}
Attn: ${proposalFounder}
Date: ${new Date().toISOString().split('T')[0]}
Provider: Northstar Web Care (Independent Website Support)
Contact: partner@northstarwebcare.com

1. EXECUTIVE SUMMARY & BACKGROUND
------------------------------------------------------------------------
Northstar Web Care provides reliable, ongoing technical website support
for early-stage SaaS and B2B startups. This proposal covers targeted
remediation and ongoing care to eliminate website friction for your users.

2. IDENTIFIED TECHNICAL DEFECTS
------------------------------------------------------------------------
- ${proposalIssue}
- High priority responsive & integration fixes.

3. PROPOSED SERVICE PACKAGE
------------------------------------------------------------------------
Selected Tier: ${proposalTier}
Recurring Investment: $${proposalPrice} USD / month
Estimated Sprint Turnaround: ${proposalTurnaround}

Included Care:
- Availability and uptime monitoring.
- Broken link scans and periodic health checks.
- Dedicated monthly engineering allocation for bug fixes and content updates.
- Verified backup status reviews.
- Monthly maintenance executive report.

Scope Exclusions:
- Web hosting and domain registration fees.
- Full website ground-up redesigns or application rebuilds.
- Third-party SaaS subscriptions.

4. PAYMENT TERMS & COMMENCEMENT
------------------------------------------------------------------------
- Billed monthly in advance via Stripe. Cancel or pause anytime.
- Work begins within 24 hours of repository or deployment access receipt.

AGREED & ACCEPTED:

Client Signature: _______________________ Date: _______________

Provider Signature: Northstar Web Care   Date: ${new Date().toISOString().split('T')[0]}
========================================================================
`;

    const blob = new Blob([proposalContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Northstar-Proposal-${proposalClient.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Sales & Outreach Playbook — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
          Sales & Outreach Toolkit
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Cold outreach sequences, assessment delivery, one-page proposals, and client onboarding kits.
        </p>
      </div>

      {/* Outreach Workflow Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-800">
            Outreach & Conversion Workflow
          </h2>
          <p className="text-xs text-gray-500">
            Strict human-in-the-loop ethical outbound standard. No mass scraping, no automated bot messaging.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {[
            { step: '1', title: 'Research Startup', desc: 'Identify early-stage bootstrapped SaaS' },
            { step: '2', title: 'Inspect Website', desc: 'Verify public responsiveness and forms' },
            { step: '3', title: 'Spot Real Issue', desc: 'Isolate genuine bug or dead link' },
            { step: '4', title: 'Log in CRM', desc: 'Record founder & issue details' },
            { step: '5', title: 'Personalize Draft', desc: 'Inject findings into template' },
            { step: '6', title: 'Human Approval', desc: 'Founder verifies message tone' },
            { step: '7', title: 'Send Manually', desc: 'Deliver via authentic email client' },
          ].map((s, idx) => (
            <div
              key={s.step}
              className="p-3 rounded-lg border border-gray-100 bg-gray-50/70 text-center relative flex flex-col justify-between"
            >
              <div>
                <span className="w-5 h-5 rounded-full bg-teal-500 text-white inline-flex items-center justify-center text-xs font-bold mb-1.5">
                  {s.step}
                </span>
                <p className="text-xs font-semibold text-navy-800">{s.title}</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Templates Browser (8 Reusable Templates) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-800">
            Field-Tested Outreach & Lifecycle Templates
          </h2>
          <span className="text-xs text-gray-400">8 Standard Sequences</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selection Column */}
          <div className="space-y-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  selectedTemplate.id === tpl.id
                    ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                    : 'bg-white border-gray-200 text-navy-800 hover:border-teal-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{tpl.name}</span>
                  <Badge variant={selectedTemplate.id === tpl.id ? 'teal' : 'neutral'} size="sm">
                    {tpl.type}
                  </Badge>
                </div>
                <p
                  className={`text-[11px] mt-1 truncate ${
                    selectedTemplate.id === tpl.id ? 'text-gray-300' : 'text-gray-400'
                  }`}
                >
                  {tpl.subject}
                </p>
              </button>
            ))}
          </div>

          {/* Active Template Preview and Copy Box */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-bold text-base text-navy-800">{selectedTemplate.name}</h3>
                <p className="text-xs text-teal-600 font-mono mt-0.5">
                  Subject: {selectedTemplate.subject}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  handleCopy(
                    `Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`,
                    selectedTemplate.id
                  )
                }
                className="flex items-center gap-1.5 self-start sm:self-auto"
              >
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Template</span>
                  </>
                )}
              </Button>
            </div>

            {/* Variable Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-gray-400 font-medium">Interpolated fields:</span>
              {selectedTemplate.variables.map((v) => (
                <span
                  key={v}
                  className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-mono text-[11px] border border-teal-200"
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>

            {/* Body */}
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 font-mono text-xs text-navy-800 leading-relaxed whitespace-pre-wrap select-all">
              {selectedTemplate.body}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive One-Page Service Proposal Builder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-navy-800">
              Interactive One-Page Service Proposal Generator
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Customize client details, scope limitations, and download a ready-to-deliver text or PDF proposal.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadProposal}
            className="flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Proposal Statement</span>
          </Button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Target Client Name</label>
            <input
              type="text"
              value={proposalClient}
              onChange={(e) => setProposalClient(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Founder / Decision Maker</label>
            <input
              type="text"
              value={proposalFounder}
              onChange={(e) => setProposalFounder(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Selected Package Tier</label>
            <select
              value={proposalTier}
              onChange={(e) => {
                setProposalTier(e.target.value);
                if (e.target.value.includes('$19')) setProposalPrice('19');
                if (e.target.value.includes('$49')) setProposalPrice('49');
                if (e.target.value.includes('$99')) setProposalPrice('99');
              }}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
            >
              <option value="Essential Care ($19/month)">Essential Care ($19/mo)</option>
              <option value="Growth Care ($49/month)">Growth Care ($49/mo)</option>
              <option value="Technical Partner ($99/month)">Technical Partner ($99/mo)</option>
              <option value="One-Time Fixed Pilot ($39)">One-Time Pilot ($39)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-navy-800 mb-1">Identified Issues & Deliverables Scope</label>
          <input
            type="text"
            value={proposalIssue}
            onChange={(e) => setProposalIssue(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
          />
        </div>

        {/* Live Proposal Preview */}
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
          <div className="text-center pb-4 border-b border-gray-200">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-bold">
              Northstar Web Care — Statement of Work
            </span>
            <h3 className="text-base font-bold text-navy-800 mt-1">
              Website Maintenance Agreement for {proposalClient}
            </h3>
            <p className="text-xs text-gray-400">Attn: {proposalFounder} • Prepared by Northstar Partner</p>
          </div>

          <div className="space-y-2 text-xs text-gray-700">
            <p>
              <strong>Objective:</strong> Resolve reported friction points ({proposalIssue}) and provide ongoing website maintenance.
            </p>
            <p>
              <strong>Plan:</strong> {proposalTier} (Investment: ${proposalPrice}/mo, billed in advance, cancel anytime).
            </p>
            <p>
              <strong>Turnaround SLA:</strong> {proposalTurnaround} standard sprint resolution for minor technical updates.
            </p>
            <p className="text-gray-400 italic">
              Exclusions: Hosting infrastructure fees, full ground-up redesigns, and 3rd-party SaaS fees are not included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
