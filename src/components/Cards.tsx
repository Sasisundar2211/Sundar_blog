import Link from 'next/link';
import type { Doc } from '@/lib/format';
import { formatDate, slugify } from '@/lib/format';
import type { Project } from '@/lib/projects';

export function Tag({ name, kind = 'posts' }: { name: string; kind?: 'posts' | 'notes' }) {
  return (
    <Link
      href={`/${kind === 'posts' ? 'writing' : 'notes'}/tag/${slugify(name)}`}
      className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
    >
      {name}
    </Link>
  );
}

export function Meta({ doc }: { doc: Doc }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
      <time dateTime={doc.frontmatter.date}>{formatDate(doc.frontmatter.date)}</time>
      <span aria-hidden>·</span>
      <span>{doc.readingMinutes} min read</span>
      <span aria-hidden>·</span>
      <span className="text-muted">{doc.frontmatter.category}</span>
    </div>
  );
}

export function ArticleCard({ doc, featured = false }: { doc: Doc; featured?: boolean }) {
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  return (
    <article className="group border-b border-rule py-7 first:pt-0">
      <Meta doc={doc} />
      <h3
        className={`mt-2 font-serif font-semibold tracking-[-0.01em] ${
          featured ? 'text-2xl leading-[1.2] sm:text-[1.75rem]' : 'text-xl leading-snug'
        }`}
      >
        <Link href={`${base}/${doc.slug}`} className="text-ink group-hover:text-accent">
          {doc.frontmatter.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-reading text-[.95rem] leading-relaxed text-muted">
        {doc.frontmatter.deck ?? doc.frontmatter.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {doc.frontmatter.tags.slice(0, 4).map((t) => (
          <Tag key={t} name={t} kind={doc.kind} />
        ))}
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border border-rule p-6 transition-colors hover:border-accent/40">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold tracking-[-0.01em]">
          <Link href={`/projects/${project.slug}`} className="text-ink group-hover:text-accent">
            {project.name}
          </Link>
        </h3>
        <span className="shrink-0 text-xs text-faint">{project.status}</span>
      </div>
      <p className="mt-3 flex-1 text-[.925rem] leading-relaxed text-muted">{project.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule pt-4">
        {project.facts.slice(0, 4).map((f) => (
          <div key={f.label}>
            <dt className="text-[.7rem] uppercase tracking-wider text-faint">{f.label}</dt>
            <dd className="font-mono text-[.8rem] text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-muted">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export function SectionHeading({
  title, href, hrefLabel,
}: { title: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-2">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[.14em] text-ink">{title}</h2>
      {href && (
        <Link href={href} className="text-xs text-muted transition-colors hover:text-accent">
          {hrefLabel ?? 'All'} →
        </Link>
      )}
    </div>
  );
}
