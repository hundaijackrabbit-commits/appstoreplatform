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

  // Set estimated completion to 24 hours from now (placeholder)
  const estimatedCompletionAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const order: Order = {
    id: generateOrderId(),
    productConfiguration,
    status: 'pending', // Start as pending, not queued
    createdAt: new Date(),
    estimatedCompletionAt,
    progressMessages: [`Order received at ${new Date().toISOString()}`],
    currentMessage: 'Your order has been received and is awaiting review.'
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
  
   if (status === 'ready_for_delivery' || status === 'delivered') {
  order.actualCompletionAt = new Date();
  order.downloadUrl = `/api/download/${orderId}`;
}

  
  saveOrder(order);
};

// DISABLED: Auto simulation removed for controlled order flow
// export const simulateOrderProgress = (orderId: string): void => {
//   // Simulation disabled - orders remain in pending state until manual approval
// };

export const getOrderProgress = (status: OrderStatus): number => {
  const statusProgress: Record<OrderStatus, number> = {
    'pending': 5,
    'reviewing': 10,
    'approved_to_build': 20,
    'building': 50,
    'finalizing': 90,
    'ready_for_delivery': 100,
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

// DISABLED: Auto simulation removed for controlled order flow
// Orders now remain in 'pending' state until manually processed by seller