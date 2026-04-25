import { MetadataRoute } from 'next';
import { getAllCategorySlugPairs } from '@/lib/blog';

const BASE_URL = 'https://startova.space';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  try {
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${BASE_URL}/blog`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/blog/start-smart`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/blog/build-and-scale`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    const blogPosts: MetadataRoute.Sitemap = getAllCategorySlugPairs().map(
      ({ category, slug }) => ({
        url: `${BASE_URL}/blog/${category}/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    );

    return [...staticPages, ...blogPosts];
  } catch (error) {
    console.error('Sitemap error:', error);

    return [
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${BASE_URL}/blog`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ];
  }
}
