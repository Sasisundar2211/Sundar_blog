import Link from 'next/link';
import type { Doc } from '@/lib/format';
import { formatDate, slugify } from '@/lib/format';
import type { Project } from '@/lib/projects';
import { ForwardIcon } from './Icons';

/** A vermilion hairline that draws under a row on hover. The site's one motion. */
function RowRule() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );
}

export function Tag({ name, kind = 'posts' }: { name: string; kind?: 'posts' | 'notes' }) {
  return (
    <Link
      href={`/${kind === 'posts' ? 'writing' : 'notes'}/tag/${slugify(name)}`}
      className="text-muted transition-colors hover:text-accent"
    >
      {name}
    </Link>
  );
}

/** Tags as a run of text, not a row of capsules. */
export function TagList({ tags, kind }: { tags: string[]; kind?: 'posts' | 'notes' }) {
  return (
    <p className="font-sans text-sm">
      {tags.map((t, i) => (
        <span key={t}>
          {i > 0 && <span aria-hidden className="px-2 text-rule">/</span>}
          <Tag name={t} kind={kind} />
        </span>
      ))}
    </p>
  );
}

export function Meta({ doc }: { doc: Doc }) {
  return (
    <p className="font-sans text-sm text-faint">
      <time dateTime={doc.frontmatter.date}>{formatDate(doc.frontmatter.date)}</time>
      <span className="block">{doc.readingMinutes} min read</span>
    </p>
  );
}

export function ArticleCard({ doc, featured = false }: { doc: Doc; featured?: boolean }) {
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  return (
    <article className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
      <Meta doc={doc} />
      <div className="min-w-0">
        <h3
          className={`font-serif font-medium tracking-[-0.015em] ${
            featured ? 'text-[2rem] leading-[1.1]' : 'text-[1.6rem] leading-[1.15]'
          }`}
        >
          <Link href={`${base}/${doc.slug}`} className="text-ink transition-colors hover:text-accent">
            {doc.frontmatter.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          {doc.frontmatter.deck ?? doc.frontmatter.description}
        </p>
        <div className="mt-4">
          <TagList tags={doc.frontmatter.tags.slice(0, 4)} kind={doc.kind} />
        </div>
      </div>
    </article>
  );
}

export function ArticleRow({ doc }: { doc: Doc }) {
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  return (
    <li className="border-b border-rule">
      <Link
        href={`${base}/${doc.slug}`}
        className="group relative grid gap-1 py-5 outline-none sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
      >
        <time dateTime={doc.frontmatter.date} className="font-sans text-sm text-faint">
          {formatDate(doc.frontmatter.date)}
        </time>
        <span className="font-serif text-[1.375rem] leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
          {doc.frontmatter.title}
        </span>
        <RowRule />
      </Link>
    </li>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative grid gap-2 py-7 outline-none md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
      >
        <span className="font-serif text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
          {project.name}
        </span>
        <span className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted">{project.tagline}</span>
        <span
          className={`inline-flex items-center gap-2 font-sans text-sm ${project.client ? 'text-accent' : 'text-faint'}`}
        >
          {project.label ?? 'Open source'}
          <span className="hidden text-ink transition-transform duration-300 ease-out group-hover:translate-x-1 md:inline">
            <ForwardIcon />
          </span>
        </span>
        <RowRule />
      </Link>
    </li>
  );
}
