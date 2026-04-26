import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductById } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

const BASE_URL = 'https://startova.space';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      alternates: {
        canonical: `${BASE_URL}/#featured-products`,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${product.name} Website Build`;
  const description = `${product.description} Includes source code, GitHub-ready files, ZIP delivery, and live deployment with no platform lock-in.`;
  const canonical = `${BASE_URL}/product/${product.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'StartOva',
      type: 'website',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${BASE_URL}${product.previewImage}`,
    brand: {
      '@type': 'Brand',
      name: 'StartOva',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: 'USD',
      price: product.basePrice,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient />
    </>
  );
}
