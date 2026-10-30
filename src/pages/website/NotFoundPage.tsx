import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Northstar Web Care</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>

      <section className="bg-[#F5F7FA] min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[8rem] sm:text-[10rem] font-extrabold leading-none text-[#16C7B0]/20 select-none">
            404
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#101B2D]">
            Page Not Found
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#101B2D] px-6 py-3 text-base font-semibold text-white hover:bg-[#1a2d48] transition-colors"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
