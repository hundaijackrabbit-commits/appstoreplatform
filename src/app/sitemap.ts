import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { getAllCategorySlugPairs } from '@/lib/blog';

const BASE_URL = 'https://startova.space';

function safeBlogPostRoutes(): MetadataRoute.Sitemap {
  try {
    return getAllCategorySlugPairs().map(({ category, slug }) => ({
      url: `${BASE_URL}/blog/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap blog route error:', error);
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticPages, ...productPages, ...safeBlogPostRoutes()];
}
