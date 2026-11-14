import type { Metadata } from 'next';
import { getAll, allCategories, allTags } from '@/lib/content';
import { FilterableList } from '@/components/Search';
import { writingCategories } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Engineering notes from Sasi Sundar on building software with AI: Build Notes, AI Engineering and Founder Notes.',
  alternates: { canonical: '/writing' },
};

export default function WritingIndex() {
  const docs = getAll('posts');
  const counts = new Map(allCategories('posts'));
  const categories = writingCategories
    .filter((c) => counts.has(c))
    .map((c) => [c, counts.get(c)!] as [string, number]);
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Engineering notes from Sasi Sundar
        </h1>
        <div className="mt-5 max-w-reading space-y-3 text-[1.0625rem] leading-relaxed text-muted">
          <p>
            I write about building software with AI, from checking what an agent actually executed to
            making sure a paid checkout unlocks access.
          </p>
          <p>
            This is where I document the real trade-offs, silent protocol failures, and engineering
            lessons from building Finance PSU Guide, FirmRunner, and Vouqis.
          </p>
        </div>
      </header>
      <div className="py-10">
        <FilterableList docs={docs} categories={categories} tags={allTags('posts')} />
      </div>
    </div>
  );
}
