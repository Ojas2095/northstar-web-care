import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { DEMO_REPORTS, DEMO_WEBSITES } from '../../data/demoData';
import { MaintenanceReport } from '../../types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function ReportsPage() {
  const [reports, setReports] = useState<MaintenanceReport[]>(DEMO_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string>(DEMO_REPORTS[0].id);

  const selectedReport =
    reports.find((r) => r.id === selectedReportId) || reports[0];
  const associatedSite =
    DEMO_WEBSITES.find((s) => s.id === selectedReport.websiteId) || DEMO_WEBSITES[0];

  const handleDownloadReport = (report: MaintenanceReport) => {
    const reportText = `========================================================================
NORTHSTAR WEB CARE — MONTHLY TECHNICAL MAINTENANCE REPORT
========================================================================
Report ID: ${report.id}
Generated: ${new Date(report.generatedAt).toLocaleString()}
Property: ${associatedSite.name} (${associatedSite.url})
Billing / Service Period: ${report.period.start} to ${report.period.end}

EXECUTIVE HEALTH SUMMARY
------------------------------------------------------------------------
- Total Automated Probes: ${report.summary.totalChecks}
- 30-Day Uptime Record: ${report.summary.uptimePercentage}%
- Discovered Vulnerabilities & Broken Links: ${report.summary.issuesFound}
- Issues Resolved: ${report.summary.issuesFixed}
- Maintenance Tasks Delivered: ${report.summary.tasksCompleted}

ENGINEERING INTERVENTIONS & TASKS DELIVERED
------------------------------------------------------------------------
${report.details
  .map(
    (t, i) =>
      `${i + 1}. [${t.status.toUpperCase()}] ${t.title}
   - Time Invested: ${t.actualTime || t.estimatedTime} minutes
   - Description: ${t.description}
   - Verification Notes: ${t.notes.join(' | ') || 'Verified on staging and production.'}`
  )
  .join('\n\n')}

STRATEGIC IMPROVEMENT RECOMMENDATIONS FOR NEXT SPRINT
------------------------------------------------------------------------
${report.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

========================================================================
Prepared by Northstar Web Care — Independent Technical Partner
Contact: support@northstarwebcare.com | https://northstarwebcare.com
========================================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Northstar-Maintenance-Report-${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateFreshReport = () => {
    const newReport: MaintenanceReport = {
      id: `rep-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-fresh`,
      websiteId: 'site-1',
      generatedAt: new Date().toISOString(),
      period: {
        start: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
      },
      summary: {
        totalChecks: 1440,
        uptimePercentage: 99.88,
        issuesFound: 3,
        issuesFixed: 3,
        tasksCompleted: 4,
      },
      details: selectedReport.details,
      recommendations: [
        'Enforce HTTP strict transport security (HSTS) with max-age 31536000.',
        'Migrate DNS provider to Cloudflare for zero-downtime routing failovers.',
      ],
    };
    setReports([newReport, ...reports]);
    setSelectedReportId(newReport.id);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Maintenance Reports — CloudDesk</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Monthly Maintenance Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Executive transparency summaries generated for startup founders and investors.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateFreshReport}
            className="flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Generate Fresh Report</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleDownloadReport(selectedReport)}
            className="flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Report selector + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar list of reports */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Available Reports
          </h2>
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReportId(report.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedReportId === report.id
                  ? 'bg-navy-800 text-white border-navy-800 shadow-md'
                  : 'bg-white border-gray-200 text-navy-800 hover:border-teal-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono opacity-80">
                  {report.period.start.slice(0, 7)}
                </span>
                <Badge
                  variant={selectedReportId === report.id ? 'teal' : 'neutral'}
                  size="sm"
                >
                  {report.summary.uptimePercentage}% Uptime
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mt-1.5">
                Executive Maintenance Log
              </h3>
              <p
                className={`text-xs mt-1 ${
                  selectedReportId === report.id ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                {report.summary.tasksCompleted} tasks delivered • {report.summary.issuesFixed} fixes
              </p>
            </button>
          ))}
        </div>

        {/* Selected Report Detailed Viewer */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Report Top Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 gap-4">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                Monthly Technical Review
              </span>
              <h2 className="text-xl font-bold text-navy-800 mt-1">
                Website Care Report — {associatedSite.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Audit period: {selectedReport.period.start} to {selectedReport.period.end}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Delivered by</span>
              <span className="text-sm font-semibold text-navy-800">Northstar Web Care</span>
            </div>
          </div>

          {/* Report High-Level KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-xs text-gray-400 uppercase">Availability</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {selectedReport.summary.uptimePercentage}%
              </p>
              <span className="text-[10px] text-gray-400">Zero unplanned outages</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-xs text-gray-400 uppercase">Probes Run</span>
              <p className="text-2xl font-bold text-navy-800 mt-1">
                {selectedReport.summary.totalChecks}
              </p>
              <span className="text-[10px] text-gray-400">Every 5 minutes</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-xs text-gray-400 uppercase">Issues Found</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {selectedReport.summary.issuesFound}
              </p>
              <span className="text-[10px] text-gray-400">Broken links & glitches</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-xs text-gray-400 uppercase">Resolved</span>
              <p className="text-2xl font-bold text-teal-600 mt-1">
                {selectedReport.summary.issuesFixed}
              </p>
              <span className="text-[10px] text-gray-400">100% resolution rate</span>
            </div>
          </div>

          {/* Section: Delivered Technical Work */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
              Completed Technical Work
            </h3>
            <div className="space-y-3">
              {selectedReport.details.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-navy-800">{task.title}</span>
                    <Badge variant="success" size="sm">
                      Completed ({task.actualTime || task.estimatedTime}m)
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{task.description}</p>
                  {task.notes.length > 0 && (
                    <p className="text-[11px] text-gray-400 italic">
                      Verification: {task.notes[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Engineering Recommendations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
              Future Improvement Recommendations
            </h3>
            <ul className="space-y-2">
              {selectedReport.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="text-xs text-navy-800 bg-teal-50/50 border border-teal-100 p-3 rounded-lg flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
