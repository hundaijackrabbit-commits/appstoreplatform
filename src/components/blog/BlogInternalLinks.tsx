'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Link2, BookOpen, Briefcase } from 'lucide-react';

interface InternalLink {
  title: string;
  href: string;
  description?: string;
  category?: 'start-smart' | 'build-and-scale' | 'product';
}

interface BlogInternalLinksProps {
  links?: InternalLink[];
  title?: string;
  className?: string;
}

const DEFAULT_LINKS: InternalLink[] = [
  {
    title: "Website Ownership vs Platform Lock-in",
    href: "/blog/start-smart/ownership-vs-platforms",
    description: "Understand the difference between owned websites and rental platforms",
    category: "start-smart"
  },
  {
    title: "Cost vs Value: Website Investment Guide", 
    href: "/blog/build-and-scale/cost-vs-value",
    description: "Smart budgeting for business websites that drive results",
    category: "build-and-scale"
  },
  {
    title: "Professional Website Builds",
    href: "/#featured-products",
    description: "Ready-to-deploy websites with code ownership",
    category: "product"
  }
];

export default function BlogInternalLinks({
  links = DEFAULT_LINKS,
  title = "Continue Your Learning Path",
  className = ""
}: BlogInternalLinksProps) {
  
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'start-smart':
        return <BookOpen className="h-4 w-4 text-blue-400" />;
      case 'build-and-scale':
        return <Briefcase className="h-4 w-4 text-purple-400" />;
      case 'product':
        return <ExternalLink className="h-4 w-4 text-green-400" />;
      default:
        return <Link2 className="h-4 w-4 text-[--color-primary]" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'start-smart':
        return 'Start Smart';
      case 'build-and-scale':
        return 'Build & Scale';
      case 'product':
        return 'Website Builds';
      default:
        return 'Related';
    }
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <Link2 className="h-5 w-5 text-[--color-primary]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">Explore connected topics and take action</p>
        </div>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block rounded-xl border border-white/10 bg-black/10 p-4 hover:bg-white/10 transition group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getCategoryIcon(link.category)}
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {getCategoryLabel(link.category)}
                  </span>
                </div>
                <h4 className="text-white font-medium mb-1 group-hover:text-[--color-primary] transition">
                  {link.title}
                </h4>
                {link.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {link.description}
                  </p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[--color-primary] transition flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}