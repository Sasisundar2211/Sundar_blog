'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { nav, navCta, site } from '@/lib/site';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-[1.375rem] font-medium tracking-[-0.02em] text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 font-sans md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`text-[.95rem] underline-offset-[6px] transition-colors ${
                isActive(item.href)
                  ? 'text-ink underline decoration-ink decoration-2'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navCta.href}
            aria-current={isActive(navCta.href) ? 'page' : undefined}
            className="text-[.95rem] font-medium text-accent underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-ink"
          >
            {navCta.label}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 grid h-11 w-11 place-items-center text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            {open ? <><path d="M5 5l10 10" /><path d="M15 5L5 15" /></> : <><path d="M3 7h14" /><path d="M3 13h14" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule md:hidden">
          <ul className="mx-auto max-w-wide px-5 pb-4 sm:px-8">
            {[...nav, navCta].map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-3.5 font-serif text-[1.5rem] ${
                    item.href === navCta.href
                      ? 'text-accent'
                      : isActive(item.href) ? 'text-ink italic' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
