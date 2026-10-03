import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProject } from '@/lib/projects';
import { ExternalIcon } from '@/components/Icons';

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
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <article className="py-12">
        <header className="max-w-reading border-b border-rule pb-8">
          <div className="flex items-center gap-3 text-xs">
            <Link href="/projects" className="text-accent hover:underline">Projects</Link>
            <span className="text-faint" aria-hidden>/</span>
            <span className="text-muted">{p.status}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            {p.name}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              Source <ExternalIcon />
            </a>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
                Live <ExternalIcon />
              </a>
            )}
          </div>
        </header>

        <dl className="my-8 grid max-w-reading grid-cols-2 gap-x-6 gap-y-4 border-b border-rule pb-8 sm:grid-cols-3">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-faint">{f.label}</dt>
              <dd className="mt-0.5 text-[.95rem] font-medium text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="max-w-reading space-y-12">
          <section>
            <h2 className="font-display text-[1.4rem] font-semibold">Why I built it</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/90">{p.why}</p>
          </section>

          <section>
            <h2 className="font-display text-[1.4rem] font-semibold">Architecture</h2>
            <ul className="mt-3 list-disc space-y-2.5 pl-5 text-[1.0625rem] leading-relaxed text-ink/90 marker:text-faint">
              {p.architecture.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[1.4rem] font-semibold">Engineering decisions</h2>
            <div className="mt-4 divide-y divide-rule">
              {p.decisions.map((d) => (
                <div key={d.title} className="py-5 first:pt-1">
                  <h3 className="font-display text-[1.1rem] font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 text-[.975rem] leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-[1.4rem] font-semibold">What I learned</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-ink/90 marker:text-accent">
              {p.lessons.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[1.4rem] font-semibold">Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-rule px-3 py-1 text-sm text-muted">{s}</span>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
