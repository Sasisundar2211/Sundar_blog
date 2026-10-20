'use client';

import { useMemo, useState } from 'react';
import { ArticleCard } from './Cards';
import type { Doc } from '@/lib/format';

export function FilterableList({
  docs, categories, tags,
}: { docs: Doc[]; categories: [string, number][]; tags: [string, number][] }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return docs.filter((d) => {
      if (cat && d.frontmatter.category !== cat) return false;
      if (!needle) return true;
      const hay = [
        d.frontmatter.title,
        d.frontmatter.description,
        d.frontmatter.deck ?? '',
        d.frontmatter.category,
        ...d.frontmatter.tags,
      ].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [docs, q, cat]);

  const filter = (active: boolean) =>
    `py-1 transition-colors underline-offset-[6px] ${
      active ? 'text-ink underline decoration-accent decoration-2' : 'text-muted hover:text-ink'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full lg:max-w-sm">
          <span className="sr-only">Search writing</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, tags, topics"
            className="w-full border-0 border-b-2 border-ink bg-transparent px-0 pb-2 font-serif text-[1.375rem] text-ink placeholder:italic placeholder:text-faint focus:border-accent focus:outline-none focus:ring-0"
          />
        </label>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm" role="group" aria-label="Filter by category">
          <button type="button" onClick={() => setCat(null)} aria-pressed={cat === null} className={filter(cat === null)}>
            All
          </button>
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setCat(name === cat ? null : name)}
              aria-pressed={cat === name}
              className={filter(cat === name)}
            >
              {name}<sup className="ml-0.5 tabular-nums text-faint">{count}</sup>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 border-b border-ink pb-2 font-sans text-sm text-faint" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'piece' : 'pieces'}
      </p>

      <div>
        {results.map((d) => <ArticleCard key={d.slug} doc={d} />)}
        {results.length === 0 && (
          <p className="py-16 font-serif text-[1.25rem] italic text-muted">
            Nothing matches that yet. {tags.length > 0 && `Try: ${tags.slice(0, 4).map((t) => t[0]).join(', ')}.`}
          </p>
        )}
      </div>
    </div>
  );
}
