import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Activity,
  BarChart3,
  ShieldCheck,
  Clock,
  Globe,
  AlertTriangle,
  Info,
} from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Health Monitoring',
    description:
      'Track website uptime, response times, and overall health status at a glance.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description:
      'Visualize performance trends over time with interactive charts and dashboards.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & SSL Checks',
    description:
      'Monitor SSL certificate status, security headers, and potential vulnerabilities.',
  },
  {
    icon: Clock,
    title: 'Uptime Tracking',
    description:
      'Historical uptime data with incident logs so you always know your site\'s status.',
  },
  {
    icon: Globe,
    title: 'Multi-Site Management',
    description:
      'Manage and monitor multiple websites from a single, organized dashboard.',
  },
  {
    icon: AlertTriangle,
    title: 'Issue Alerts',
    description:
      'Flagged issues with severity levels so you can prioritize what needs attention.',
  },
];

export default function DemoPage() {
  return (
    <>
      <Helmet>
        <title>Demo — Northstar Web Care</title>
        <meta
          name="description"
          content="Explore CloudDesk, our demonstration website health monitoring dashboard that showcases the type of maintenance and monitoring Northstar Web Care provides."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 mb-6">
            <Info className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300 uppercase tracking-wider">
              Demo Project
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            See Our Work in Action
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            CloudDesk is our flagship demonstration project — a website health
            monitoring dashboard that showcases the type of maintenance and
            monitoring we provide.
          </p>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Demo Notice:</strong> This is a demonstration project built
              to showcase our technical capabilities. All data shown in the
              dashboard is simulated sample data and does not represent real
              websites or metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#101B2D]">
              Dashboard Features
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              The CloudDesk dashboard demonstrates the kind of monitoring and
              reporting tools we use to keep websites healthy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#16C7B0]/10 text-[#16C7B0] mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#101B2D]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to dashboard */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101B2D]">
            Explore the Dashboard
          </h2>
          <p className="mt-4 text-gray-600">
            Take a look at the CloudDesk dashboard to see how we monitor and
            maintain website health. Remember, all data is simulated for
            demonstration purposes.
          </p>
          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16C7B0] px-8 py-4 text-lg font-semibold text-[#101B2D] shadow-lg hover:bg-[#13b39e] transition-colors"
            >
              Launch CloudDesk Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            No sign-up required. All demo data is simulated.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Want this level of care for your website?
          </h2>
          <p className="mt-4 text-gray-300">
            Let us know about your website and we'll show you what we can do.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16C7B0] px-6 py-3.5 text-base font-semibold text-[#101B2D] hover:bg-[#13b39e] transition-colors"
            >
              Request an Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
