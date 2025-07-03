'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-[#181818] pt-10 pb-6 px-6 shadow-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 items-start md:items-center">
        {/* Logo and Brand */}
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-2xl tracking-tight" style={{ color: '#df6c36' }}>
            Chemnitz
          </span>
          <span className="ml-2 text-2xl tracking-tight">
            Explorer
          </span>
          <p className="text-sm text-[#555] mt-2 max-w-xs">
            Discover the best of Chemnitz – culture, sights, events & more.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-base font-medium">
          <div className="space-y-1 text-sm font-medium">
            <div>
              <span className="font-bold" style={{ color: '#df6c36' }}>Email:</span>{' '}
              <a href="mailto:info@chemnitz-explorer.com" className="hover:underline hover:text-[#df6c36] transition">info@chemnitz-explorer.com</a>
            </div>
            <div>
              <span className="font-bold" style={{ color: '#df6c36' }}>Phone:</span>{' '}
              <a href="tel:+49123456789" className="hover:underline hover:text-[#df6c36] transition">+49 123 456 789</a>
            </div>
            <div>
              <span className="font-bold" style={{ color: '#df6c36' }}>Address:</span>{' '}
              <span>Brückenstraße 17, 09111 Chemnitz</span>
            </div>
          </div>

        </nav>

        {/* Social */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <SocialLink href="#" icon={<FaGithub />} />
          <SocialLink href="#" icon={<FaLinkedin />} />
          <SocialLink href="#" icon={<FaInstagram />} />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#ececec] my-6"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-[#888] gap-2">
        <span>
          &copy; {new Date().getFullYear()} Chemnitz Explorer. All rights reserved.
        </span>
        <span>
          Built with <span className="font-bold" style={{ color: '#df6c36' }}>Next.js</span> & TailwindCSS
        </span>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative group transition text-[#181818]"
    >
      <span>{label}</span>
      <span
        className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#df6c36] transition-all group-hover:w-full"
      ></span>
    </Link>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#181818] hover:text-[#df6c36] transition text-xl"
      aria-label="Social link"
    >
      {icon}
    </a>
  );
}
