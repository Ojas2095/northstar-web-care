import { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/demo', label: 'Demo' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const footerQuickLinks = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const footerServiceLinks = [
  { to: '/services', label: 'Website Monitoring' },
  { to: '/services', label: 'Performance Optimization' },
  { to: '/services', label: 'Broken Link Detection' },
  { to: '/services', label: 'Uptime Monitoring' },
  { to: '/services', label: 'Monthly Reports' },
];

export default function WebsiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-[#16C7B0]' : scrolled ? 'text-[#101B2D] hover:text-[#16C7B0]' : 'text-white/90 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Compass
              className={`w-7 h-7 transition-colors ${
                scrolled ? 'text-[#16C7B0]' : 'text-[#16C7B0]'
              }`}
            />
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? 'text-[#101B2D]' : 'text-white'
              }`}
            >
              Northstar
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to + link.label} to={link.to} className={navLinkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#16C7B0] text-white text-sm font-semibold hover:bg-[#13b09c] transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={`w-6 h-6 ${scrolled ? 'text-[#101B2D]' : 'text-white'}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Compass className="w-6 h-6 text-[#16C7B0]" />
            <span className="text-lg font-bold text-[#101B2D]">Northstar</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[#101B2D]" />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#16C7B0]/10 text-[#16C7B0]'
                    : 'text-[#101B2D] hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#16C7B0] text-white text-sm font-semibold hover:bg-[#13b09c] transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#101B2D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Compass className="w-6 h-6 text-[#16C7B0]" />
                <span className="text-lg font-bold">Northstar</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Professional website care and monitoring services. We keep your
                site fast, secure, and running smoothly so you can focus on your
                business.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {footerQuickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-[#16C7B0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {footerServiceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-[#16C7B0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <a
                    href="mailto:hello@northstarwebcare.com"
                    className="hover:text-[#16C7B0] transition-colors"
                  >
                    hello@northstarwebcare.com
                  </a>
                </li>
                <li>Northstar Web Care</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Northstar Web Care. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
