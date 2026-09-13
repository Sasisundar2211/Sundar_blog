import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { formatDate, headings, neighbours, related, type Doc } from '@/lib/content';
import { site } from '@/lib/site';
import { Tag } from './Cards';
import { CopyCodeButtons, ReadingProgress, ShareRow, TableOfContents } from './Article';

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: { light: 'github-light', dark: 'github-dark-dimmed' }, keepBackground: false }],
    ] as never,
  },
};

function Callout({ children, kind = 'note' }: { children: React.ReactNode; kind?: 'note' | 'warn' }) {
  return (
    <aside
      className={`my-8 border-l-2 py-4 pl-5 text-[.95rem] leading-relaxed ${
        kind === 'warn' ? 'border-accent bg-accent/[.05]' : 'border-rule bg-raised'
      } pr-4`}
    >
      {children}
    </aside>
  );
}

function Evidence({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="my-8 flex items-start gap-3 border border-rule p-4 no-underline transition-colors hover:border-accent/50"
    >
      <span className="mt-0.5 shrink-0 font-mono text-[.65rem] uppercase tracking-wider text-accent">
        Evidence
      </span>
      <span className="font-mono text-[.8rem] leading-relaxed text-muted">{children}</span>
    </a>
  );
}

const components = { Callout, Evidence };

export function DocPage({ doc }: { doc: Doc }) {
  const toc = headings(doc.body);
  const { previous, next } = neighbours(doc.kind, doc.slug);
  const rel = related(doc);
  const base = doc.kind === 'posts' ? '/writing' : '/notes';
  const url = `${site.url}${base}/${doc.slug}`;
  const fm = doc.frontmatter;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    dateModified: fm.updated ?? fm.date,
    author: { '@type': 'Person', name: site.name, url: site.url },
    publisher: { '@type': 'Person', name: site.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: fm.tags.join(', '),
    articleSection: fm.category,
    wordCount: doc.words,
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <div className="grid gap-14 py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <div className="order-2 hidden lg:order-1 lg:block">
            <TableOfContents headings={toc} />
          </div>

          <article className="order-1 min-w-0 lg:order-2">
            <header className="border-b border-rule pb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
                <Link href={base} className="text-accent hover:underline">
                  {doc.kind === 'posts' ? 'Writing' : 'Notes'}
                </Link>
                <span aria-hidden>/</span>
                <span className="text-muted">{fm.category}</span>
              </div>

              <h1 className="mt-4 max-w-reading font-serif text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem]">
                {fm.title}
              </h1>

              {fm.deck && (
                <p className="mt-4 max-w-reading font-serif text-[1.2rem] leading-relaxed text-muted">
                  {fm.deck}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="text-ink">{site.name}</span>
                <span aria-hidden>·</span>
                <time dateTime={fm.date}>{formatDate(fm.date)}</time>
                <span aria-hidden>·</span>
                <span>{doc.readingMinutes} min read</span>
                {fm.updated && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="text-faint">Updated {formatDate(fm.updated)}</span>
                  </>
                )}
              </div>

              {fm.repo && (
                <p className="mt-4 font-mono text-xs text-muted">
                  Grounded in{' '}
                  <a href={fm.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    {fm.repo.replace('https://github.com/', '')}
                  </a>
                  {fm.evidence && <span className="block mt-1 text-faint">{fm.evidence}</span>}
                </p>
              )}
            </header>

            <div className="prose-editorial mt-10 max-w-reading">
              <MDXRemote source={doc.body} options={mdxOptions} components={components} />
            </div>
            <CopyCodeButtons />

            <div className="mt-14 max-w-reading border-t border-rule pt-6">
              <div className="flex flex-wrap gap-1.5">
                {fm.tags.map((t) => <Tag key={t} name={t} kind={doc.kind} />)}
              </div>
              <div className="mt-6"><ShareRow title={fm.title} url={url} /></div>
            </div>

            {(previous || next) && (
              <nav aria-label="Article" className="mt-10 grid max-w-reading gap-4 border-t border-rule pt-8 sm:grid-cols-2">
                {previous ? (
                  <Link href={`${base}/${previous.slug}`} className="group">
                    <span className="text-xs text-faint">← Previous</span>
                    <span className="mt-1 block font-serif text-[1.05rem] leading-snug text-ink group-hover:text-accent">
                      {previous.frontmatter.title}
                    </span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`${base}/${next.slug}`} className="group sm:text-right">
                    <span className="text-xs text-faint">Next →</span>
                    <span className="mt-1 block font-serif text-[1.05rem] leading-snug text-ink group-hover:text-accent">
                      {next.frontmatter.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}

            {rel.length > 0 && (
              <section className="mt-14 max-w-reading border-t border-rule pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[.14em] text-faint">Related</h2>
                <ul className="mt-4 space-y-4">
                  {rel.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`${r.kind === 'posts' ? '/writing' : '/notes'}/${r.slug}`}
                        className="font-serif text-[1.05rem] leading-snug text-ink hover:text-accent"
                      >
                        {r.frontmatter.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{r.frontmatter.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
