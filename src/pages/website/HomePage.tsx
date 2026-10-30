import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Bug,
  Smartphone,
  HeartPulse,
  Mail,
  Plug,
  Rocket,
  Zap,
  FileText,
  ShieldCheck,
  DollarSign,
  CalendarX,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Proactive Maintenance',
    description: 'We catch issues before your users do.',
  },
  {
    icon: DollarSign,
    title: 'Startup-Friendly Pricing',
    description: 'Plans that scale with your growth, starting at $19/mo.',
  },
  {
    icon: CalendarX,
    title: 'No Long-Term Contracts',
    description: 'Cancel anytime. We earn your trust monthly.',
  },
];

const services = [
  { icon: Wrench, title: 'Website Maintenance' },
  { icon: Bug, title: 'Bug Fixes' },
  { icon: Smartphone, title: 'Responsive Design Fixes' },
  { icon: HeartPulse, title: 'Website Health Checks' },
  { icon: Mail, title: 'Contact Form Repairs' },
  { icon: Plug, title: 'API Integrations' },
  { icon: Rocket, title: 'Deployment Assistance' },
  { icon: Zap, title: 'Performance Optimization' },
  { icon: FileText, title: 'Technical Documentation' },
];

const steps = [
  {
    number: '01',
    title: 'Tell Us About Your Website',
    description: 'Share your website URL and the issues you\'re facing.',
  },
  {
    number: '02',
    title: 'We Assess and Plan',
    description: 'We review your site and propose a clear action plan.',
  },
  {
    number: '03',
    title: 'We Maintain, You Grow',
    description: 'Focus on your business while we keep your website healthy.',
  },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Northstar Web Care — Reliable Website Maintenance for Startups</title>
        <meta
          name="description"
          content="Reliable website maintenance and technical support for early-stage startups, without the cost of hiring a full-time developer. Plans starting at $19/mo."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#101B2D] via-[#15243a] to-[#1a2d48] overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Your website deserves more than occasional attention.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Reliable website maintenance and technical support for early-stage
              startups, without the cost of hiring a full-time developer.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#16C7B0] px-6 py-3.5 text-base font-semibold text-[#101B2D] shadow-lg hover:bg-[#13b39e] transition-colors"
              >
                Request a Website Assessment
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3.5 text-base font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#16C7B0]/10 text-[#16C7B0] mb-5">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-[#101B2D]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101B2D]">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to keep your website running smoothly.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-[#16C7B0]/40 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#101B2D]/5 text-[#16C7B0] group-hover:bg-[#16C7B0]/10 transition-colors">
                  <service.icon className="h-5 w-5" />
                </div>
                <span className="text-base font-medium text-[#101B2D]">
                  {service.title}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#16C7B0] font-semibold hover:underline"
            >
              View all service details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101B2D]">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting started is simple — just three steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center md:text-left">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-[#16C7B0]/30" />
                )}
                <span className="inline-block text-5xl font-extrabold text-[#16C7B0]/20 mb-3">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-[#101B2D]">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-[#16C7B0] font-semibold hover:underline"
            >
              Learn more about our process
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#101B2D]">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Plans that grow with your startup. No hidden fees, no long-term contracts.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'Essential Care', price: '$19' },
              { name: 'Growth Care', price: '$49', popular: true },
              { name: 'Technical Partner', price: '$99' },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.popular
                    ? 'border-[#16C7B0] bg-[#16C7B0]/5 shadow-md'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#16C7B0] mb-2">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {plan.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-[#101B2D]">
                  {plan.price}
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-[#101B2D] px-6 py-3 text-base font-semibold text-white hover:bg-[#1a2d48] transition-colors"
            >
              View Full Pricing Details
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#101B2D] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to give your website the care it deserves?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Let's start with a free website assessment. No commitment required.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16C7B0] px-8 py-4 text-lg font-semibold text-[#101B2D] shadow-lg hover:bg-[#13b39e] transition-colors"
            >
              <CheckCircle2 className="h-5 w-5" />
              Request a Website Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
