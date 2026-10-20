import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProject } from '@/lib/projects';
import { ExternalIcon } from '@/components/Icons';
import { Page, PageHead, Section } from '@/components/Ledger';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: p.name, description: p.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <Page>
      <article>
        <PageHead
          title={p.name}
          margin={
            <nav aria-label="Breadcrumb">
              <Link href="/projects" className="ln">Projects</Link>
              <span aria-hidden className="px-2 text-rule">/</span>
              <span className={p.client ? 'text-accent' : undefined}>{p.label ?? p.status}</span>
            </nav>
          }
          intro={
            <>
              <p>{p.summary}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
                <a href={p.repo} target="_blank" rel="noreferrer" className="action">
                  Source <ExternalIcon />
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="ln inline-flex items-center gap-1 font-sans">
                    Live <ExternalIcon />
                  </a>
                )}
              </div>
            </>
          }
        />

        <Section title="Facts">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {p.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-sans text-sm text-faint">{f.label}</dt>
                <dd className="mt-1 font-serif text-[1.25rem] leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Why I built it">
          <p className="max-w-reading font-serif text-[1.25rem] leading-[1.6] text-ink/90">{p.why}</p>
        </Section>

        <Section title="Architecture">
          <ul className="max-w-reading list-disc space-y-3 pl-5 font-serif text-[1.1875rem] leading-[1.6] text-ink/90 marker:text-accent">
            {p.architecture.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </Section>

        <Section title="Engineering decisions">
          <div className="max-w-reading">
            {p.decisions.map((d) => (
              <div key={d.title} className="border-b border-rule py-6 first:pt-0 last:border-0">
                <h3 className="font-serif text-[1.5rem] font-medium leading-snug tracking-[-0.01em] text-ink">{d.title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="What I learned">
          <ul className="max-w-reading space-y-5">
            {p.lessons.map((l, i) => (
              <li key={i} className="font-serif text-[1.375rem] italic leading-snug text-ink">{l}</li>
            ))}
          </ul>
        </Section>

        <Section title="Stack">
          <p className="font-sans text-[1.0625rem] text-muted">
            {p.stack.map((s, i) => (
              <span key={s}>
                {i > 0 && <span aria-hidden className="px-2.5 text-rule">/</span>}
                <span className="text-ink">{s}</span>
              </span>
            ))}
          </p>
        </Section>
      </article>
    </Page>
  );
}
