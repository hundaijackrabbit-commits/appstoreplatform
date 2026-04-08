import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'modern-landing',
    name: 'Modern Landing Page',
    description: 'A stunning landing page that converts visitors into customers. Perfect for startups, products, or services.',
    basePrice: 299,
    category: 'landing-page',
    buildTime: { min: 2, max: 6, display: '2-6 hours' },
    features: [
      'Responsive Design',
      'Hero Section with CTA',
      'Feature Highlights',
      'Testimonials Section',
      'Contact Form',
      'SEO Optimized'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    customizationOptions: [
      {
        id: 'style',
        name: 'Visual Style',
        description: 'Choose the overall design aesthetic',
        required: true,
        options: [
          { id: 'minimal', name: 'Minimal & Clean', description: 'Simple, clean design with lots of white space', priceModifier: 0 },
          { id: 'bold', name: 'Bold & Colorful', description: 'Vibrant colors and strong visual elements', priceModifier: 50 },
          { id: 'dark', name: 'Dark Theme', description: 'Modern dark theme with neon accents', priceModifier: 75 },
          { id: 'glassmorphism', name: 'Glassmorphism', description: 'Trendy glass-like effects', priceModifier: 100 }
        ]
      },
      {
        id: 'sections',
        name: 'Page Sections',
        description: 'Select which sections to include',
        required: true,
        multiple: true,
        options: [
          { id: 'hero', name: 'Hero Section', description: 'Eye-catching main section', priceModifier: 0 },
          { id: 'features', name: 'Features Grid', description: 'Showcase your key features', priceModifier: 0 },
          { id: 'testimonials', name: 'Testimonials', description: 'Social proof from customers', priceModifier: 25 },
          { id: 'pricing', name: 'Pricing Table', description: 'Display your pricing tiers', priceModifier: 50 },
          { id: 'faq', name: 'FAQ Section', description: 'Answer common questions', priceModifier: 25 },
          { id: 'team', name: 'Team Section', description: 'Introduce your team', priceModifier: 30 },
          { id: 'blog', name: 'Blog Preview', description: 'Recent blog posts', priceModifier: 40 }
        ]
      },
      {
        id: 'animations',
        name: 'Animations',
        description: 'Add visual flair with animations',
        required: false,
        options: [
          { id: 'none', name: 'No Animations', description: 'Clean and simple', priceModifier: 0 },
          { id: 'subtle', name: 'Subtle Animations', description: 'Light hover and scroll effects', priceModifier: 25 },
          { id: 'advanced', name: 'Advanced Animations', description: 'Complex motion design', priceModifier: 75 }
        ]
      }
    ]
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    description: 'Showcase your work with a professional portfolio that stands out from the crowd.',
    basePrice: 399,
    category: 'portfolio',
    buildTime: { min: 3, max: 8, display: '3-8 hours' },
    features: [
      'Project Gallery',
      'About Section',
      'Skills Showcase',
      'Contact Integration',
      'Blog Optional',
      'Mobile Optimized'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'Sanity CMS'],
    customizationOptions: [
      {
        id: 'layout',
        name: 'Layout Style',
        required: true,
        options: [
          { id: 'grid', name: 'Grid Layout', description: 'Classic grid-based portfolio', priceModifier: 0 },
          { id: 'masonry', name: 'Masonry Layout', description: 'Pinterest-style layout', priceModifier: 50 },
          { id: 'slider', name: 'Slider Layout', description: 'Horizontal sliding gallery', priceModifier: 75 }
        ]
      },
      {
        id: 'cms',
        name: 'Content Management',
        required: true,
        options: [
          { id: 'static', name: 'Static Content', description: 'Fixed content, update via code', priceModifier: 0 },
          { id: 'headless', name: 'Headless CMS', description: 'Easy content updates via admin panel', priceModifier: 200 }
        ]
      }
    ]
  },
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Complete admin dashboard for your SaaS product with authentication and data visualization.',
    basePrice: 899,
    category: 'saas-tool',
    buildTime: { min: 12, max: 36, display: '12-36 hours' },
    features: [
      'User Authentication',
      'Dashboard Analytics',
      'Data Tables',
      'User Management',
      'Settings Pages',
      'API Integration Ready'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth.js'],
    customizationOptions: [
      {
        id: 'auth',
        name: 'Authentication',
        required: true,
        options: [
          { id: 'basic', name: 'Email/Password', description: 'Simple email and password auth', priceModifier: 0 },
          { id: 'oauth', name: 'Social Login', description: 'Google, GitHub, Twitter login', priceModifier: 150 },
          { id: 'enterprise', name: 'Enterprise SSO', description: 'SAML, Active Directory support', priceModifier: 400 }
        ]
      },
      {
        id: 'database',
        name: 'Database',
        required: true,
        options: [
          { id: 'sqlite', name: 'SQLite', description: 'Simple file-based database', priceModifier: 0 },
          { id: 'postgres', name: 'PostgreSQL', description: 'Production-ready database', priceModifier: 100 },
          { id: 'mysql', name: 'MySQL', description: 'Popular relational database', priceModifier: 100 }
        ]
      },
      {
        id: 'features',
        name: 'Dashboard Features',
        multiple: true,
        required: true,
        options: [
          { id: 'analytics', name: 'Analytics Charts', description: 'Beautiful data visualizations', priceModifier: 0 },
          { id: 'users', name: 'User Management', description: 'Manage application users', priceModifier: 100 },
          { id: 'billing', name: 'Billing Integration', description: 'Stripe payment processing', priceModifier: 200 },
          { id: 'notifications', name: 'Real-time Notifications', description: 'Live updates and alerts', priceModifier: 150 },
          { id: 'api', name: 'API Documentation', description: 'Auto-generated API docs', priceModifier: 100 }
        ]
      }
    ]
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Full-featured online store with payment processing and inventory management.',
    basePrice: 1299,
    category: 'ecommerce',
    buildTime: { min: 18, max: 48, display: '18-48 hours' },
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Payment Processing',
      'Order Management',
      'Customer Accounts',
      'Admin Dashboard'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
    customizationOptions: [
      {
        id: 'payment',
        name: 'Payment Processing',
        required: true,
        options: [
          { id: 'stripe', name: 'Stripe', description: 'Credit cards, Apple Pay, Google Pay', priceModifier: 0 },
          { id: 'paypal', name: 'PayPal + Stripe', description: 'Multiple payment options', priceModifier: 150 },
          { id: 'crypto', name: 'Cryptocurrency', description: 'Accept Bitcoin and other crypto', priceModifier: 300 }
        ]
      },
      {
        id: 'inventory',
        name: 'Inventory Management',
        required: true,
        options: [
          { id: 'basic', name: 'Basic Tracking', description: 'Simple stock levels', priceModifier: 0 },
          { id: 'advanced', name: 'Advanced Management', description: 'Variants, SKUs, suppliers', priceModifier: 200 }
        ]
      }
    ]
  },
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description: 'Professional blogging platform with CMS, SEO optimization, and social features.',
    basePrice: 599,
    category: 'blog',
    buildTime: { min: 8, max: 20, display: '8-20 hours' },
    features: [
      'Content Management System',
      'SEO Optimization',
      'Social Sharing',
      'Newsletter Signup',
      'Comment System',
      'Author Profiles'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'MDX', 'Tailwind CSS'],
    customizationOptions: [
      {
        id: 'cms-type',
        name: 'Content Management',
        required: true,
        options: [
          { id: 'mdx', name: 'MDX Files', description: 'Markdown with React components', priceModifier: 0 },
          { id: 'sanity', name: 'Sanity CMS', description: 'Visual content editor', priceModifier: 200 },
          { id: 'wordpress', name: 'Headless WordPress', description: 'WordPress as backend', priceModifier: 250 }
        ]
      },
      {
        id: 'features',
        name: 'Blog Features',
        multiple: true,
        required: true,
        options: [
          { id: 'search', name: 'Search Functionality', description: 'Find posts quickly', priceModifier: 75 },
          { id: 'categories', name: 'Categories & Tags', description: 'Organize content', priceModifier: 0 },
          { id: 'comments', name: 'Comment System', description: 'Reader engagement', priceModifier: 100 },
          { id: 'newsletter', name: 'Newsletter Integration', description: 'Email subscribers', priceModifier: 125 },
          { id: 'analytics', name: 'Analytics Dashboard', description: 'Track reader metrics', priceModifier: 100 }
        ]
      }
    ]
  },
  {
    id: 'api-service',
    name: 'API Service',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    basePrice: 799,
    category: 'api-service',
    buildTime: { min: 10, max: 30, display: '10-30 hours' },
    features: [
      'RESTful Endpoints',
      'Authentication & Authorization',
      'Rate Limiting',
      'API Documentation',
      'Database Integration',
      'Monitoring & Logging'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth.js', 'OpenAPI'],
    customizationOptions: [
      {
        id: 'endpoints',
        name: 'API Endpoints',
        multiple: true,
        required: true,
        options: [
          { id: 'crud', name: 'Basic CRUD', description: 'Create, read, update, delete operations', priceModifier: 0 },
          { id: 'auth', name: 'Authentication APIs', description: 'Login, register, password reset', priceModifier: 100 },
          { id: 'file', name: 'File Upload', description: 'Handle file uploads and storage', priceModifier: 150 },
          { id: 'search', name: 'Search & Filtering', description: 'Advanced query capabilities', priceModifier: 200 },
          { id: 'notifications', name: 'Notification APIs', description: 'Email and push notifications', priceModifier: 175 }
        ]
      },
      {
        id: 'deployment',
        name: 'Deployment Configuration',
        required: true,
        options: [
          { id: 'vercel', name: 'Vercel', description: 'Serverless deployment', priceModifier: 0 },
          { id: 'docker', name: 'Docker Container', description: 'Containerized deployment', priceModifier: 100 },
          { id: 'aws', name: 'AWS Lambda', description: 'AWS serverless', priceModifier: 150 }
        ]
      }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(product => product.category === category);
};

export const calculatePrice = (product: Product, customizations: Record<string, string | string[]>): number => {
  let totalPrice = product.basePrice;
  
  product.customizationOptions.forEach(group => {
    const selectedValues = customizations[group.id];
    
    if (selectedValues) {
      const selections = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
      
      selections.forEach(selectedId => {
        const option = group.options.find(opt => opt.id === selectedId);
        if (option) {
          totalPrice += option.priceModifier;
        }
      });
    }
  });
  
  return Math.max(totalPrice, product.basePrice); // Ensure price never goes below base price
};