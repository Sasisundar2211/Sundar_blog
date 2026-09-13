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

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search writing</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, tags, topics…"
            className="w-full border border-rule bg-transparent px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat(null)}
            aria-pressed={cat === null}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              cat === null ? 'border-ink bg-ink text-paper' : 'border-rule text-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setCat(name === cat ? null : name)}
              aria-pressed={cat === name}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                cat === name ? 'border-ink bg-ink text-paper' : 'border-rule text-muted hover:text-ink'
              }`}
            >
              {name} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-faint" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'piece' : 'pieces'}
      </p>

      <div className="mt-2">
        {results.map((d) => <ArticleCard key={d.slug} doc={d} />)}
        {results.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            Nothing matches that yet. {tags.length > 0 && `Try: ${tags.slice(0, 4).map((t) => t[0]).join(', ')}.`}
          </p>
        )}
      </div>
    </div>
  );
}
