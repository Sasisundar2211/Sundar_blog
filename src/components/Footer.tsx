import Link from 'next/link';
import { site } from '@/lib/site';
import { ExternalIcon } from './Icons';

const pages = [
  ['/projects', 'Projects'],
  ['/writing', 'Writing'],
  ['/notes', 'Notes'],
  ['/about', 'About'],
  ['/now', 'Now'],
  ['/uses', 'Uses'],
  ['/work', 'Work with me'],
  ['/contact', 'Contact'],
] as const;

const elsewhere = [
  [site.github, 'GitHub'],
  [site.linkedin, 'LinkedIn'],
  [site.x, 'X'],
] as const;

/** The colophon. Printed in reverse: ink ground, paper type. */
export function Footer() {
  return (
    <footer className="mt-12 bg-ink text-paper">
      <div className="mx-auto max-w-wide px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <p className="font-sans text-sm leading-relaxed text-paper/65">
            I reply to every email about a role or a project.
          </p>
          <div className="min-w-0">
            <h2 className="max-w-[18ch] font-serif text-[clamp(2rem,4.6vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.025em]">
              Hiring for 2027, or need software <em>built?</em>
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block break-all font-serif text-[clamp(1.25rem,2.6vw,2rem)] italic text-paper underline decoration-accent decoration-2 underline-offset-[8px] transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-paper/25 pt-8 font-sans text-sm lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <p className="leading-relaxed text-paper/65">
            Every claim here links to the code.
            <span className="mt-2 block">{site.thesis}</span>
          </p>
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
                {pages.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-paper/80 transition-colors hover:text-paper hover:underline hover:decoration-accent hover:decoration-2">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="flex gap-x-6 sm:flex-col sm:gap-y-2">
              {elsewhere.map(([href, label]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-paper/80 transition-colors hover:text-paper">
                    {label} <ExternalIcon />
                  </a>
                </li>
              ))}
              <li>
                <a href="/rss.xml" className="text-paper/80 transition-colors hover:text-paper">RSS</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 font-sans text-xs text-paper/55">
          © {new Date().getFullYear()} {site.fullName} · {site.location}
        </p>
      </div>
    </footer>
  );
}
