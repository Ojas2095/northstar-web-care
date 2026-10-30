import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Globe,
  Clock,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Plus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DEMO_WEBSITES } from '../../data/demoData';
import { MonitoredWebsite } from '../../types';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function MonitoringPage() {
  const [websites, setWebsites] = useState<MonitoredWebsite[]>(DEMO_WEBSITES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'up' | 'degraded' | 'down'>('all');
  const [expandedSiteId, setExpandedSiteId] = useState<string | null>('site-1');
  const [checkingSiteId, setCheckingSiteId] = useState<string | null>(null);

  // New site modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [urlError, setUrlError] = useState('');
  const [securityNotice, setSecurityNotice] = useState('');

  // Validate URL with strict SSRF protection rules
  const validateUrlForSSRF = (inputUrl: string): boolean => {
    try {
      const parsed = new URL(inputUrl);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        setUrlError('Only HTTP/HTTPS URLs are supported.');
        return false;
      }
      const hostname = parsed.hostname.toLowerCase();
      // Guard against localhost, loopback, private IP ranges, cloud metadata
      const forbiddenPatterns = [
        /^localhost$/,
        /^127\./,
        /^10\./,
        /^192\.168\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^169\.254\./, // AWS / Cloud metadata
        /\.internal$/,
        /\.local$/,
      ];
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(hostname)) {
          setUrlError(
            'SSRF Protection Alert: Internal network addresses and cloud metadata endpoints are strictly forbidden.'
          );
          return false;
        }
      }
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL (e.g. https://example.com).');
      return false;
    }
  };

  const handleManualCheck = (siteId: string) => {
    setCheckingSiteId(siteId);
    setTimeout(() => {
      setWebsites((prev) =>
        prev.map((s) => {
          if (s.id === siteId) {
            const newLatency = Math.floor(130 + Math.random() * 90);
            return {
              ...s,
              lastChecked: new Date().toISOString(),
              responseTime: newLatency,
              status: 'up',
              httpStatus: 200,
            };
          }
          return s;
        })
      );
      setCheckingSiteId(null);
    }, 900);
  };

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrlForSSRF(newUrl)) {
      return;
    }
    const newSite: MonitoredWebsite = {
      id: `site-${Date.now()}`,
      name: newName || new URL(newUrl).hostname,
      url: newUrl,
      status: 'up',
      httpStatus: 200,
      responseTime: Math.floor(150 + Math.random() * 50),
      lastChecked: new Date().toISOString(),
      uptimePercentage: 100.0,
      isDemo: true,
      history: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().split('T')[0],
        status: 'up',
        responseTime: Math.floor(150 + Math.random() * 40),
        httpStatus: 200,
      })),
    };
    setWebsites([newSite, ...websites]);
    setNewUrl('');
    setNewName('');
    setIsModalOpen(false);
    setSecurityNotice('Property added to local active monitoring list.');
    setTimeout(() => setSecurityNotice(''), 4000);
  };

  const filteredWebsites = websites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Website Health Monitoring — CloudDesk</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Continuous Website Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            HTTP response verification, SSL certificate lifecycle, and latency tracking.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Monitored Site</span>
        </Button>
      </div>

      {securityNotice && (
        <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
          <span>{securityNotice}</span>
        </div>
      )}

      {/* Security notice banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-navy-800">
            Safe Monitoring Architecture & SSRF Guardrails
          </p>
          <p>
            Health checks run safe, non-intrusive HTTP GET/HEAD requests with rate limits against
            explicitly authorized customer domains only. Localhost, RFC 1918 private subnets, and
            cloud metadata addresses (e.g. 169.254.169.254) are filtered and blocked.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by site name or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'up', 'degraded', 'down'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-navy-800 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Websites List with Accordion History */}
      <div className="space-y-4">
        {filteredWebsites.map((site) => {
          const isExpanded = expandedSiteId === site.id;
          const isChecking = checkingSiteId === site.id;

          return (
            <div
              key={site.id}
              className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Main Info */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-semibold text-navy-800 text-base">{site.name}</h3>
                      <Badge
                        variant={
                          site.status === 'up'
                            ? 'success'
                            : site.status === 'degraded'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                        dot
                      >
                        {site.status.toUpperCase()}
                      </Badge>
                      {site.isDemo && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                          Demo
                        </span>
                      )}
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-400 hover:text-teal-600 flex items-center gap-1 mt-1 font-mono"
                    >
                      {site.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-6 md:border-l md:border-r md:border-gray-100 md:px-6">
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Response Time
                    </span>
                    <span className="text-sm font-semibold text-navy-800">
                      {site.responseTime ? `${site.responseTime} ms` : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      HTTP Status
                    </span>
                    <span className="text-sm font-semibold text-emerald-600 font-mono">
                      {site.httpStatus ? `${site.httpStatus} OK` : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      30-Day Uptime
                    </span>
                    <span className="text-sm font-semibold text-navy-800">
                      {site.uptimePercentage}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isChecking}
                    onClick={() => handleManualCheck(site.id)}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                    <span>{isChecking ? 'Checking...' : 'Check Now'}</span>
                  </Button>
                  <button
                    onClick={() => setExpandedSiteId(isExpanded ? null : site.id)}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-navy-800 transition-colors"
                    aria-label="Toggle uptime history"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Latency Graph */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50/40">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-navy-800">
                      30-Day Daily Latency Telemetry
                    </p>
                    <span className="text-[11px] text-gray-400">
                      Last polled: {new Date(site.lastChecked || '').toLocaleString()}
                    </span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={site.history}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} unit="ms" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#101B2D',
                            borderRadius: '8px',
                            color: '#fff',
                            border: 'none',
                            fontSize: '11px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="responseTime"
                          stroke="#16C7B0"
                          fill="#16C7B0"
                          fillOpacity={0.2}
                          name="Latency (ms)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredWebsites.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy-800">No properties matched</p>
            <p className="text-xs text-gray-400 mt-1">Try resetting your filter or search query.</p>
          </div>
        )}
      </div>

      {/* Modal: Add Monitored Site */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Monitored Website"
      >
        <form onSubmit={handleAddSite} className="space-y-4">
          <Input
            label="Friendly Name"
            placeholder="e.g. Acme SaaS App"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Input
            label="Website URL"
            type="url"
            required
            placeholder="https://example.com"
            value={newUrl}
            onChange={(e) => {
              setNewUrl(e.target.value);
              validateUrlForSSRF(e.target.value);
            }}
            error={urlError}
            helperText="Enter a publicly reachable HTTPS domain. Private IP ranges (RFC 1918) are blocked."
          />
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800">
            Note: All new properties added in this demo are stored in local session state and monitored safely.
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Property
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
