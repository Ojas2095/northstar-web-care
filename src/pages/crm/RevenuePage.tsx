import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Plus,
  Calendar,
  Building,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DEMO_REVENUE, DEMO_CLIENTS } from '../../data/demoData';
import { RevenueEntry } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const COLORS = ['#16C7B0', '#101B2D', '#6366F1', '#F59E0B'];

export default function RevenuePage() {
  const [revenueEntries, setRevenueEntries] = useLocalStorage<RevenueEntry[]>(
    'northstar-revenue-entries',
    DEMO_REVENUE
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(49);
  const [type, setType] = useState<'recurring' | 'one-time'>('recurring');
  const [description, setDescription] = useState('');

  // Calculations
  const totalRevenue = revenueEntries.reduce((sum, r) => sum + r.amount, 0);
  const recurringRevenue = revenueEntries
    .filter((r) => r.type === 'recurring')
    .reduce((sum, r) => sum + r.amount, 0);
  const oneTimeRevenue = revenueEntries
    .filter((r) => r.type === 'one-time')
    .reduce((sum, r) => sum + r.amount, 0);
  const outstandingCount = revenueEntries.filter((r) => r.status === 'pending').length;

  // Monthly trends for BarChart
  const monthlyData = [
    { month: 'Jun', recurring: 19, oneTime: 0 },
    { month: 'Jul', recurring: 49, oneTime: 35 },
    { month: 'Aug', recurring: 68, oneTime: 0 },
    { month: 'Sep', recurring: 98, oneTime: 49 },
    { month: 'Oct (Current)', recurring: 167, oneTime: 39 },
  ];

  // Package Distribution for PieChart
  const packageDistribution = [
    { name: 'Growth Care ($49)', value: 2 },
    { name: 'Technical Partner ($99)', value: 1 },
    { name: 'Essential ($19)', value: 1 },
    { name: 'One-Time Pilots ($39)', value: 1 },
  ];

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: RevenueEntry = {
      id: `rev-${Date.now()}`,
      clientId: 'custom',
      amount: Number(amount),
      type,
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
    };
    setRevenueEntries([entry, ...revenueEntries]);
    setIsModalOpen(false);
    setDescription('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Revenue & Financial Telemetry — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
              Revenue & Cashflow Telemetry
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              Demo Simulation
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Tracking toward initial milestone: ₹5,000–₹10,000 / month (~$60–$120 USD).
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Record Invoice / Payment</span>
        </Button>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Monthly Run-Rate (MRR)</span>
          <p className="text-2xl font-bold text-teal-600 mt-1">${recurringRevenue} USD</p>
          <span className="text-[11px] text-emerald-600 font-medium">
            Goal: ₹5k–₹10k reached! (~₹14,000 INR)
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">One-Time Project Revenue</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">${oneTimeRevenue} USD</p>
          <span className="text-[11px] text-gray-400">Paid audits & bug fix sprints</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Total Billed YTD</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">${totalRevenue} USD</p>
          <span className="text-[11px] text-gray-400">Processed via Stripe / Wise</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Outstanding Invoices</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{outstandingCount}</p>
          <span className="text-[11px] text-gray-400">Awaiting customer clearance</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-navy-800">
                Monthly Revenue Growth Trend
              </h2>
              <p className="text-xs text-gray-500">
                Breakdown between recurring subscription retainers and one-off pilot fixes.
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} unit="$" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101B2D',
                    borderRadius: '8px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="recurring" name="Monthly Recurring ($)" fill="#16C7B0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="oneTime" name="One-Off Pilots ($)" fill="#101B2D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-navy-800">
              Revenue by Service Tier
            </h2>
            <p className="text-xs text-gray-500 mb-2">
              Share of client subscriptions across plans.
            </p>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#101B2D',
                    borderRadius: '8px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
            {packageDistribution.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-navy-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy-800">Transaction & Invoice Log</h2>
          <span className="text-xs text-gray-400">All amounts in USD</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {revenueEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-navy-800 text-xs">
                    {entry.description}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="capitalize text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{entry.date}</td>
                  <td className="px-5 py-3.5 font-bold text-navy-800 text-xs font-mono">
                    ${entry.amount}.00
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Badge variant={entry.status === 'paid' ? 'success' : 'warning'} size="sm">
                      {entry.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Revenue Entry */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Revenue">
        <form onSubmit={handleAddEntry} className="space-y-4">
          <Input
            label="Description"
            required
            placeholder="e.g. November Retainer — VeloMetrics"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount ($)"
              type="number"
              min={1}
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="recurring">Recurring Retainer</option>
                <option value="one-time">One-Time Pilot</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
