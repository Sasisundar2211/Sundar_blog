import type { Metadata } from 'next';
import { getAll, allCategories, allTags } from '@/lib/content';
import { FilterableList } from '@/components/Search';
import { Page, PageHead } from '@/components/Ledger';

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'An engineering notebook: paper breakdowns, tool evaluations, architecture notes and experiment logs. Shorter and rougher than the essays.',
  alternates: { canonical: '/notes' },
};

export default function NotesIndex() {
  const docs = getAll('notes');
  return (
    <Page>
      <PageHead
        title="Notes"
        intro={
          <p>
          An engineering notebook rather than a publication list. Paper breakdowns, tool
          evaluations, architecture sketches and things that surprised me. These are working notes:
          shorter, rougher, and revised in place when I learn something that contradicts them.
          </p>
        }
      />
      <div className="border-t-2 border-ink pt-8">
        <FilterableList docs={docs} categories={allCategories('notes')} tags={allTags('notes')} />
      </div>
    </Page>
  );
}
