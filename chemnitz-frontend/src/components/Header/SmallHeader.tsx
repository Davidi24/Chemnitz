'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaHome, FaInfoCircle, FaLandmark, FaMapMarkedAlt, FaEnvelope } from 'react-icons/fa';

const menuLinks = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/about', label: 'About', icon: <FaInfoCircle /> },
  { href: '/attractions', label: 'Attractions', icon: <FaLandmark /> },
  { href: '/map', label: 'Map', icon: <FaMapMarkedAlt /> },
  { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

export default function SideStickyMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-5 bottom-6 z-[1100] flex flex-col items-center gap-3">
      <div
        className={`
          flex flex-col items-center gap-3 transition-all duration-300
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}
        `}
      >
        {menuLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group"
            onClick={() => setOpen(false)}
          >
            {/* Icon Button */}
            <span
              className={`
                flex items-center justify-center rounded-full
                w-12 h-12 text-2xl bg-white text-[#df6c36]
                shadow-lg border border-[#ececec]
                hover:bg-[#df6c36] hover:text-white transition
                cursor-pointer
              `}
              style={{
                transition: 'background 0.18s, color 0.18s'
              }}
            >
              {link.icon}
            </span>
            {/* Tooltip */}
            <span
              className="
                absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-white text-sm rounded-xl opacity-0 group-hover:opacity-100
                transition-all duration-200 pointer-events-none
                shadow-md ml-1 z-20
              "
              style={{
                whiteSpace: 'nowrap'
              }}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-center w-14 h-14 bg-[#df6c36] hover:bg-[#c1572b] text-white text-2xl rounded-full shadow-xl border-0 outline-none transition"
        aria-label="Open menu"
        tabIndex={0}
        style={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.13)' }}
      >
        <FaBars />
      </button>
    </div>
  );
}
