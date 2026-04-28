'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BlogCTABlock from './BlogCTABlock';
import BlogInternalLinks from './BlogInternalLinks';
import BlogEmailCapture from './BlogEmailCapture';

interface BlogContentRendererProps {
  content: string;
  category: 'start-smart' | 'build-and-scale';
  slug: string;
}

// Custom component to inject CTAs and internal links at strategic points
export default function BlogContentRenderer({ content, category, slug }: BlogContentRendererProps) {
  
  // Split content into sections for CTA insertion
  const sections = content.split('\n---\n');
  
  // Find good insertion points (typically after major sections)
  const insertMidContentCTA = (contentParts: string[]) => {
    const midIndex = Math.floor(contentParts.length / 2);
    return [
      ...contentParts.slice(0, midIndex),
      '<!-- MID_CONTENT_CTA -->',
      ...contentParts.slice(midIndex)
    ];
  };

  // Process content with CTA insertions
  let processedSections = sections;
  if (sections.length > 2) {
    processedSections = insertMidContentCTA(sections);
  }

  // Generate contextual internal links based on category and content
  const getContextualLinks = () => {
    const baseLinks = [
      {
        title: "Professional Website Builds",
        href: "/#featured-products",
        description: "Ready-to-deploy websites with full code ownership",
        category: "product" as const
      }
    ];

    if (category === 'start-smart') {
      return [
        {
          title: "Website Ownership vs Platform Lock-in",
          href: "/blog/start-smart/ownership-vs-platforms",
          description: "Understand the difference between owned websites and rental platforms",
          category: "start-smart" as const
        },
        {
          title: "Business Growth Strategies",
          href: "/blog/build-and-scale",
          description: "Advanced tactics for scaling your online presence",
          category: "build-and-scale" as const
        },
        ...baseLinks
      ];
    } else {
      return [
        {
          title: "Website Fundamentals",
          href: "/blog/start-smart",
          description: "Master the basics of website ownership and online business",
          category: "start-smart" as const
        },
        {
          title: "Local SEO Strategy",
          href: "/blog/build-and-scale/local-seo",
          description: "Dominate local search results in your market",
          category: "build-and-scale" as const
        },
        ...baseLinks
      ];
    }
  };

  return (
    <div className="blog-prose">
      {processedSections.map((section, index) => {
        // Handle special insertion points
        if (section.trim() === '<!-- MID_CONTENT_CTA -->') {
          return (
            <BlogCTABlock
              key={`mid-cta-${index}`}
              variant="mid-content"
              className="my-12"
            />
          );
        }

        // Render markdown content
        return (
          <ReactMarkdown 
            key={index} 
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children, ...props }) => (
                <h2 {...props} className="text-2xl font-bold text-white mt-8 mb-4 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 {...props} className="text-xl font-semibold text-white mt-6 mb-3 tracking-tight">
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 {...props} className="text-lg font-medium text-white mt-5 mb-2">
                  {children}
                </h4>
              ),
              p: ({ children, ...props }) => (
                <p {...props} className="text-gray-300 leading-7 mb-4">
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul {...props} className="text-gray-300 space-y-2 mb-4 pl-6">
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol {...props} className="text-gray-300 space-y-2 mb-4 pl-6 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li {...props} className="text-gray-300 leading-6">
                  {children}
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote {...props} className="border-l-4 border-[--color-primary] bg-white/5 pl-6 py-3 my-6 text-gray-300 italic">
                  {children}
                </blockquote>
              ),
              strong: ({ children, ...props }) => (
                <strong {...props} className="font-semibold text-white">
                  {children}
                </strong>
              ),
              code: ({ children, ...props }) => (
                <code {...props} className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-[--color-primary]">
                  {children}
                </code>
              ),
              pre: ({ children, ...props }) => (
                <pre {...props} className="bg-black/50 border border-white/10 rounded-xl p-4 overflow-x-auto mb-6">
                  {children}
                </pre>
              ),
            }}
          >
            {section}
          </ReactMarkdown>
        );
      })}

      {/* Internal Links Section */}
      <BlogInternalLinks 
        links={getContextualLinks()}
        className="mt-12"
      />

      {/* Email Capture */}
      <BlogEmailCapture className="mt-8" />

      {/* End-of-article CTA */}
      <BlogCTABlock
        variant="end-article"
        className="mt-8"
      />
    </div>
  );
}