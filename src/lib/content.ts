import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { countWords, type Doc, type Frontmatter, type Kind } from './format';

export type { Doc, Frontmatter, Kind, Heading } from './format';
export { slugify, formatDate, headings } from './format';

const root = path.join(process.cwd(), 'content');

export function getAll(kind: Kind): Doc[] {
  const dir = path.join(root, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const words = countWords(content);
      return {
        slug: file.replace(/\.mdx$/, ''),
        kind,
        body: content,
        words,
        readingMinutes: Math.max(1, Math.round(words / 225)),
        frontmatter: data as Frontmatter,
      };
    })
    .filter((d) => !d.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getOne(kind: Kind, slug: string): Doc | undefined {
  return getAll(kind).find((d) => d.slug === slug);
}

export function neighbours(kind: Kind, slug: string) {
  const all = getAll(kind);
  const i = all.findIndex((d) => d.slug === slug);
  return { previous: all[i + 1], next: all[i - 1] };
}

export function related(doc: Doc, limit = 3): Doc[] {
  return getAll(doc.kind)
    .filter((d) => d.slug !== doc.slug)
    .map((d) => {
      const shared = d.frontmatter.tags.filter((t) => doc.frontmatter.tags.includes(t)).length;
      const cat = d.frontmatter.category === doc.frontmatter.category ? 1 : 0;
      return { d, score: shared * 2 + cat };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.d);
}

export function allTags(kind: Kind) {
  const counts = new Map<string, number>();
  for (const d of getAll(kind)) {
    for (const t of d.frontmatter.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function allCategories(kind: Kind) {
  const counts = new Map<string, number>();
  for (const d of getAll(kind)) {
    counts.set(d.frontmatter.category, (counts.get(d.frontmatter.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}
