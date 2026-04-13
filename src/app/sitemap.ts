import { MetadataRoute } from 'next';
import { getAllCategorySlugPairs } from '@/lib/blog';

const BASE_URL = 'https://startova.space';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/blog',
    '/blog/start-smart',
    '/blog/build-and-scale',
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const blogPosts = getAllCategorySlugPairs().map(({ category, slug }) => ({
    url: `${BASE_URL}/blog/${category}/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...blogPosts];
}