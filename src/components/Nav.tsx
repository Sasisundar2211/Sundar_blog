'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { nav, site } from '@/lib/site';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-wide items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink"
        >
          Sasi Sundar
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`text-[.9rem] transition-colors ${
                isActive(item.href) ? 'text-ink font-medium' : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-[.9rem] text-muted transition-colors hover:text-ink"
          >
            GitHub ↗
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 p-2 text-muted md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <><path d="M5 5l10 10" /><path d="M15 5L5 15" /></> : <><path d="M3 6h14" /><path d="M3 10h14" /><path d="M3 14h14" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule md:hidden">
          <ul className="mx-auto max-w-wide px-5 py-2 sm:px-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-rule/60 py-3 text-[.95rem] ${
                    isActive(item.href) ? 'text-ink font-medium' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.github} target="_blank" rel="noreferrer" className="block py-3 text-[.95rem] text-muted">
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
