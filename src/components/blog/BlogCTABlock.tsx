'use client';

import Link from 'next/link';
import { ArrowRight, Rocket, Target, Zap } from 'lucide-react';

interface BlogCTABlockProps {
  variant?: 'mid-content' | 'end-article';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export default function BlogCTABlock({ 
  variant = 'mid-content',
  title,
  description,
  buttonText,
  buttonHref = "/#featured-products",
  className = ""
}: BlogCTABlockProps) {
  
  const isMidContent = variant === 'mid-content';
  
  const defaultProps = isMidContent ? {
    title: "Ready to Apply What You've Learned?",
    description: "Stop reading theory. StartOva builds the actual website, code, and deployment so you can focus on growing your business.",
    buttonText: "See Website Builds",
    icon: Target
  } : {
    title: "Turn Knowledge Into Action",
    description: "You've learned the concepts. Now get the owned website, GitHub code, and live deployment to make it real.",
    buttonText: "Browse Website Builds", 
    icon: Rocket
  };

  const ctaTitle = title || defaultProps.title;
  const ctaDescription = description || defaultProps.description;
  const ctaButtonText = buttonText || defaultProps.buttonText;
  const IconComponent = defaultProps.icon;

  return (
    <div className={`my-8 ${className}`}>
      <div className={`rounded-2xl border ${isMidContent ? 'border-blue-400/20 bg-blue-400/5' : 'border-green-400/20 bg-green-400/10'} p-6`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className={`rounded-xl border ${isMidContent ? 'border-blue-400/20 bg-blue-400/10' : 'border-green-400/20 bg-green-400/10'} p-3 mt-1`}>
              <IconComponent className={`h-5 w-5 ${isMidContent ? 'text-blue-300' : 'text-green-300'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{ctaTitle}</h3>
              <p className={`text-sm leading-6 ${isMidContent ? 'text-blue-100' : 'text-gray-300'} max-w-lg`}>
                {ctaDescription}
              </p>
            </div>
          </div>
          <Link
            href={buttonHref}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
              isMidContent 
                ? 'bg-blue-400 text-black hover:bg-blue-300' 
                : 'bg-green-400 text-black hover:bg-green-300'
            }`}
          >
            {ctaButtonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}