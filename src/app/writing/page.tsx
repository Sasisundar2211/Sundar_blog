import type { Metadata } from 'next';
import { getAll, allCategories, allTags } from '@/lib/content';
import { FilterableList } from '@/components/Search';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on AI engineering, verification, evaluation in CI and developer tooling. Each piece is grounded in a public repository.',
  alternates: { canonical: '/writing' },
};

export default function WritingIndex() {
  const docs = getAll('posts');
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Writing</h1>
        <p className="mt-4 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          Long-form pieces on building and verifying AI systems. Every technical claim links to the
          commit or file it rests on, so you can check the work rather than take my word for it.
        </p>
      </header>
      <div className="py-10">
        <FilterableList docs={docs} categories={allCategories('posts')} tags={allTags('posts')} />
      </div>
    </div>
  );
}
