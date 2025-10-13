import React from 'react';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook } from '@tabler/icons-react';

export default function HealixFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black mb-0 mt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-2 md:col-span-2 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-2">
              {/* Logo gradient matches Navbar/Accents: teal/cyan */}
              <div className="size-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500" />
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Healix</h1>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
              HIPAA-compliant AI chat assistants for instant, reliable, 24/7 patient support.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/features" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Features</a></li>
              <li><a href="/pricing" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Pricing</a></li>
              <li><a href="/api" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">API Access</a></li>
              <li><a href="/integrations" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Integrations</a></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">About Us</a></li>
              <li><a href="/careers" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Careers</a></li>
              <li><a href="/security" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Security & HIPAA</a></li>
              <li><a href="/blog" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/terms" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Terms of Service</a></li>
              <li><a href="/privacy" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Privacy Policy</a></li>
              <li><a href="/contact" className="text-neutral-600 hover:text-cyan-500 dark:text-neutral-400 dark:hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>
          
        </div>

        {/* --- Separator and Copyright Section --- */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-neutral-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} **Healix**. All rights reserved.
          </p>
          
          {/* Social Icons (using Tabler icons) */}
          <div className="flex space-x-4 order-1 md:order-2">
            <a href="#" aria-label="Twitter" className="text-neutral-500 hover:text-cyan-500 transition">
              <IconBrandTwitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/mohammad-shiyabuddeen-4b183724b/" aria-label="LinkedIn" className="text-neutral-500 hover:text-cyan-500 transition">
              <IconBrandLinkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-neutral-500 hover:text-cyan-500 transition">
              <IconBrandFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}