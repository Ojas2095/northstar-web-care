import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Search,
  ListChecks,
  Repeat,
  ArrowRight,
} from 'lucide-react';

interface Step {
  number: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: ClipboardList,
    title: 'Request an Assessment',
    description:
      'Submit your website URL through our contact form. Tell us about any specific issues or concerns you\'re experiencing. There\'s no cost or commitment for the initial assessment.',
  },
  {
    number: 2,
    icon: Search,
    title: 'Website Review',
    description:
      'We\'ll review your website\'s health, performance, and any existing issues. We\'ll send you a clear summary of what we find, including actionable recommendations — whether or not you decide to work with us.',
  },
  {
    number: 3,
    icon: ListChecks,
    title: 'Choose Your Plan',
    description:
      'Based on your needs, select the maintenance plan that works best. No long-term commitment required — you can change or cancel your plan at any time.',
  },
  {
    number: 4,
    icon: Repeat,
    title: 'Ongoing Maintenance',
    description:
      'We proactively maintain your website, fix issues, and send you regular reports. You focus on growing your business while we keep your website healthy and performing well.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>How It Works — Northstar Web Care</title>
        <meta
          name="description"
          content="Getting started with Northstar Web Care is simple. Request an assessment, choose a plan, and let us maintain your website while you grow your business."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">How It Works</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Getting started is simple. Four straightforward steps to reliable
            website maintenance.
          </p>
        </div>
      </section>

      {/* Timeline / Stepper */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-[#16C7B0]/20 hidden sm:block" />

            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, i) => (
                <div key={step.number} className="relative flex gap-6 sm:gap-8">
                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#16C7B0] text-[#101B2D] font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 flex-1 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="h-5 w-5 text-[#16C7B0]" />
                      <h3 className="text-xl font-semibold text-[#101B2D]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-gray-300">
            It all begins with a free website assessment. No commitment, no
            pressure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16C7B0] px-6 py-3.5 text-base font-semibold text-[#101B2D] hover:bg-[#13b39e] transition-colors"
            >
              Request an Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3.5 text-base font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
