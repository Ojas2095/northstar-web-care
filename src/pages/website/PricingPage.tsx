import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, XCircle } from 'lucide-react';

interface Tier {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: 'Essential Care',
    price: '$19',
    description: 'Basic maintenance for simple websites that need regular check-ups.',
    features: [
      'Monthly website health check',
      'Broken link checks',
      'Basic uptime monitoring',
      '30 minutes of minor content updates',
      'Monthly maintenance report',
    ],
  },
  {
    name: 'Growth Care',
    price: '$49',
    description:
      'For growing startups that need more hands-on technical support.',
    popular: true,
    features: [
      'Everything in Essential Care',
      'Two hours of minor technical changes',
      'Form and integration checks',
      'Basic performance checks',
      'Backup verification',
      'Priority email support during agreed hours',
    ],
  },
  {
    name: 'Technical Partner',
    price: '$99',
    description:
      'Comprehensive care for startups that rely heavily on their website.',
    features: [
      'Everything in Growth Care',
      'Five hours of minor technical work',
      'Weekly health checks',
      'Deployment assistance',
      'Technical documentation',
      'Monthly improvement recommendations',
    ],
  },
];

const exclusions = [
  'Major website redesigns or full rebuilds',
  'Hosting or domain registration',
  '24/7 emergency support',
  'Guaranteed uptime SLAs',
  'Third-party subscription management',
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No. There are no setup fees or hidden charges. You only pay the monthly subscription price.',
  },
  {
    question: 'What counts as "minor technical changes"?',
    answer:
      'Minor changes include things like updating text or images, adjusting styles, fixing small bugs, updating dependencies, and similar tasks that don\'t require significant architectural changes.',
  },
  {
    question: 'What if I need more hours than my plan includes?',
    answer:
      'Additional hours beyond your plan\'s allocation can be arranged on a case-by-case basis. We\'ll always let you know before any extra work is done.',
  },
  {
    question: 'Do you offer annual billing?',
    answer:
      'Currently we offer monthly billing only. This keeps things flexible — no long-term commitment required.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Pricing — Northstar Web Care</title>
        <meta
          name="description"
          content="Simple, transparent pricing for website maintenance. Plans starting at $19/mo with no long-term contracts. Choose Essential, Growth, or Technical Partner."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Pick the plan that fits your needs. No hidden fees, no surprises, no
            long-term contracts.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl border p-8 flex flex-col ${
                  tier.popular
                    ? 'border-[#16C7B0] shadow-xl ring-2 ring-[#16C7B0]/20'
                    : 'border-gray-200 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-[#16C7B0] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#101B2D]">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-[#101B2D] uppercase tracking-wider">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-extrabold text-[#101B2D]">
                      {tier.price}
                    </span>
                    <span className="text-lg text-gray-500 font-medium">/month</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#16C7B0] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    className={`block w-full text-center rounded-lg px-6 py-3 text-base font-semibold transition-colors ${
                      tier.popular
                        ? 'bg-[#16C7B0] text-[#101B2D] hover:bg-[#13b39e]'
                        : 'bg-[#101B2D] text-white hover:bg-[#1a2d48]'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Limitations */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#101B2D] text-center">
            What's Not Included
          </h2>
          <p className="mt-3 text-gray-600 text-center text-sm">
            To keep our pricing transparent, here's what falls outside our
            maintenance plans.
          </p>
          <ul className="mt-8 space-y-3">
            {exclusions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F7FA] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#101B2D] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base font-medium text-[#101B2D]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Need something custom?
          </h2>
          <p className="mt-4 text-gray-300">
            If none of our plans fit your needs exactly, reach out and we'll work
            something out together.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16C7B0] px-6 py-3.5 text-base font-semibold text-[#101B2D] hover:bg-[#13b39e] transition-colors"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
