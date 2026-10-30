import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Papa from 'papaparse';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ExternalLink,
  Edit2,
  Trash2,
  DollarSign,
  TrendingUp,
  Building,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { DEMO_LEADS } from '../../data/demoData';
import { Lead, LeadStatus, LEAD_STATUS_LABELS } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const STATUS_BADGE_VARIANTS: Record<
  LeadStatus,
  'neutral' | 'info' | 'teal' | 'warning' | 'success' | 'error'
> = {
  'not-contacted': 'neutral',
  'contacted': 'info',
  'replied': 'teal',
  'interested': 'teal',
  'meeting-scheduled': 'warning',
  'proposal-sent': 'warning',
  'paid-pilot': 'success',
  'monthly-client': 'success',
  'not-interested': 'error',
};

export default function LeadsPage() {
  const [leads, setLeads] = useLocalStorage<Lead[]>('northstar-crm-leads', DEMO_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'followUp' | 'company' | 'value'>('followUp');

  // Lead modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Form fields
  const [formCompany, setFormCompany] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formFounderName, setFormFounderName] = useState('');
  const [formFounderLinkedIn, setFormFounderLinkedIn] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formIndustry, setFormIndustry] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formIdentifiedIssue, setFormIdentifiedIssue] = useState('');
  const [formPotentialService, setFormPotentialService] = useState('Growth Care ($49/mo)');
  const [formSource, setFormSource] = useState('Product Hunt');
  const [formContactDate, setFormContactDate] = useState('');
  const [formFollowUpDate, setFormFollowUpDate] = useState('');
  const [formResponse, setFormResponse] = useState('');
  const [formStatus, setFormStatus] = useState<LeadStatus>('not-contacted');
  const [formValue, setFormValue] = useState<number>(49);
  const [formNotes, setFormNotes] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open modal for add or edit
  const openModal = (lead?: Lead) => {
    if (lead) {
      setEditingLead(lead);
      setFormCompany(lead.companyName);
      setFormWebsite(lead.website);
      setFormFounderName(lead.founderName);
      setFormFounderLinkedIn(lead.founderLinkedIn);
      setFormEmail(lead.publicEmail);
      setFormCountry(lead.country);
      setFormIndustry(lead.industry);
      setFormTechStack(lead.techStack);
      setFormIdentifiedIssue(lead.identifiedIssue);
      setFormPotentialService(lead.potentialService);
      setFormSource(lead.prospectSource);
      setFormContactDate(lead.contactDate);
      setFormFollowUpDate(lead.followUpDate);
      setFormResponse(lead.response);
      setFormStatus(lead.dealStatus);
      setFormValue(lead.estimatedDealValue);
      setFormNotes(lead.notes);
    } else {
      setEditingLead(null);
      setFormCompany('');
      setFormWebsite('');
      setFormFounderName('');
      setFormFounderLinkedIn('');
      setFormEmail('');
      setFormCountry('');
      setFormIndustry('');
      setFormTechStack('');
      setFormIdentifiedIssue('');
      setFormPotentialService('Growth Care ($49/mo)');
      setFormSource('Manual Research');
      setFormContactDate(new Date().toISOString().split('T')[0]);
      setFormFollowUpDate(
        new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().split('T')[0]
      );
      setFormResponse('');
      setFormStatus('not-contacted');
      setFormValue(49);
      setFormNotes('');
    }
    setIsModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingLead.id
            ? {
                ...l,
                companyName: formCompany,
                website: formWebsite,
                founderName: formFounderName,
                founderLinkedIn: formFounderLinkedIn,
                publicEmail: formEmail,
                country: formCountry,
                industry: formIndustry,
                techStack: formTechStack,
                identifiedIssue: formIdentifiedIssue,
                potentialService: formPotentialService,
                prospectSource: formSource,
                contactDate: formContactDate,
                followUpDate: formFollowUpDate,
                response: formResponse,
                dealStatus: formStatus,
                estimatedDealValue: Number(formValue),
                notes: formNotes,
                updatedAt: new Date().toISOString(),
              }
            : l
        )
      );
    } else {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        companyName: formCompany,
        website: formWebsite,
        founderName: formFounderName,
        founderLinkedIn: formFounderLinkedIn,
        publicEmail: formEmail,
        country: formCountry,
        industry: formIndustry,
        techStack: formTechStack,
        identifiedIssue: formIdentifiedIssue,
        potentialService: formPotentialService,
        prospectSource: formSource,
        contactDate: formContactDate,
        followUpDate: formFollowUpDate,
        response: formResponse,
        dealStatus: formStatus,
        estimatedDealValue: Number(formValue),
        notes: formNotes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLeads([newLead, ...leads]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Delete this prospect from CRM?')) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `northstar-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV Import
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedLeads: Lead[] = results.data.map((row, idx) => ({
          id: `lead-imported-${Date.now()}-${idx}`,
          companyName: row.companyName || row.Company || 'Untitled Startup',
          website: row.website || row.Website || '',
          founderName: row.founderName || row.Founder || 'Founder',
          founderLinkedIn: row.founderLinkedIn || row.LinkedIn || '',
          publicEmail: row.publicEmail || row.Email || '',
          country: row.country || row.Country || 'Global',
          industry: row.industry || row.Industry || 'Software / SaaS',
          techStack: row.techStack || row['Tech Stack'] || '',
          identifiedIssue: row.identifiedIssue || row.Issue || 'General Maintenance',
          potentialService: row.potentialService || 'Growth Care ($49/mo)',
          prospectSource: row.prospectSource || 'CSV Import',
          contactDate: row.contactDate || new Date().toISOString().split('T')[0],
          followUpDate:
            row.followUpDate ||
            new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().split('T')[0],
          response: row.response || '',
          dealStatus: (row.dealStatus as LeadStatus) || 'not-contacted',
          estimatedDealValue: Number(row.estimatedDealValue || 49),
          notes: row.notes || 'Imported via CSV',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setLeads([...importedLeads, ...leads]);
        alert(`Successfully imported ${importedLeads.length} leads.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      error: (err) => {
        alert(`Error importing CSV: ${err.message}`);
      },
    });
  };

  // Filtering & Sorting
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.publicEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.website.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.dealStatus === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'followUp') {
        return (a.followUpDate || '').localeCompare(b.followUpDate || '');
      }
      if (sortBy === 'company') {
        return a.companyName.localeCompare(b.companyName);
      }
      if (sortBy === 'value') {
        return (b.estimatedDealValue || 0) - (a.estimatedDealValue || 0);
      }
      return 0;
    });

  // Pipeline Metrics
  const totalLeads = leads.length;
  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.estimatedDealValue || 0), 0);
  const payingClients = leads.filter(
    (l) => l.dealStatus === 'paid-pilot' || l.dealStatus === 'monthly-client'
  ).length;
  const conversionRate = totalLeads > 0 ? ((payingClients / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Leads & Prospecting CRM — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Lead Management & Prospecting CRM
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track founder outreach, identified website vulnerabilities, and pipeline deal stages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportCSV}
            accept=".csv"
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => openModal()}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Lead</span>
          </Button>
        </div>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Total Prospects</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">{totalLeads}</p>
          <span className="text-[11px] text-gray-400">All pipeline stages</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Pipeline Value</span>
          <p className="text-2xl font-bold text-teal-600 mt-1">${totalPipelineValue}</p>
          <span className="text-[11px] text-gray-400">Potential monthly MRR</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Active Clients</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{payingClients}</p>
          <span className="text-[11px] text-gray-400">Paid pilot or retainer</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Conversion Rate</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">{conversionRate}%</p>
          <span className="text-[11px] text-gray-400">Prospect to paid customer</span>
        </div>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search company, founder, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-navy-800 focus:outline-none"
          >
            <option value="all">All Stages ({totalLeads})</option>
            {Object.entries(LEAD_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white text-navy-800 focus:outline-none"
          >
            <option value="followUp">Sort by Follow-Up Date</option>
            <option value="company">Sort by Company Name</option>
            <option value="value">Sort by Deal Value</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">Company & Site</th>
                <th className="px-5 py-3">Founder / Contact</th>
                <th className="px-5 py-3">Identified Issue</th>
                <th className="px-5 py-3">Deal Stage</th>
                <th className="px-5 py-3">Est. Value</th>
                <th className="px-5 py-3">Follow-Up</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-semibold text-navy-800 text-sm">{lead.companyName}</p>
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-teal-600 hover:underline flex items-center gap-1 font-mono mt-0.5"
                      >
                        {lead.website.replace(/^https?:\/\//, '')}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-navy-800 text-xs">{lead.founderName}</p>
                    <p className="text-[11px] text-gray-400">{lead.publicEmail}</p>
                    {lead.founderLinkedIn && (
                      <a
                        href={lead.founderLinkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-500 hover:underline block"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <p className="text-xs text-gray-600 line-clamp-2" title={lead.identifiedIssue}>
                      {lead.identifiedIssue}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Stack: {lead.techStack || 'Unspecified'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={STATUS_BADGE_VARIANTS[lead.dealStatus]} size="sm">
                      {LEAD_STATUS_LABELS[lead.dealStatus]}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-navy-800">
                    ${lead.estimatedDealValue}
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    <span
                      className={`font-medium ${
                        lead.followUpDate &&
                        new Date(lead.followUpDate) < new Date(Date.now() - 24 * 3600 * 1000)
                          ? 'text-red-600 font-bold'
                          : 'text-gray-500'
                      }`}
                    >
                      {lead.followUpDate || 'None set'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openModal(lead)}
                        className="p-1.5 rounded text-gray-400 hover:text-navy-800 hover:bg-gray-100"
                        title="Edit lead"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            No leads match your filter criteria.
          </div>
        )}
      </div>

      {/* Modal: Add / Edit Lead */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLead ? 'Edit Prospect Lead' : 'Add New Prospect to Pipeline'}
      >
        <form onSubmit={handleSaveLead} className="space-y-4 max-h-[75vh] overflow-y-auto px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Company Name"
              required
              value={formCompany}
              onChange={(e) => setFormCompany(e.target.value)}
              placeholder="e.g. Acme SaaS"
            />
            <Input
              label="Website URL"
              required
              type="url"
              value={formWebsite}
              onChange={(e) => setFormWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Founder Name"
              required
              value={formFounderName}
              onChange={(e) => setFormFounderName(e.target.value)}
              placeholder="e.g. Sarah Connor"
            />
            <Input
              label="Public Email"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="founder@example.com"
            />
            <Input
              label="Founder LinkedIn"
              type="url"
              value={formFounderLinkedIn}
              onChange={(e) => setFormFounderLinkedIn(e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Country"
              value={formCountry}
              onChange={(e) => setFormCountry(e.target.value)}
              placeholder="e.g. United States"
            />
            <Input
              label="Industry"
              value={formIndustry}
              onChange={(e) => setFormIndustry(e.target.value)}
              placeholder="e.g. AI / Developer Tools"
            />
            <Input
              label="Technology Stack"
              value={formTechStack}
              onChange={(e) => setFormTechStack(e.target.value)}
              placeholder="e.g. Next.js, Vercel"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">
              Identified Website Issue / Friction Point
            </label>
            <textarea
              required
              rows={2}
              value={formIdentifiedIssue}
              onChange={(e) => setFormIdentifiedIssue(e.target.value)}
              placeholder="e.g. Broken pricing toggle on mobile viewport, 404 on docs asset..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Deal Stage</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as LeadStatus)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                {Object.entries(LEAD_STATUS_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Est. Value ($)"
              type="number"
              value={formValue}
              onChange={(e) => setFormValue(Number(e.target.value))}
            />
            <Input
              label="Follow-Up Date"
              type="date"
              value={formFollowUpDate}
              onChange={(e) => setFormFollowUpDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Internal Notes</label>
            <textarea
              rows={2}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="Add personal observations, conversation history..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingLead ? 'Update Lead' : 'Save Prospect'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
