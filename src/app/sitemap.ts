import type { MetadataRoute } from 'next';
import { getAll, allTags, slugify } from '@/lib/content';
import { projects } from '@/lib/projects';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ['', '/writing', '/projects', '/notes', '/about', '/now', '/uses', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: (p === '' || p === '/writing' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  const docs = [...getAll('posts'), ...getAll('notes')].map((d) => ({
    url: `${site.url}${d.kind === 'posts' ? '/writing' : '/notes'}/${d.slug}`,
    lastModified: new Date(d.frontmatter.updated ?? d.frontmatter.date),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tagPages = allTags('posts').map(([name]) => ({
    url: `${site.url}/writing/tag/${slugify(name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [...statics, ...docs, ...projectPages, ...tagPages];
}
