export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: ProductCategory;
  buildTime: BuildTime;
  features: string[];
  customizationOptions: CustomizationGroup[];
  previewImage: string;
  techStack: string[];
}

export interface CustomizationGroup {
  id: string;
  name: string;
  description?: string;
  options: CustomizationOption[];
  required: boolean;
  multiple?: boolean;
}

export interface CustomizationOption {
  id: string;
  name: string;
  description?: string;
  priceModifier: number; // Can be positive or negative
  icon?: string;
}

export interface ProductConfiguration {
  productId: string;
  customizations: Record<string, string | string[]>;
  totalPrice: number;
}

export interface Order {
  id: string;
  productConfiguration: ProductConfiguration;
  status: OrderStatus;
  createdAt: Date;
  estimatedCompletionAt: Date;
  actualCompletionAt?: Date;
  progressMessages: string[];
  currentMessage?: string;
  downloadUrl?: string;
}

export type ProductCategory = 
  | 'landing-page'
  | 'portfolio'
  | 'blog'
  | 'ecommerce'
  | 'saas-tool'
  | 'dashboard'
  | 'api-service'
  | 'mobile-app';

export type BuildTime = {
  min: number; // hours
  max: number; // hours
  display: string;
};

export type OrderStatus = 
  | 'queued'
  | 'building'
  | 'optimizing'
  | 'finalizing'
  | 'ready'
  | 'delivered';

export const BUILD_TIMES: Record<ProductCategory, BuildTime> = {
  'landing-page': { min: 2, max: 6, display: '2-6 hours' },
  'portfolio': { min: 3, max: 8, display: '3-8 hours' },
  'blog': { min: 4, max: 10, display: '4-10 hours' },
  'ecommerce': { min: 8, max: 24, display: '8-24 hours' },
  'saas-tool': { min: 12, max: 36, display: '12-36 hours' },
  'dashboard': { min: 6, max: 18, display: '6-18 hours' },
  'api-service': { min: 8, max: 24, display: '8-24 hours' },
  'mobile-app': { min: 24, max: 48, display: '24-48 hours' },
};

export const HUMOROUS_MESSAGES = [
  "Warming up the servers… ☕",
  "Teaching your app how to behave…",
  "Convincing the code to cooperate…",
  "Untangling some spicy logic…",
  "Polishing pixels… ✨",
  "Debugging things that definitely weren't our fault…",
  "Adding a touch of magic…",
  "Almost ready — putting on the finishing touches…",
  "Making sure all the 1s and 0s are in the right place…",
  "Bribing the database to be faster…",
  "Teaching the CSS to stop being so stubborn…",
  "Convincing the JavaScript to run on the first try…",
  "Adding some secret sauce…",
  "Making it look effortless (this is the hard part)…",
  "Quality testing with our robot overlords…",
  "Crossing our fingers and hoping for the best…",
  "Making sure everything is pixel perfect…",
  "Teaching the buttons to be more clickable…",
  "Optimizing for maximum wow factor…",
  "Adding professional developer tears for flavor…",
  "Making sure mobile users won't hate us…",
  "Sprinkling some unicorn dust…",
  "Removing bugs that totally weren't there before…",
  "Making it fast enough to impress your users…",
  "Adding the finishing touches that make all the difference…"
];