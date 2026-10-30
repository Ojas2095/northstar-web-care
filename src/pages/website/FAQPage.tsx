import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What types of websites do you support?',
    answer:
      'We support most modern websites — React, Next.js, Vue, WordPress, static sites, and more. If your website is built with standard web technologies, we can likely help. If you\'re unsure, just reach out and we\'ll let you know.',
  },
  {
    question: 'Do I need to share my hosting credentials?',
    answer:
      'In most cases, yes — we\'ll need some level of access to maintain your website effectively. This might include hosting panel access, deployment credentials, or repository access. We treat all credentials with strict confidentiality and recommend using role-based or limited access wherever possible.',
  },
  {
    question: 'What happens if my website goes down?',
    answer:
      'If your website goes down during our monitoring checks, we\'ll notify you and investigate the cause. However, we don\'t provide 24/7 emergency support or guaranteed uptime SLAs — website uptime ultimately depends on your hosting provider. We work during agreed business hours to resolve issues as quickly as possible.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Absolutely. You can switch between plans at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle. There are no penalties for changing plans.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a satisfaction-based approach. If you\'re unhappy with our service in your first month, we\'ll work with you to make it right. If we can\'t resolve your concerns, we\'ll discuss a fair resolution. Since our plans are month-to-month with no contracts, you can simply cancel at any time.',
  },
  {
    question: 'What\'s not included in the maintenance plans?',
    answer:
      'Our maintenance plans don\'t include hosting services, domain registration, major website redesigns or full rebuilds, third-party subscription management, 24/7 emergency support, or guaranteed uptime SLAs. We focus specifically on ongoing maintenance, minor fixes, and technical support within agreed hours.',
  },
  {
    question: 'How do I communicate with you?',
    answer:
      'We primarily communicate through email. Depending on your plan, we may also set up a shared task board or use your preferred project management tool. We aim to keep communication clear, documented, and async-friendly.',
  },
  {
    question: 'What\'s your typical response time?',
    answer:
      'We typically respond to emails within 24-48 hours on business days. Priority email support is available on our Growth Care and Technical Partner plans, which means faster responses during agreed working hours.',
  },
  {
    question: 'Can you work with my existing developer?',
    answer:
      'Yes. We\'re happy to collaborate with your existing developer or development team. We can handle the routine maintenance so they can focus on building new features, or work alongside them on specific technical tasks.',
  },
  {
    question: 'Do you offer one-time fixes?',
    answer:
      'Currently, we focus on ongoing maintenance relationships rather than one-time projects. However, if you have a specific issue, start with our Essential Care plan — there\'s no long-term contract, so you can cancel after the issue is resolved if you choose.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>FAQ — Northstar Web Care</title>
        <meta
          name="description"
          content="Frequently asked questions about Northstar Web Care's website maintenance services, pricing, support, and how we work with startups."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Answers to the most common questions about our services, pricing, and
            how we work.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base font-medium text-[#101B2D] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Still have questions?
          </h2>
          <p className="mt-4 text-gray-300">
            We're happy to answer any other questions you might have. Reach out
            anytime.
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
