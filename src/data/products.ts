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