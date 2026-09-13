import { getAll } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function GET() {
  const docs = [...getAll('posts'), ...getAll('notes')].sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );

  const items = docs.map((d) => {
    const path = `${d.kind === 'posts' ? '/writing' : '/notes'}/${d.slug}`;
    return `    <item>
      <title>${esc(d.frontmatter.title)}</title>
      <link>${site.url}${path}</link>
      <guid isPermaLink="true">${site.url}${path}</guid>
      <description>${esc(d.frontmatter.description)}</description>
      <pubDate>${new Date(d.frontmatter.date + 'T09:00:00Z').toUTCString()}</pubDate>
      <category>${esc(d.frontmatter.category)}</category>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
