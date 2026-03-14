import { getAllPosts, CATEGORIES } from '@/lib/posts';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const base = 'https://omgeww.com';

  const postUrls = posts.map(p => ({
    url: `${base}/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const catUrls = CATEGORIES.map(c => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    ...catUrls,
    ...postUrls,
  ];
}
