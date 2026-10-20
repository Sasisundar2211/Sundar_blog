import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAll, allTags, slugify } from '@/lib/content';
import Link from 'next/link';
import { ArticleCard } from '@/components/Cards';
import { Page, PageHead } from '@/components/Ledger';

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
    <Page>
      <PageHead
        title={<>Tagged <em>{name}</em></>}
        margin={
          <p>
            <Link href="/writing" className="ln">Writing</Link>
            <span className="block">{docs.length} {docs.length === 1 ? 'piece' : 'pieces'}</span>
          </p>
        }
      />
      <div className="border-t-2 border-ink">{docs.map((d) => <ArticleCard key={d.slug} doc={d} />)}</div>
    </Page>
  );
}
