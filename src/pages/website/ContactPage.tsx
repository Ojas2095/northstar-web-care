import { useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  websiteUrl: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  websiteUrl?: string;
  message?: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  websiteUrl: '',
  message: '',
  honeypot: '',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url: string): boolean {
  if (!url) return true;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return !!parsed.hostname && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!validateEmail(form.email)) errors.email = 'Please enter a valid email address.';
  if (form.websiteUrl && !validateUrl(form.websiteUrl))
    errors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com).';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 20)
    errors.message = 'Please provide at least 20 characters so we can understand your needs.';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (form.honeypot) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmittedData({ ...form });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Northstar Web Care</title>
        <meta
          name="description"
          content="Get in touch with Northstar Web Care. Request a free website assessment or tell us about your maintenance needs."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Tell us about your website and we'll get back to you with a clear plan.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form Column */}
            <div className="lg:col-span-3">
              {submitted && submittedData ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  {/* Demo Mode Notice */}
                  <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4 mb-6">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>📧 Demo Mode:</strong> This form is not connected to
                      an email service yet. In production, your message would be
                      delivered to our team. No message has been sent.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="h-6 w-6 text-[#16C7B0]" />
                    <h2 className="text-xl font-semibold text-[#101B2D]">
                      Form Submitted Successfully
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm">
                    <h3 className="font-medium text-[#101B2D]">
                      Submitted Data Summary:
                    </h3>
                    <div className="rounded-lg bg-[#F5F7FA] p-4 space-y-2">
                      <p>
                        <span className="font-medium text-gray-700">Name:</span>{' '}
                        {submittedData.name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Email:</span>{' '}
                        {submittedData.email}
                      </p>
                      {submittedData.company && (
                        <p>
                          <span className="font-medium text-gray-700">Company:</span>{' '}
                          {submittedData.company}
                        </p>
                      )}
                      {submittedData.websiteUrl && (
                        <p>
                          <span className="font-medium text-gray-700">Website:</span>{' '}
                          {submittedData.websiteUrl}
                        </p>
                      )}
                      <p>
                        <span className="font-medium text-gray-700">Message:</span>{' '}
                        {submittedData.message}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-6 text-sm font-medium text-[#16C7B0] hover:underline"
                  >
                    ← Submit another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6"
                >
                  {/* Honeypot — hidden from real users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this empty</label>
                    <input
                      id="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => handleChange('honeypot', e.target.value)}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#101B2D] mb-1.5"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#101B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/50 focus:border-[#16C7B0] transition-colors ${
                        errors.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#101B2D] mb-1.5"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#101B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/50 focus:border-[#16C7B0] transition-colors ${
                        errors.email ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-[#101B2D] mb-1.5"
                    >
                      Company Name{' '}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-[#101B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/50 focus:border-[#16C7B0] transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className="block text-sm font-medium text-[#101B2D] mb-1.5"
                    >
                      Website URL{' '}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      value={form.websiteUrl}
                      onChange={(e) => handleChange('websiteUrl', e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#101B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/50 focus:border-[#16C7B0] transition-colors ${
                        errors.websiteUrl ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.websiteUrl && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.websiteUrl}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#101B2D] mb-1.5"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#101B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/50 focus:border-[#16C7B0] transition-colors resize-y ${
                        errors.message ? 'border-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your website and what you need help with..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                      Minimum 20 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#16C7B0] px-6 py-3 text-base font-semibold text-[#101B2D] hover:bg-[#13b39e] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-8">
                <h2 className="text-lg font-semibold text-[#101B2D]">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-500 italic">
                  Contact details are placeholders and will be configured before
                  launch.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#16C7B0]/10 text-[#16C7B0]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101B2D]">Email</p>
                      <p className="text-sm text-gray-500">
                        📧 [email to be configured]
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#16C7B0]/10 text-[#16C7B0]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101B2D]">Location</p>
                      <p className="text-sm text-gray-500">
                        📍 [to be configured]
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#16C7B0]/10 text-[#16C7B0]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101B2D]">
                        Response Time
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏰ Within 24–48 hours on business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
