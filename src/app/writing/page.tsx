import type { Metadata } from 'next';
import { getAll, allCategories, allTags } from '@/lib/content';
import { FilterableList } from '@/components/Search';
import { Page, PageHead } from '@/components/Ledger';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on AI engineering, verification, evaluation in CI and developer tooling. Each piece is grounded in a public repository.',
  alternates: { canonical: '/writing' },
};

export default function WritingIndex() {
  const docs = getAll('posts');
  return (
    <Page>
      <PageHead
        title="Writing"
        intro={
          <p>
          Long-form pieces on building and verifying AI systems. Every technical claim links to the
          commit or file it rests on, so you can check the work rather than take my word for it.
          </p>
        }
      />
      <div className="border-t-2 border-ink pt-8">
        <FilterableList docs={docs} categories={allCategories('posts')} tags={allTags('posts')} />
      </div>
    </Page>
  );
}
