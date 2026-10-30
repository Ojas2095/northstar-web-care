import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Globe,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Activity,
  ArrowUpRight,
  RefreshCw,
  Search,
  ExternalLink,
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
import { DEMO_WEBSITES, DEMO_BROKEN_LINKS, DEMO_TASKS } from '../../data/demoData';
import StatsCard from '../../components/ui/StatsCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function DashboardOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [websites, setWebsites] = useState(DEMO_WEBSITES);

  // Compute aggregate metrics
  const totalSites = websites.length;
  const avgUptime = (
    websites.reduce((acc, site) => acc + site.uptimePercentage, 0) / totalSites
  ).toFixed(2);
  const avgResponse = Math.round(
    websites.reduce((acc, site) => acc + (site.responseTime || 0), 0) / totalSites
  );
  const unfixedBrokenLinks = DEMO_BROKEN_LINKS.filter((bl) => !bl.fixed).length;
  const pendingTasks = DEMO_TASKS.filter((t) => t.status !== 'completed').length;

  // Chart data from demo history
  const chartData = websites[0].history.map((record, index) => {
    const dayAvg = Math.round(
      websites.reduce((sum, w) => sum + (w.history[index]?.responseTime || 200), 0) /
        totalSites
    );
    return {
      date: record.timestamp.slice(5),
      responseTime: dayAvg,
      uptime: 99.8,
    };
  });

  const handleRefreshAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWebsites((prev) =>
        prev.map((s) => ({
          ...s,
          lastChecked: new Date().toISOString(),
          responseTime: Math.floor(140 + Math.random() * 80),
        }))
      );
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>CloudDesk Overview — Northstar Web Care</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
              Website Health Monitor
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              Live Demo
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Real-time synthetic performance telemetry, uptime logging, and maintenance backlog.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Checking...' : 'Run All Checks'}</span>
          </Button>
          <Link to="/contact">
            <Button size="sm" variant="primary">
              Request Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Monitored Properties"
          value={totalSites}
          icon={Globe}
          change={{ value: '100% active', positive: true }}
        />
        <StatsCard
          title="30-Day Average Uptime"
          value={`${avgUptime}%`}
          icon={CheckCircle}
          change={{ value: '+0.05% vs last month', positive: true }}
        />
        <StatsCard
          title="Average Latency"
          value={`${avgResponse} ms`}
          icon={Clock}
          change={{ value: '-12ms improvement', positive: true }}
        />
        <StatsCard
          title="Broken Links Detected"
          value={unfixedBrokenLinks}
          icon={AlertTriangle}
          change={{ value: `${unfixedBrokenLinks} pending fix`, positive: unfixedBrokenLinks === 0 }}
        />
      </div>

      {/* Main Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latency History Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-navy-800">
                Network Latency & Response Times (30-Day Trend)
              </h2>
              <p className="text-xs text-gray-500">
                Synthetic HTTP GET checks logged across edge regions every 5 minutes.
              </p>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Lab Telemetry
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16C7B0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16C7B0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} unit="ms" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101B2D',
                    borderRadius: '8px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#16C7B0' }}
                />
                <Area
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#16C7B0"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#latencyGradient)"
                  name="Response (ms)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Maintenance Backlog */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-navy-800">
                Active Maintenance Tasks
              </h2>
              <Link
                to="/dashboard/tasks"
                className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                View all ({pendingTasks})
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Real-world tasks handled by Northstar Web Care engineers.
            </p>

            <div className="space-y-3">
              {DEMO_TASKS.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-gray-100 bg-gray-50/70 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-navy-800 line-clamp-1">
                      {task.title}
                    </p>
                    <Badge
                      variant={
                        task.priority === 'critical'
                          ? 'error'
                          : task.priority === 'high'
                          ? 'warning'
                          : 'teal'
                      }
                      size="sm"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500">
                    <span className="capitalize">{task.status.replace('-', ' ')}</span>
                    <span>Est: {task.estimatedTime}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Monthly support allotment</span>
            <span className="text-xs font-semibold text-navy-800">3.5 / 5.0 hrs used</span>
          </div>
        </div>
      </div>

      {/* Monitored Properties Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-navy-800">
              Monitored Properties Overview
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Simulated demonstration properties with continuous availability polling.
            </p>
          </div>
          <Link
            to="/dashboard/monitoring"
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            Detailed Checks <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-xs text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-5 py-3">Property Name</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">HTTP Code</th>
                <th className="px-5 py-3">Response Time</th>
                <th className="px-5 py-3">30-Day Uptime</th>
                <th className="px-5 py-3">Last Polled</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {websites.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium text-navy-800 text-xs sm:text-sm">{site.name}</p>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-gray-400 hover:text-teal-600 flex items-center gap-1 mt-0.5"
                      >
                        {site.url}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={
                        site.status === 'up'
                          ? 'success'
                          : site.status === 'degraded'
                          ? 'warning'
                          : 'error'
                      }
                      dot
                      size="sm"
                    >
                      {site.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-700">
                    {site.httpStatus} OK
                  </td>
                  <td className="px-5 py-3.5 text-xs text-navy-800 font-medium">
                    {site.responseTime} ms
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-emerald-600">
                    {site.uptimePercentage}%
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {site.lastChecked ? new Date(site.lastChecked).toLocaleTimeString() : 'N/A'}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link to="/dashboard/monitoring">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Inspect
                      </Button>
                    </Link>
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
