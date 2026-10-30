import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Gauge,
  Zap,
  ShieldCheck,
  Search,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Info,
} from 'lucide-react';
import { DEMO_WEBSITES, DEMO_PERFORMANCE } from '../../data/demoData';
import Button from '../../components/ui/Button';

export default function PerformancePage() {
  const [selectedSiteId, setSelectedSiteId] = useState<string>('site-1');
  const [isAuditing, setIsAuditing] = useState(false);

  const selectedSite = DEMO_WEBSITES.find((s) => s.id === selectedSiteId) || DEMO_WEBSITES[0];
  const metrics =
    DEMO_PERFORMANCE.find((p) => p.websiteId === selectedSiteId) || DEMO_PERFORMANCE[0];

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 1200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-red-500 stroke-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Performance & Core Web Vitals — CloudDesk</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Performance & Core Web Vitals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Synthetic Google Lighthouse lab telemetry and performance auditing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedSiteId}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white font-medium text-navy-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {DEMO_WEBSITES.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="flex items-center gap-1.5"
          >
            <Zap className={`w-4 h-4 ${isAuditing ? 'animate-bounce' : ''}`} />
            <span>{isAuditing ? 'Testing...' : 'Audit Page'}</span>
          </Button>
        </div>
      </div>

      {/* Lab Data vs Real World Clarification Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-blue-950">
            Methodology: Synthetic Lab Data vs Real User Monitoring (RUM)
          </p>
          <p>
            The scores below are generated in a standardized headless browser sandbox (simulated 4G
            throttling, desktop/mobile presets). Real-world Chrome User Experience Report (CrUX)
            metrics may vary depending on visitors&apos; devices, geographic CDN proximity, and network quality.
          </p>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Performance', score: metrics.performanceScore, desc: 'Load speed & rendering' },
          { label: 'Accessibility', score: metrics.accessibilityScore, desc: 'WCAG contrast & tags' },
          { label: 'Best Practices', score: metrics.bestPracticesScore, desc: 'Modern web standards' },
          { label: 'SEO Audit', score: metrics.seoScore, desc: 'Crawling & crawlability' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center"
          >
            <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getScoreColor(item.score)}
                  strokeDasharray={`${item.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xl font-bold text-navy-800">{item.score}</span>
            </div>
            <h3 className="text-sm font-semibold text-navy-800">{item.label}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Core Web Vitals Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-navy-800">
              Core Web Vitals Thresholds ({selectedSite.name})
            </h2>
            <p className="text-xs text-gray-500">
              Key indicators tracked by Google search indexing algorithms.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Passed Google Standards
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">First Contentful Paint</span>
              <span className="text-xs font-bold text-emerald-600">Good</span>
            </div>
            <p className="text-2xl font-bold text-navy-800 font-mono">
              {metrics.firstContentfulPaint}s
            </p>
            <p className="text-[11px] text-gray-400">Target: &lt; 1.8s</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Largest Contentful Paint</span>
              <span
                className={`text-xs font-bold ${
                  metrics.largestContentfulPaint <= 2.5 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {metrics.largestContentfulPaint <= 2.5 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            <p className="text-2xl font-bold text-navy-800 font-mono">
              {metrics.largestContentfulPaint}s
            </p>
            <p className="text-[11px] text-gray-400">Target: &lt; 2.5s</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Total Blocking Time</span>
              <span
                className={`text-xs font-bold ${
                  metrics.totalBlockingTime <= 200 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {metrics.totalBlockingTime <= 200 ? 'Good' : 'Moderate'}
              </span>
            </div>
            <p className="text-2xl font-bold text-navy-800 font-mono">
              {metrics.totalBlockingTime}ms
            </p>
            <p className="text-[11px] text-gray-400">Target: &lt; 200ms</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Cumulative Layout Shift</span>
              <span
                className={`text-xs font-bold ${
                  metrics.cumulativeLayoutShift <= 0.1 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {metrics.cumulativeLayoutShift <= 0.1 ? 'Good' : 'Needs Review'}
              </span>
            </div>
            <p className="text-2xl font-bold text-navy-800 font-mono">
              {metrics.cumulativeLayoutShift}
            </p>
            <p className="text-[11px] text-gray-400">Target: &lt; 0.1</p>
          </div>
        </div>
      </div>

      {/* Actionable Engineering Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-navy-800">
          Prioritized Optimization Opportunities
        </h2>
        <p className="text-xs text-gray-500 -mt-2">
          Remediation tasks Northstar Web Care executes to boost customer conversion and SEO rankings.
        </p>

        <div className="divide-y divide-gray-100">
          {[
            {
              title: 'Serve images in modern next-gen formats (AVIF / WebP)',
              saving: 'Est. ~420 KB savings (~0.5s off LCP)',
              impact: 'High Impact',
              badge: 'bg-red-50 text-red-700 border-red-200',
            },
            {
              title: 'Eliminate render-blocking JavaScript bundles',
              saving: 'Est. ~140ms off Total Blocking Time',
              impact: 'Medium Impact',
              badge: 'bg-amber-50 text-amber-700 border-amber-200',
            },
            {
              title: 'Properly specify explicit dimensions on hero img and SVG tags',
              saving: 'Reduces CLS from 0.08 to < 0.01',
              impact: 'Medium Impact',
              badge: 'bg-amber-50 text-amber-700 border-amber-200',
            },
            {
              title: 'Configure HTTP/2 Server Push & aggressive static asset cache headers',
              saving: 'Improves repeat visitor load times by 65%',
              impact: 'Low Effort / High Return',
              badge: 'bg-teal-50 text-teal-700 border-teal-200',
            },
          ].map((rec) => (
            <div key={rec.title} className="py-3.5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-navy-800">{rec.title}</p>
                <p className="text-xs text-gray-400">{rec.saving}</p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${rec.badge}`}
              >
                {rec.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
