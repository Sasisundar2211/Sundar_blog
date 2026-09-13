import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAll, allTags, slugify } from '@/lib/content';
import { ArticleCard } from '@/components/Cards';

export function generateStaticParams() {
  return allTags('posts').map(([name]) => ({ tag: slugify(name) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string }> },
): Promise<Metadata> {
  const { tag } = await params;
  const name = allTags('posts').find(([n]) => slugify(n) === tag)?.[0] ?? tag;
  return { title: `Tagged “${name}”`, alternates: { canonical: `/writing/tag/${tag}` } };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const name = allTags('posts').find(([n]) => slugify(n) === tag)?.[0];
  if (!name) notFound();
  const docs = getAll('posts').filter((d) => d.frontmatter.tags.some((t) => slugify(t) === tag));

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <p className="text-xs uppercase tracking-[.16em] text-accent">Tag</p>
        <h1 className="mt-3 font-serif text-[2rem] font-semibold tracking-[-0.02em]">{name}</h1>
        <p className="mt-3 text-sm text-muted">{docs.length} {docs.length === 1 ? 'piece' : 'pieces'}</p>
      </header>
      <div className="py-8">{docs.map((d) => <ArticleCard key={d.slug} doc={d} />)}</div>
    </div>
  );
}
