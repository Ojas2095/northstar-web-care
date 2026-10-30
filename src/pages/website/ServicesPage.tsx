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
  XCircle,
  ArrowRight,
} from 'lucide-react';

interface Service {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Wrench,
    title: 'Website Maintenance',
    description:
      'Regular updates, security patches, and ongoing upkeep to keep your website running at its best. We handle the routine work so you can focus on your business.',
  },
  {
    icon: Bug,
    title: 'Bug Fixes',
    description:
      'Something broken on your site? We diagnose and fix bugs — from JavaScript errors to layout glitches — quickly and thoroughly with clear documentation.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design Fixes',
    description:
      'Ensure your website looks great on every device. We fix layout issues on mobile, tablet, and desktop so your visitors have a consistent experience.',
  },
  {
    icon: HeartPulse,
    title: 'Website Health Checks',
    description:
      "Comprehensive reviews of your website's performance, security, and SEO fundamentals. We identify issues before they become problems and provide actionable reports.",
  },
  {
    icon: Mail,
    title: 'Contact Form Repairs',
    description:
      'Forms are how your customers reach you. We fix broken submissions, email delivery issues, validation problems, and spam filtering so you never miss a lead.',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    description:
      'Connect your website to the tools you use. We set up and maintain integrations with payment systems, CRMs, email services, and other third-party APIs.',
  },
  {
    icon: Rocket,
    title: 'Deployment Assistance',
    description:
      'Smooth deployments without the stress. We help you push updates to production safely, set up CI/CD pipelines, and manage staging environments.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Speed matters. We optimize load times, reduce bundle sizes, compress images, and implement caching strategies to make your site faster for every visitor.',
  },
  {
    icon: FileText,
    title: 'Technical Documentation',
    description:
      "Clear documentation for your website's architecture, deployment process, and maintenance procedures. Essential for onboarding new team members or developers.",
  },
];

const exclusions = [
  'Hosting services — We work with your existing hosting provider.',
  'Domain registration — We can assist, but registration is managed by you.',
  'Major website redesigns — We focus on maintenance, not full rebuilds.',
  'Third-party subscription management — We integrate with, but don\'t manage, your SaaS tools.',
  '24/7 emergency support — We work during agreed business hours.',
  'Guaranteed uptime SLAs — Uptime depends on your hosting provider.',
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services — Northstar Web Care</title>
        <meta
          name="description"
          content="Website maintenance, bug fixes, performance optimization, and more. Explore the full range of services Northstar Web Care offers to keep your website healthy."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            From routine maintenance to performance optimization, we provide the
            technical care your website needs to stay healthy and grow with your
            business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#16C7B0]/30 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#101B2D]/5 text-[#16C7B0] mb-5">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-[#101B2D]">
                  {service.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-[#16C7B0] hover:underline"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Limitations */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101B2D] text-center">
            What's Not Included
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            We believe in being upfront. Here's what falls outside the scope of our
            maintenance plans.
          </p>
          <ul className="mt-10 space-y-4">
            {exclusions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Not sure which services you need?
          </h2>
          <p className="mt-4 text-gray-300">
            Request a free website assessment and we'll help you figure out the right
            plan.
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
