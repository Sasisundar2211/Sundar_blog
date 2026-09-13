import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAll, getOne } from '@/lib/content';
import { DocPage } from '@/components/DocPage';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getAll('notes').map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const doc = getOne('notes', slug);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `/notes/${slug}` },
    openGraph: {
      type: 'article', title: fm.title, description: fm.description,
      url: `${site.url}/notes/${slug}`, publishedTime: fm.date, authors: [site.name], tags: fm.tags,
    },
    twitter: { card: 'summary_large_image', title: fm.title, description: fm.description },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getOne('notes', slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
