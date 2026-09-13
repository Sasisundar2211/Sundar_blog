import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-wide px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-[1.05rem] text-ink">Every claim here links to the code.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Notes on AI engineering, verification and developer tooling. Roughly one piece a fortnight.
            </p>
            <a
              href="/rss.xml"
              className="mt-4 inline-block text-sm text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-accent"
            >
              Subscribe by RSS
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:gap-x-16">
            <Link href="/writing" className="text-muted hover:text-ink">Writing</Link>
            <a href={site.github} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">GitHub</a>
            <Link href="/projects" className="text-muted hover:text-ink">Projects</Link>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">LinkedIn</a>
            <Link href="/notes" className="text-muted hover:text-ink">Notes</Link>
            <a href={`mailto:${site.email}`} className="text-muted hover:text-ink">Email</a>
            <Link href="/about" className="text-muted hover:text-ink">About</Link>
            <Link href="/uses" className="text-muted hover:text-ink">Uses</Link>
          </nav>
        </div>

        <p className="mt-12 border-t border-rule pt-6 text-xs text-faint">
          © {new Date().getFullYear()} Sasi Sundar · {site.location}
        </p>
      </div>
    </footer>
  );
}
