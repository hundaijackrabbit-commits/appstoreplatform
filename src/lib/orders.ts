import { Order, OrderStatus, ProductConfiguration, HUMOROUS_MESSAGES, BUILD_TIMES } from '@/types';
import { getProductById } from '@/data/products';

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `order_${timestamp}_${random}`.toUpperCase();
};

export const createOrder = (productConfiguration: ProductConfiguration): Order => {
  const product = getProductById(productConfiguration.productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const buildTime = BUILD_TIMES[product.category];
  const estimatedHours = Math.floor(Math.random() * (buildTime.max - buildTime.min + 1)) + buildTime.min;
  const estimatedCompletionAt = new Date(Date.now() + estimatedHours * 60 * 60 * 1000);

  const order: Order = {
    id: generateOrderId(),
    productConfiguration,
    status: 'queued',
    createdAt: new Date(),
    estimatedCompletionAt,
    progressMessages: [],
    currentMessage: HUMOROUS_MESSAGES[0]
  };

  return order;
};

export const saveOrder = (order: Order): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(`order_${order.id}`, JSON.stringify({
    ...order,
    createdAt: order.createdAt.toISOString(),
    estimatedCompletionAt: order.estimatedCompletionAt.toISOString(),
    actualCompletionAt: order.actualCompletionAt?.toISOString()
  }));
};

export const loadOrder = (orderId: string): Order | null => {
  if (typeof window === 'undefined') return null;
  
  const orderData = localStorage.getItem(`order_${orderId}`);
  if (!orderData) return null;
  
  try {
    const parsed = JSON.parse(orderData);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      estimatedCompletionAt: new Date(parsed.estimatedCompletionAt),
      actualCompletionAt: parsed.actualCompletionAt ? new Date(parsed.actualCompletionAt) : undefined
    };
  } catch {
    return null;
  }
};

export const getAllOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const orders: Order[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('order_')) {
      const order = loadOrder(key.replace('order_', ''));
      if (order) orders.push(order);
    }
  }
  
  return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const updateOrderStatus = (orderId: string, status: OrderStatus, message?: string): void => {
  const order = loadOrder(orderId);
  if (!order) return;
  
  order.status = status;
  if (message) {
    order.currentMessage = message;
    order.progressMessages.push(`${new Date().toISOString()}: ${message}`);
  }
  
  if (status === 'ready') {
    order.actualCompletionAt = new Date();
    order.downloadUrl = `/api/download/${orderId}`;
  }
  
  saveOrder(order);
};

export const simulateOrderProgress = (orderId: string): void => {
  const order = loadOrder(orderId);
  if (!order) return;
  
  const statusProgression: OrderStatus[] = ['queued', 'building', 'optimizing', 'finalizing', 'ready'];
  const currentIndex = statusProgression.indexOf(order.status);
  
  if (currentIndex < statusProgression.length - 1) {
    const nextStatus = statusProgression[currentIndex + 1];
    const randomMessage = HUMOROUS_MESSAGES[Math.floor(Math.random() * HUMOROUS_MESSAGES.length)];
    updateOrderStatus(orderId, nextStatus, randomMessage);
  }
};

export const getOrderProgress = (status: OrderStatus): number => {
  const statusProgress: Record<OrderStatus, number> = {
    'queued': 5,
    'building': 35,
    'optimizing': 70,
    'finalizing': 90,
    'ready': 100,
    'delivered': 100
  };
  
  return statusProgress[status] || 0;
};

export const formatTimeRemaining = (estimatedCompletionAt: Date): string => {
  const now = new Date();
  const diffMs = estimatedCompletionAt.getTime() - now.getTime();
  
  if (diffMs <= 0) return 'Any moment now...';
  
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffMs / (1000 * 60));
  
  if (diffHours >= 1) {
    return `~${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
  } else {
    return `~${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} remaining`;
  }
};

// Development helper to simulate realistic order progression
export const startOrderSimulation = (orderId: string): void => {
  if (typeof window === 'undefined') return;
  
  const intervals = [2000, 5000, 8000, 12000]; // Realistic timing between status updates
  
  intervals.forEach((delay, index) => {
    setTimeout(() => {
      simulateOrderProgress(orderId);
      
      // Trigger message rotation
      const order = loadOrder(orderId);
      if (order && order.status !== 'ready') {
        const randomMessage = HUMOROUS_MESSAGES[Math.floor(Math.random() * HUMOROUS_MESSAGES.length)];
        order.currentMessage = randomMessage;
        saveOrder(order);
      }
    }, delay);
  });
};