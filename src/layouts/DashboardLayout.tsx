import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  Monitor,
  Link as LinkIcon,
  Gauge,
  CheckSquare,
  FileText,
  Menu,
  X,
  FlaskConical,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/monitoring', icon: Monitor, label: 'Monitoring' },
  { to: '/dashboard/broken-links', icon: LinkIcon, label: 'Broken Links' },
  { to: '/dashboard/performance', icon: Gauge, label: 'Performance' },
  { to: '/dashboard/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/dashboard/reports', icon: FileText, label: 'Reports' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F5F7FA]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-[#0c1524] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#16C7B0]" />
            <span className="text-lg font-bold text-white tracking-tight">
              CloudDesk
            </span>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-md hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#16C7B0]/15 text-[#16C7B0]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`
              }
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-white/10 shrink-0">
          <p className="text-xs text-gray-500">Northstar Web Care</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shrink-0">
          {/* Demo banner */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
            <p className="text-xs sm:text-sm font-medium text-amber-800 flex items-center justify-center gap-2">
              <FlaskConical className="w-4 h-4 shrink-0" />
              <span>
                <span className="font-bold">DEMO MODE</span> — This dashboard
                uses simulated sample data for demonstration purposes
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4 px-4 sm:px-6 h-14">
            <button
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-[#101B2D]" />
            </button>
            <h1 className="text-sm font-semibold text-[#101B2D]">
              Dashboard
            </h1>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
