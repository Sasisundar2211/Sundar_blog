import type { Metadata } from 'next';
import { getAll, allCategories, allTags } from '@/lib/content';
import { FilterableList } from '@/components/Search';

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'An engineering notebook: paper breakdowns, tool evaluations, architecture notes and experiment logs. Shorter and rougher than the essays.',
  alternates: { canonical: '/notes' },
};

export default function NotesIndex() {
  const docs = getAll('notes');
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Notes</h1>
        <p className="mt-4 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          An engineering notebook rather than a publication list. Paper breakdowns, tool
          evaluations, architecture sketches and things that surprised me. These are working notes:
          shorter, rougher, and revised in place when I learn something that contradicts them.
        </p>
      </header>
      <div className="py-10">
        <FilterableList docs={docs} categories={allCategories('notes')} tags={allTags('notes')} />
      </div>
    </div>
  );
}
