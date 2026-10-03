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
    </div>
  );
}

export function ArticleCard({ doc, featured = false }: { doc: Doc; featured?: boolean }) {
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  return (
    <article className="group border-b border-rule py-7 first:pt-0">
      <Meta doc={doc} />
      <h3
        className={`mt-2 font-display font-semibold tracking-[-0.01em] ${
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

export function ArticleRow({ doc }: { doc: Doc }) {
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  return (
    <li>
      <Link
        href={`${base}/${doc.slug}`}
        className="group grid gap-1 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
      >
        <time dateTime={doc.frontmatter.date} className="text-sm text-faint">
          {formatDate(doc.frontmatter.date)}
        </time>
        <span className="font-medium text-ink group-hover:text-accent">{doc.frontmatter.title}</span>
      </Link>
    </li>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
      >
        <span className="font-semibold tracking-[-0.01em] text-ink group-hover:text-accent">
          {project.name}
        </span>
        <span className="text-[.95rem] leading-relaxed text-muted">{project.tagline}</span>
        <span className={`text-sm ${project.client ? 'text-accent' : 'text-faint'}`}>
          {project.label ?? 'Open source'}
        </span>
      </Link>
    </li>
  );
}

export function SectionHeading({
  title, href, hrefLabel,
}: { title: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-muted transition-colors hover:text-accent">
          {hrefLabel ?? 'All'} →
        </Link>
      )}
    </div>
  );
}
