import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Link as LinkIcon,
  AlertTriangle,
  CheckCircle2,
  Scan,
  RefreshCw,
  ExternalLink,
  Download,
  Filter,
  Check,
} from 'lucide-react';
import { DEMO_BROKEN_LINKS } from '../../data/demoData';
import { BrokenLink } from '../../types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function BrokenLinksPage() {
  const [links, setLinks] = useState<BrokenLink[]>(DEMO_BROKEN_LINKS);
  const [isScanning, setIsScanning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unfixed' | 'fixed'>('all');
  const [scanProgress, setScanProgress] = useState(0);

  const totalBroken = links.length;
  const fixedCount = links.filter((l) => l.fixed).length;
  const pendingCount = totalBroken - fixedCount;

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(15);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setScanProgress(0);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const toggleFixStatus = (id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, fixed: !l.fixed } : l))
    );
  };

  const handleExportReport = () => {
    const reportText = `NORTHSTAR WEB CARE — BROKEN LINK AUDIT REPORT
Generated: ${new Date().toISOString()}
Total Links Checked: 248 internal hyperlinks
Broken Links Discovered: ${totalBroken}
Pending Remediation: ${pendingCount}

AFFECTED ROUTES & ENDPOINTS:
${links
  .map(
    (l) =>
      `[${l.fixed ? 'FIXED' : 'BROKEN'}] HTTP ${l.httpStatus} -> ${l.brokenUrl}\n  Source Page: ${l.sourceUrl}\n  Discovered: ${l.discoveredAt}`
  )
  .join('\n\n')}

RECOMMENDED ACTION:
1. Update outdated relative anchor tags on source templates.
2. Establish 301 server redirects for relocated assets.
3. Automate recurring link checks via Northstar scheduled GitHub Actions.
`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `broken-links-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLinks = links.filter((l) => {
    if (filter === 'fixed') return l.fixed;
    if (filter === 'unfixed') return !l.fixed;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Broken Link Scanner — CloudDesk</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Broken Link Detection
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Automated crawler scans internal anchor tags, CDN images, and API endpoints for 404/500 errors.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            className="flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleScan}
            disabled={isScanning}
            className="flex items-center gap-1.5"
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
            <span>{isScanning ? `Crawling (${scanProgress}%)` : 'Run Crawler Scan'}</span>
          </Button>
        </div>
      </div>

      {/* Scan in progress indicator */}
      {isScanning && (
        <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-xs space-y-2">
          <div className="flex justify-between text-xs text-navy-800 font-semibold">
            <span>Crawling site DOM trees for dead links...</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-500 h-2 transition-all duration-300 rounded-full"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-medium">Discovered Issues</p>
            <p className="text-2xl font-bold text-navy-800 mt-1">{totalBroken}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-medium">Awaiting Remediation</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-medium">Fixed & Verified</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{fixedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400 mr-1" />
        {(['all', 'unfixed', 'fixed'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilter(mode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === mode
                ? 'bg-navy-800 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {mode === 'unfixed' ? `Unfixed (${pendingCount})` : mode}
          </button>
        ))}
      </div>

      {/* Table of Broken Links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 w-10">Status</th>
                <th className="px-5 py-3">Broken Target Endpoint</th>
                <th className="px-5 py-3">Found On Source Page</th>
                <th className="px-5 py-3">HTTP Status</th>
                <th className="px-5 py-3">Discovered</th>
                <th className="px-5 py-3 text-right">Remediation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLinks.map((link) => (
                <tr
                  key={link.id}
                  className={`hover:bg-gray-50/60 transition-colors ${
                    link.fixed ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => toggleFixStatus(link.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        link.fixed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title={link.fixed ? 'Mark as unfixed' : 'Mark as resolved'}
                    >
                      {link.fixed && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-red-600 break-all font-medium">
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{link.brokenUrl}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <a
                      href={link.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-navy-800 hover:text-teal-600 flex items-center gap-1 font-mono break-all"
                    >
                      {link.sourceUrl}
                      <ExternalLink className="w-2.5 h-2.5 shrink-0 text-gray-400" />
                    </a>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs">
                    <Badge variant={link.httpStatus === 404 ? 'error' : 'warning'} size="sm">
                      {link.httpStatus} Error
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {new Date(link.discoveredAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Button
                      variant={link.fixed ? 'ghost' : 'outline'}
                      size="sm"
                      onClick={() => toggleFixStatus(link.id)}
                      className="text-xs"
                    >
                      {link.fixed ? 'Reopen' : 'Mark Fixed'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
