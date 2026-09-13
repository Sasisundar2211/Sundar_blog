/**
 * Pure, isomorphic helpers and shared types.
 * MUST NOT import node builtins — this module is reachable from client components.
 */
export type Kind = 'posts' | 'notes';

export interface Frontmatter {
  title: string;
  deck?: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  category: string;
  featured?: boolean;
  draft?: boolean;
  repo?: string;
  evidence?: string;
}

export interface Doc {
  slug: string;
  kind: Kind;
  body: string;
  readingMinutes: number;
  words: number;
  frontmatter: Frontmatter;
}

export interface Heading { depth: number; text: string; id: string }

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

export function countWords(md: string): number {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Extract h2/h3 from markdown source, skipping fenced code. */
export function headings(md: string): Heading[] {
  const out: Heading[] = [];
  let fenced = false;
  for (const line of md.split('\n')) {
    if (line.trim().startsWith('```')) { fenced = !fenced; continue; }
    if (fenced) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (m) out.push({ depth: m[1].length, text: m[2], id: slugify(m[2]) });
  }
  return out;
}
