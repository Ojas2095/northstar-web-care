import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Building2,
  Plus,
  ExternalLink,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  LifeBuoy,
} from 'lucide-react';
import { DEMO_CLIENTS } from '../../data/demoData';
import { Client, PaymentStatus } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const PACKAGE_LABELS = {
  essential: 'Essential Care ($19/mo)',
  growth: 'Growth Care ($49/mo)',
  'technical-partner': 'Technical Partner ($99/mo)',
  custom: 'Custom Scope',
};

const PACKAGE_BADGE_VARIANTS: Record<string, 'info' | 'teal' | 'success' | 'neutral'> = {
  essential: 'info',
  growth: 'teal',
  'technical-partner': 'success',
  custom: 'neutral',
};

export default function ClientsPage() {
  const [clients, setClients] = useLocalStorage<Client[]>('northstar-crm-clients', DEMO_CLIENTS);
  const [expandedClientId, setExpandedClientId] = useState<string | null>('client-1');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formCompany, setFormCompany] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactEmail, setFormContactEmail] = useState('');
  const [formPackage, setFormPackage] = useState<'essential' | 'growth' | 'technical-partner' | 'custom'>('growth');
  const [formMRR, setFormMRR] = useState(49);
  const [formNotes, setFormNotes] = useState('');

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: `client-${Date.now()}`,
      companyName: formCompany,
      website: formWebsite,
      contactName: formContactName,
      contactEmail: formContactEmail,
      contactLinkedIn: '',
      country: 'Global',
      industry: 'SaaS / Software',
      contractStatus: 'active',
      selectedPackage: formPackage,
      monthlyRevenue: Number(formMRR),
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      paymentStatus: 'paid',
      taskHistory: [],
      supportRequests: [],
      notes: formNotes,
      createdAt: new Date().toISOString(),
    };
    setClients([newClient, ...clients]);
    setIsModalOpen(false);
  };

  const totalMRR = clients.reduce((sum, c) => sum + (c.contractStatus === 'active' ? c.monthlyRevenue : 0), 0);
  const activeCount = clients.filter((c) => c.contractStatus === 'active').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Active Retainer Clients — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Client Retainer Accounts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Contract statuses, recurring revenue renewals, and client ticket queues.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Retainer Client</span>
        </Button>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Monthly Recurring Revenue</span>
          <p className="text-2xl font-bold text-teal-600 mt-1">${totalMRR} / mo</p>
          <span className="text-[11px] text-gray-400">Total active recurring retainers</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Active Retainers</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">{activeCount} Founders</p>
          <span className="text-[11px] text-gray-400">Essential, Growth & Technical Partner</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Average Account Value</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">
            ${activeCount > 0 ? Math.round(totalMRR / activeCount) : 0}
          </p>
          <span className="text-[11px] text-gray-400">Blended MRR per customer</span>
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {clients.map((client) => {
          const isExpanded = expandedClientId === client.id;

          return (
            <div
              key={client.id}
              className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5 text-navy-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-semibold text-navy-800 text-base">
                        {client.companyName}
                      </h3>
                      <Badge variant={PACKAGE_BADGE_VARIANTS[client.selectedPackage]} size="sm">
                        {PACKAGE_LABELS[client.selectedPackage]}
                      </Badge>
                      <Badge
                        variant={client.contractStatus === 'active' ? 'success' : 'neutral'}
                        size="sm"
                        dot
                      >
                        {client.contractStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-1">
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-teal-600 flex items-center gap-1 font-mono"
                      >
                        {client.website}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <span>•</span>
                      <span>
                        Primary Contact: <strong className="text-navy-800">{client.contactName}</strong> ({client.contactEmail})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">MRR Retainer</span>
                    <span className="text-base font-bold text-teal-600">${client.monthlyRevenue}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Renewal Date</span>
                    <span className="text-xs font-semibold text-navy-800">{client.renewalDate}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Payment</span>
                    <Badge
                      variant={
                        client.paymentStatus === 'paid'
                          ? 'success'
                          : client.paymentStatus === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {client.paymentStatus}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-navy-800"
                    aria-label="Toggle client details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Client Detail Drawer */}
              {isExpanded && (
                <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Operational Notes */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1.5">
                      <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                        <span>Client Preferences & Notes</span>
                      </h4>
                      <p className="text-xs text-gray-600">{client.notes || 'No notes on file.'}</p>
                    </div>

                    {/* Support Requests Queue */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                      <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                        <LifeBuoy className="w-3.5 h-3.5 text-teal-600" />
                        <span>Recent Support Inquiries ({client.supportRequests.length})</span>
                      </h4>
                      {client.supportRequests.length > 0 ? (
                        <div className="space-y-2">
                          {client.supportRequests.map((req) => (
                            <div key={req.id} className="text-xs border-b border-gray-100 pb-2">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-navy-800">{req.subject}</span>
                                <Badge variant="success" size="sm">{req.status}</Badge>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5">{req.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No open support tickets.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Add Client */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Retainer Client">
        <form onSubmit={handleAddClient} className="space-y-4">
          <Input
            label="Company Name"
            required
            placeholder="e.g. Acme Cloud"
            value={formCompany}
            onChange={(e) => setFormCompany(e.target.value)}
          />
          <Input
            label="Website URL"
            required
            type="url"
            placeholder="https://example.com"
            value={formWebsite}
            onChange={(e) => setFormWebsite(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Name"
              required
              placeholder="e.g. Alex Mercer"
              value={formContactName}
              onChange={(e) => setFormContactName(e.target.value)}
            />
            <Input
              label="Contact Email"
              type="email"
              required
              placeholder="alex@example.com"
              value={formContactEmail}
              onChange={(e) => setFormContactEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Service Tier</label>
              <select
                value={formPackage}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setFormPackage(val);
                  if (val === 'essential') setFormMRR(19);
                  if (val === 'growth') setFormMRR(49);
                  if (val === 'technical-partner') setFormMRR(99);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="essential">Essential Care ($19/mo)</option>
                <option value="growth">Growth Care ($49/mo)</option>
                <option value="technical-partner">Technical Partner ($99/mo)</option>
                <option value="custom">Custom Retainer</option>
              </select>
            </div>
            <Input
              label="Monthly Fee ($)"
              type="number"
              value={formMRR}
              onChange={(e) => setFormMRR(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Onboarding Notes</label>
            <textarea
              rows={2}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="Repo permissions, preferred hours..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Client
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
