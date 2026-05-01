'use client';

import dynamic from 'next/dynamic';

const HomePageClient = dynamic(() => import('@/components/HomePageClient'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#0a0a14]" />,
});

export default function HomePageNoSSR() {
  return <HomePageClient />;
}
