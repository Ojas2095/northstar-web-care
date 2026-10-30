import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Website pages
import WebsiteLayout from './layouts/WebsiteLayout'
import HomePage from './pages/website/HomePage'

// Lazy-loaded website pages
const ServicesPage = lazy(() => import('./pages/website/ServicesPage'))
const PricingPage = lazy(() => import('./pages/website/PricingPage'))
const HowItWorksPage = lazy(() => import('./pages/website/HowItWorksPage'))
const DemoPage = lazy(() => import('./pages/website/DemoPage'))
const FAQPage = lazy(() => import('./pages/website/FAQPage'))
const ContactPage = lazy(() => import('./pages/website/ContactPage'))
const PrivacyPage = lazy(() => import('./pages/website/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/website/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/website/NotFoundPage'))

// Dashboard pages
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const DashboardOverview = lazy(() => import('./pages/dashboard/OverviewPage'))
const MonitoringPage = lazy(() => import('./pages/dashboard/MonitoringPage'))
const BrokenLinksPage = lazy(() => import('./pages/dashboard/BrokenLinksPage'))
const PerformancePage = lazy(() => import('./pages/dashboard/PerformancePage'))
const TasksPage = lazy(() => import('./pages/dashboard/TasksPage'))
const ReportsPage = lazy(() => import('./pages/dashboard/ReportsPage'))

// CRM pages
const CRMLayout = lazy(() => import('./layouts/CRMLayout'))
const LeadsPage = lazy(() => import('./pages/crm/LeadsPage'))
const ClientsPage = lazy(() => import('./pages/crm/ClientsPage'))
const CRMTasksPage = lazy(() => import('./pages/crm/CRMTasksPage'))
const RevenuePage = lazy(() => import('./pages/crm/RevenuePage'))
const FollowUpsPage = lazy(() => import('./pages/crm/FollowUpsPage'))
const TemplatesPage = lazy(() => import('./pages/crm/TemplatesPage'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-navy-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Business Website */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>

        {/* CloudDesk Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="broken-links" element={<BrokenLinksPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Internal CRM */}
        <Route path="/crm" element={<CRMLayout />}>
          <Route index element={<LeadsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="tasks" element={<CRMTasksPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="follow-ups" element={<FollowUpsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
