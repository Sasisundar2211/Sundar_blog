import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { formatDate, headings, neighbours, related, type Doc } from '@/lib/content';
import { site } from '@/lib/site';
import { TagList } from './Cards';
import { CopyCodeButtons, ReadingProgress, ShareRow, TableOfContents } from './Article';
import { BackIcon, ExternalIcon, ForwardIcon, InfoIcon, WarnIcon } from './Icons';

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
    <aside className="my-10 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border-y border-rule py-5 font-sans text-[1rem] leading-relaxed text-ink/90">
      <span className={`pt-0.5 text-[1.15rem] ${kind === 'warn' ? 'text-accent' : 'text-muted'}`}>
        {kind === 'warn' ? <WarnIcon /> : <InfoIcon />}
      </span>
      <div className="[&>*+*]:mt-3">{children}</div>
    </aside>
  );
}

function Evidence({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group my-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-ink pt-3 !no-underline"
    >
      <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-accent">
        Source <ExternalIcon />
      </span>
      <span className="font-mono text-[.8rem] leading-relaxed text-muted transition-colors group-hover:text-ink">{children}</span>
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
        <div className="grid gap-14 pb-12 pt-14 sm:pt-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <div className="order-2 hidden lg:order-1 lg:block">
            <TableOfContents headings={toc} />
          </div>

          <article className="order-1 min-w-0 lg:order-2">
            <header className="border-b-2 border-ink pb-8">
              <nav aria-label="Breadcrumb" className="font-sans text-sm text-muted">
                <Link href={base} className="ln">
                  {doc.kind === 'posts' ? 'Writing' : 'Notes'}
                </Link>
                <span aria-hidden className="px-2 text-rule">/</span>
                <span>{fm.category}</span>
              </nav>

              <h1 className="mt-6 max-w-[22ch] font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                {fm.title}
              </h1>

              {fm.deck && (
                <p className="mt-5 max-w-reading font-serif text-[1.375rem] italic leading-snug text-muted">
                  {fm.deck}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1 font-sans text-sm text-muted">
                <span className="text-ink">{site.name}</span>
                <time dateTime={fm.date}>{formatDate(fm.date)}</time>
                <span>{doc.readingMinutes} min read</span>
                {fm.updated && (
                  <>
                    <span className="text-faint">Updated {formatDate(fm.updated)}</span>
                  </>
                )}
              </div>

              {fm.repo && (
                <p className="mt-3 font-sans text-sm text-muted">
                  Grounded in{' '}
                  <a href={fm.repo} target="_blank" rel="noreferrer" className="ln font-mono text-[.8rem]">
                    {fm.repo.replace('https://github.com/', '')}
                  </a>
                  {fm.evidence && <span className="mt-1 block font-mono text-[.8rem] text-faint">{fm.evidence}</span>}
                </p>
              )}
            </header>

            <div className="prose-editorial mt-10 max-w-reading">
              <MDXRemote source={doc.body} options={mdxOptions} components={components} />
            </div>
            <CopyCodeButtons />

            <div className="mt-16 max-w-reading border-t-2 border-ink pt-5">
              <TagList tags={fm.tags} kind={doc.kind} />
              <div className="mt-6"><ShareRow title={fm.title} url={url} /></div>
            </div>

            {(previous || next) && (
              <nav aria-label="Article" className="mt-12 grid max-w-reading gap-8 border-t border-rule pt-8 sm:grid-cols-2">
                {previous ? (
                  <Link href={`${base}/${previous.slug}`} className="group">
                    <span className="inline-flex items-center gap-1 font-sans text-sm text-faint"><BackIcon /> Previous</span>
                    <span className="mt-2 block font-serif text-[1.25rem] leading-snug text-ink transition-colors group-hover:text-accent">
                      {previous.frontmatter.title}
                    </span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`${base}/${next.slug}`} className="group sm:text-right">
                    <span className="inline-flex items-center gap-1 font-sans text-sm text-faint">Next <ForwardIcon /></span>
                    <span className="mt-2 block font-serif text-[1.25rem] leading-snug text-ink transition-colors group-hover:text-accent">
                      {next.frontmatter.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}

            {rel.length > 0 && (
              <section className="mt-16 max-w-reading border-t-2 border-ink pt-5">
                <h2 className="font-serif text-[1.5rem] italic">Related</h2>
                <ul className="mt-2">
                  {rel.map((r) => (
                    <li key={r.slug} className="border-b border-rule py-5">
                      <Link
                        href={`${r.kind === 'posts' ? '/writing' : '/notes'}/${r.slug}`}
                        className="font-serif text-[1.3rem] leading-snug text-ink transition-colors hover:text-accent"
                      >
                        {r.frontmatter.title}
                      </Link>
                      <p className="mt-1.5 text-[.95rem] leading-relaxed text-muted">{r.frontmatter.description}</p>
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
