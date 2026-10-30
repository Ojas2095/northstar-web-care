import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Shield,
  Users,
  Building2,
  ClipboardList,
  DollarSign,
  Bell,
  FileText,
  Menu,
  X,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/crm', icon: Users, label: 'Leads' },
  { to: '/crm/clients', icon: Building2, label: 'Clients' },
  { to: '/crm/tasks', icon: ClipboardList, label: 'Tasks' },
  { to: '/crm/revenue', icon: DollarSign, label: 'Revenue' },
  { to: '/crm/follow-ups', icon: Bell, label: 'Follow-ups' },
  { to: '/crm/templates', icon: FileText, label: 'Templates' },
];

export default function CRMLayout() {
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
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-[#16C7B0]" />
            <span className="text-lg font-bold text-white tracking-tight">
              Northstar Ops
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
              end={link.to === '/crm'}
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
          <p className="text-xs text-gray-500">Internal Tools</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4 px-4 sm:px-6 h-14">
            <button
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-[#101B2D]" />
            </button>

            <div className="flex items-center gap-3">
              <h1 className="text-sm font-semibold text-[#101B2D]">
                Northstar Operations
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#101B2D] text-white">
                Internal
              </span>
            </div>
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
