import Link from 'next/link';
import { ForwardIcon } from './Icons';

/**
 * The site's one layout idea: a narrow margin column for facts, a wide column for
 * the argument. Headings hang in the margin; a heavy ink rule opens each section.
 * Below `lg` the margin folds above the content.
 */
export const ledgerGrid = 'grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14';

export function Page({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-wide px-5 sm:px-8">{children}</div>;
}

export function PageHead({
  title, intro, margin, size = 'lg',
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Facts that sit in the margin column: dates, counts, status. */
  margin?: React.ReactNode;
  size?: 'lg' | 'xl';
}) {
  return (
    <header className={`${ledgerGrid} pb-16 pt-14 sm:pt-20`}>
      <div className="order-2 font-sans text-sm leading-relaxed text-muted lg:order-1 lg:pt-4">
        {margin}
      </div>
      <div className="order-1 min-w-0 lg:order-2">
        <h1
          className={`max-w-[20ch] font-serif font-normal leading-[1.02] tracking-[-0.025em] ${
            size === 'xl'
              ? 'text-[clamp(2.75rem,7.2vw,6rem)]'
              : 'text-[clamp(2.5rem,5.6vw,4.5rem)]'
          }`}
        >
          {title}
        </h1>
        {intro && (
          <div className="mt-7 max-w-[36rem] text-[1.125rem] leading-relaxed text-muted">{intro}</div>
        )}
      </div>
    </header>
  );
}

export function Section({
  title, href, hrefLabel, margin, children, id,
}: {
  title: React.ReactNode;
  href?: string;
  hrefLabel?: string;
  margin?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`${ledgerGrid} border-t-2 border-ink pb-20 pt-5`}>
      <div>
        <h2 className="font-serif text-[1.5rem] italic leading-tight tracking-[-0.01em] text-ink">{title}</h2>
        {margin && <div className="mt-3 font-sans text-sm leading-relaxed text-muted">{margin}</div>}
        {href && (
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm text-muted transition-colors hover:text-accent"
          >
            {hrefLabel ?? 'All'} <ForwardIcon />
          </Link>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
