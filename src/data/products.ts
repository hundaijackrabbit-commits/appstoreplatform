import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'modern-landing',
    name: 'Modern Landing Page',
    description: 'A stunning landing page that converts visitors into customers. Perfect for startups, products, or services.',
    basePrice: 50,
    category: 'landing-page',
    buildTime: { min: 2, max: 6, display: '2-6 hours' },
    features: [
      'Responsive Design',
      'Hero Section with CTA', 
      'Contact Form',
      'SEO Optimized'
    ],
    keyFeatures: [
      'Launch-ready within 48 hours',
      'Mobile-first responsive design',
      'Built-in lead capture forms'
    ],
    bestFor: 'Entrepreneurs launching their first product or service',
    whatYouGet: [
      'Complete source code and project files',
      'Live website deployed and ready',
      'Setup documentation and instructions',
      'Mobile-optimized design for all devices',
      'SEO-ready structure and meta tags',
      'Contact forms with email integration',
      'Hosting setup guide (works with Vercel, Netlify, etc.)'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    addons: [
      { id: 'premium-design', name: 'Premium Design Pack', description: 'Professional color schemes and typography', price: 15 },
      { id: 'testimonials', name: 'Testimonials Section', description: 'Social proof from customers', price: 10 },
      { id: 'pricing-table', name: 'Pricing Table', description: 'Display your pricing tiers', price: 15 },
      { id: 'blog-preview', name: 'Blog Preview Section', description: 'Recent blog posts showcase', price: 20 },
      { id: 'animations', name: 'Advanced Animations', description: 'Smooth transitions and effects', price: 25 }
    ]
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    description: 'Showcase your work with a professional portfolio that stands out from the crowd.',
    basePrice: 75,
    category: 'portfolio',
    buildTime: { min: 3, max: 8, display: '3-8 hours' },
    features: [
      'Project Gallery',
      'About Section', 
      'Contact Integration',
      'Mobile Optimized'
    ],
    keyFeatures: [
      'Professional project showcase',
      'Smooth animations & interactions',
      'Easy content management'
    ],
    bestFor: 'Freelancers, designers, and creative professionals',
    whatYouGet: [
      'Complete portfolio website with project gallery',
      'Professional about and contact sections',
      'Smooth animations and micro-interactions',
      'Easy-to-update project showcase system',
      'Mobile-responsive design for all devices',
      'SEO optimization for better discovery',
      'Complete source code and deployment guide',
      'Documentation for adding new projects'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion'],
    addons: [
      { id: 'skills-showcase', name: 'Skills Showcase', description: 'Professional skills display', price: 20 },
      { id: 'blog', name: 'Blog Integration', description: 'Personal blog section', price: 30 },
      { id: 'cms', name: 'Content Management', description: 'Easy content updates via admin panel', price: 40 },
      { id: 'animations', name: 'Advanced Animations', description: 'Smooth portfolio transitions', price: 25 },
      { id: 'analytics', name: 'Analytics Dashboard', description: 'Track visitor metrics', price: 15 }
    ]
  },
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Complete admin dashboard for your SaaS product with authentication and data visualization.',
    basePrice: 100,
    category: 'saas-tool',
    buildTime: { min: 12, max: 36, display: '12-36 hours' },
    features: [
      'User Authentication',
      'Dashboard Analytics',
      'Data Tables',
      'API Integration Ready'
    ],
    keyFeatures: [
      'Production-ready authentication',
      'Real-time data visualization',
      'Scalable architecture'
    ],
    bestFor: 'SaaS founders and tech entrepreneurs',
    whatYouGet: [
      'Complete dashboard with user authentication system',
      'Data visualization charts and analytics',
      'User management and role-based permissions',
      'API integration templates and documentation',
      'Database schema and migration files',
      'Responsive admin interface for all devices',
      'Complete source code with clear documentation',
      'Deployment guides for production hosting',
      'Email templates for user notifications'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    addons: [
      { id: 'oauth', name: 'Social Authentication', description: 'Google, GitHub, Twitter login', price: 30 },
      { id: 'user-management', name: 'User Management', description: 'Manage application users', price: 40 },
      { id: 'billing', name: 'Billing Integration', description: 'Stripe payment processing', price: 50 },
      { id: 'notifications', name: 'Real-time Notifications', description: 'Live updates and alerts', price: 30 },
      { id: 'api-docs', name: 'API Documentation', description: 'Auto-generated API docs', price: 30 }
    ]
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Full-featured online store with payment processing and inventory management.',
    basePrice: 150,
    category: 'ecommerce',
    buildTime: { min: 18, max: 48, display: '18-48 hours' },
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Payment Processing',
      'Order Management'
    ],
    keyFeatures: [
      'Ready-to-sell product catalog',
      'Secure payment processing',
      'Complete order management'
    ],
    bestFor: 'Small business owners starting online sales',
    whatYouGet: [
      'Complete e-commerce website with product catalog',
      'Secure Stripe payment integration',
      'Shopping cart and checkout system',
      'Order management and customer notifications',
      'Mobile-responsive design for all devices',
      'Admin panel for managing products and orders',
      'Email templates for order confirmations',
      'Complete source code and documentation',
      'Hosting and deployment guides',
      'Basic inventory tracking system'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'Stripe'],
    addons: [
      { id: 'inventory', name: 'Advanced Inventory', description: 'Variants, SKUs, suppliers', price: 50 },
      { id: 'admin-dashboard', name: 'Admin Dashboard', description: 'Comprehensive admin panel', price: 40 },
      { id: 'customer-accounts', name: 'Customer Accounts', description: 'User registration and profiles', price: 30 },
      { id: 'reviews', name: 'Product Reviews', description: 'Customer review system', price: 25 },
      { id: 'analytics', name: 'Sales Analytics', description: 'Sales reporting and insights', price: 35 }
    ]
  },
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description: 'Professional blogging platform with CMS, SEO optimization, and social features.',
    basePrice: 60,
    category: 'blog',
    buildTime: { min: 8, max: 20, display: '8-20 hours' },
    features: [
      'Content Management System',
      'SEO Optimization',
      'Social Sharing',
      'Mobile Responsive'
    ],
    keyFeatures: [
      'Easy content management',
      'SEO-optimized for discovery',
      'Social sharing built-in'
    ],
    bestFor: 'Content creators and thought leaders',
    whatYouGet: [
      'Complete blog platform with CMS',
      'SEO-optimized structure and meta tags',
      'Social sharing buttons and integration',
      'Mobile-responsive design for all devices',
      'Easy-to-use content management system',
      'Author profiles and bio sections',
      'Tag and category organization',
      'Complete source code and documentation',
      'Hosting setup and deployment guides',
      'RSS feed generation'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'MDX'],
    addons: [
      { id: 'headless-cms', name: 'Headless CMS', description: 'Visual content editor', price: 40 },
      { id: 'search', name: 'Search Functionality', description: 'Find posts quickly', price: 20 },
      { id: 'comments', name: 'Comment System', description: 'Reader engagement', price: 25 },
      { id: 'newsletter', name: 'Newsletter Integration', description: 'Email subscribers', price: 30 },
      { id: 'analytics', name: 'Analytics Dashboard', description: 'Track reader metrics', price: 25 }
    ]
  },
  {
    id: 'api-service',
    name: 'API Service',
    description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    basePrice: 80,
    category: 'api-service',
    buildTime: { min: 10, max: 30, display: '10-30 hours' },
    features: [
      'RESTful Endpoints',
      'Authentication & Authorization',
      'Rate Limiting',
      'API Documentation'
    ],
    keyFeatures: [
      'Production-ready REST API',
      'Built-in security & rate limiting',
      'Auto-generated documentation'
    ],
    bestFor: 'Developers building backend services',
    whatYouGet: [
      'Complete REST API with authentication',
      'Rate limiting and security middleware',
      'Auto-generated API documentation',
      'Database models and migration setup',
      'Error handling and logging systems',
      'Testing framework and sample tests',
      'Complete source code with documentation',
      'Docker configuration for deployment',
      'Production hosting guidelines',
      'API client examples and SDKs'
    ],
    previewImage: '/previews/placeholder.svg',
    techStack: ['Next.js', 'TypeScript', 'OpenAPI'],
    addons: [
      { id: 'file-upload', name: 'File Upload', description: 'Handle file uploads and storage', price: 30 },
      { id: 'search-filtering', name: 'Advanced Search', description: 'Advanced query capabilities', price: 40 },
      { id: 'notifications', name: 'Notification APIs', description: 'Email and push notifications', price: 35 },
      { id: 'webhooks', name: 'Webhook System', description: 'Event-driven notifications', price: 25 },
      { id: 'monitoring', name: 'Monitoring & Logging', description: 'Performance and error tracking', price: 30 }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(product => product.category === category);
};

export const calculatePrice = (product: Product, selectedAddons: string[]): number => {
  let totalPrice = product.basePrice;
  
  selectedAddons.forEach(addonId => {
    const addon = product.addons.find(a => a.id === addonId);
    if (addon) {
      totalPrice += addon.price;
    }
  });
  
  return totalPrice;
};