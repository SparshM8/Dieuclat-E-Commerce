import { useState, useEffect, useCallback } from 'react';
import {
  Coupon,
  Promotion,
  LoyaltyProgram,
  UserLoyalty,
  AppliedDiscount
} from '../types/index';

// TypeScript interfaces
export interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  imageText: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NotificationType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: any;
  payment: any;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Product data
export const products: Product[] = [
  {
    id: 1,
    name: 'The Luxe Set',
    price: 120.00,
    color: '#C2D8CA',
    imageText: 'set.jpeg',
    category: 'best-sellers',
    description: 'A luxurious collection of premium items carefully curated for those who appreciate the finer things.',
    inStock: true
  },
  {
    id: 2,
    name: 'Serenity Box',
    price: 85.00,
    color: '#F3B0C1',
    imageText: 'box.jpeg',
    category: 'best-sellers',
    description: 'Find peace and tranquility with this beautifully crafted collection of calming essentials.',
    inStock: true
  },
  {
    id: 3,
    name: 'Gourmet Treats',
    price: 95.00,
    color: '#CCC4E1',
    imageText: 'treat.jpeg',
    category: 'best-sellers',
    description: 'Indulge in a selection of artisan treats and gourmet delicacies.',
    inStock: true
  },
  {
    id: 4,
    name: 'Celebration Kit',
    price: 150.00,
    color: '#FFD88A',
    imageText: 'kit.jpeg',
    category: 'best-sellers',
    description: 'Everything you need to celebrate life\'s special moments in style.',
    inStock: true
  },
  {
    id: 5,
    name: 'Aura Candle',
    price: 45.00,
    color: '#C2D8CA',
    imageText: 'Aura Candle.jpeg',
    category: 'trending',
    description: 'Hand-poured luxury candle with sophisticated fragrances.',
    inStock: true
  },
  {
    id: 6,
    name: 'Pastel Silk Scarf',
    price: 70.00,
    color: '#F3B0C1',
    imageText: 'Pastel Silk Scarf.jpeg',
    category: 'trending',
    description: 'Elegant silk scarf in beautiful pastel shades.',
    inStock: true
  },
  {
    id: 7,
    name: 'Minimalist Tea Set',
    price: 110.00,
    color: '#CCC4E1',
    imageText: 'Minimalist Tea Set.jpeg',
    category: 'trending',
    description: 'Modern tea set with clean lines and timeless design.',
    inStock: true
  },
  {
    id: 8,
    name: 'Cozy Knit Throw',
    price: 135.00,
    color: '#FFD88A',
    imageText: 'Cozy Knit Throw.jpeg',
    category: 'trending',
    description: 'Luxuriously soft throw blanket for ultimate comfort.',
    inStock: true
  }
];

// Custom hooks for state management
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentView, setCurrentView] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dieuclat_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch (error) {
        console.warn('Could not load cart from localStorage', error);
      }
    }

    const savedOrders = localStorage.getItem('dieuclat_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      } catch (error) {
        console.warn('Could not load orders from localStorage', error);
      }
    }
  }, []);

  // Save cart and orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('dieuclat_cart', JSON.stringify(cart));
    } catch (error) {
      console.warn('Could not save cart to localStorage', error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('dieuclat_orders', JSON.stringify(orders));
    } catch (error) {
      console.warn('Could not save orders to localStorage', error);
    }
  }, [orders]);

  const addToCart = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    showNotification(`${product.name} added to cart!`);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showNotification('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];

      return newCart;
    });
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const checkout = useCallback(() => {
    if (cart.length === 0) {
      showNotification('Your cart is empty');
      return;
    }

    setCurrentView('checkout');
  }, [cart]);

  const placeOrder = useCallback((orderData: any) => {
    const order: Order = {
      id: 'ORD-' + Date.now(),
      items: [...cart],
      total: getCartTotal(),
      shipping: orderData.shipping,
      payment: orderData.payment,
      status: 'confirmed',
      date: new Date().toISOString()
    };

    setOrders(prev => [order, ...prev]);
    setCurrentOrder(order);
    setCart([]);
    setCurrentView('confirmation');

    showNotification('Order placed successfully!');
  }, [cart, getCartTotal]);

  const continueShopping = useCallback(() => {
    setCurrentView('cart');
    setCurrentOrder(null);
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = Date.now().toString();
    const notification: NotificationType = { id, message, type };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  return {
    cart,
    notifications,
    orders,
    currentView,
    currentOrder,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    checkout,
    placeOrder,
    continueShopping,
    showNotification
  };
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setWishlist(prevWishlist => {
      const existingIndex = prevWishlist.findIndex(item => item.id === productId);

      if (existingIndex > -1) {
        return prevWishlist.filter(item => item.id !== productId);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  return {
    wishlist,
    toggleWishlist,
    isInWishlist
  };
};

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 4);
    });
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed
  };
};

// Modal management hook
export const useModal = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openSearchModal = useCallback(() => setIsSearchModalOpen(true), []);
  const closeSearchModal = useCallback(() => setIsSearchModalOpen(false), []);

  const openCartSidebar = useCallback(() => setIsCartSidebarOpen(true), []);
  const closeCartSidebar = useCallback(() => setIsCartSidebarOpen(false), []);

  const openQuickViewModal = useCallback((product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewModalOpen(true);
  }, []);

  const closeQuickViewModal = useCallback(() => {
    setIsQuickViewModalOpen(false);
    setQuickViewProduct(null);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsSearchModalOpen(false);
    setIsCartSidebarOpen(false);
    setIsQuickViewModalOpen(false);
    setQuickViewProduct(null);
  }, []);

  return {
    isSearchModalOpen,
    isCartSidebarOpen,
    isQuickViewModalOpen,
    quickViewProduct,
    openSearchModal,
    closeSearchModal,
    openCartSidebar,
    closeCartSidebar,
    openQuickViewModal,
    closeQuickViewModal,
    closeAllModals
  };
};

// Scroll and animation effects hook
export const useScrollEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToElement = useCallback((selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      const navbarHeight = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  }, []);

  return {
    scrollY,
    isVisible,
    scrollToTop,
    scrollToElement
  };
};

// Newsletter hook
export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const subscribe = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return false;
    }

    setIsLoading(true);
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setMessage('✓ Success! Check your email for your 15% discount code.');
    setMessageType('success');

    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);

    return true;
  }, []);

  return {
    isLoading,
    message,
    messageType,
    subscribe
  };
};

// FAQ hook
export const useFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const isOpen = useCallback((index: number) => openItems.has(index), [openItems]);

  return {
    toggleItem,
    isOpen
  };
};

// Reviews hook
export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    // Sample reviews data
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      productId: '1',
      rating: 5,
      title: 'Absolutely stunning quality!',
      comment: 'This luxe set exceeded my expectations. The packaging was beautiful and the items inside are of exceptional quality. Perfect for gifting to someone special.',
      verified: true,
      helpful: 12,
      createdAt: '2024-11-01T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      productId: '1',
      rating: 4,
      title: 'Great product, fast delivery',
      comment: 'Very pleased with the purchase. The items arrived quickly and were exactly as described. Would recommend to friends.',
      verified: true,
      helpful: 8,
      createdAt: '2024-10-28T14:15:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emma Davis',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      productId: '2',
      rating: 5,
      title: 'Perfect serenity in a box',
      comment: 'The Serenity Box helped me create a peaceful atmosphere in my home. The scents are calming and the quality is outstanding.',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      verified: true,
      helpful: 15,
      createdAt: '2024-11-05T09:45:00Z'
    }
  ]);

  const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const getProductReviews = useCallback((productId: string) => {
    return reviews.filter(review => review.productId === productId);
  }, [reviews]);

  const getProductReviewStats = useCallback((productId: string): ReviewStats => {
    const productReviews = getProductReviews(productId);
    const totalReviews = productReviews.length;

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / totalReviews;

    const ratingDistribution = productReviews.reduce((dist, review) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingDistribution
    };
  }, [getProductReviews]);

  const markReviewHelpful = useCallback((reviewId: string) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  }, []);

  return {
    reviews,
    addReview,
    getProductReviews,
    getProductReviewStats,
    markReviewHelpful
  };
};

// Search hook
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredProducts);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    results,
    search,
    clearSearch
  };
};

// Promotions and Discounts Hook
export const usePromotions = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    // Sample coupons
    {
      id: '1',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minPurchase: 50,
      validFrom: '2024-01-01T00:00:00Z',
      validUntil: '2024-12-31T23:59:59Z',
      usageLimit: 100,
      usedCount: 23,
      isActive: true,
      description: '10% off orders over $50'
    },
    {
      id: '2',
      code: 'FREESHIP',
      type: 'free_shipping',
      value: 0,
      minPurchase: 75,
      validFrom: '2024-01-01T00:00:00Z',
      validUntil: '2024-12-31T23:59:59Z',
      usageLimit: 50,
      usedCount: 12,
      isActive: true,
      description: 'Free shipping on orders over $75'
    },
    {
      id: '3',
      code: 'SAVE20',
      type: 'fixed',
      value: 20,
      maxDiscount: 20,
      validFrom: '2024-11-01T00:00:00Z',
      validUntil: '2024-11-30T23:59:59Z',
      usageLimit: 200,
      usedCount: 45,
      isActive: true,
      description: '$20 off any order'
    }
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    // Sample promotions
    {
      id: '1',
      title: 'Black Friday Sale',
      description: 'Up to 50% off on all items',
      type: 'flash_sale',
      discountType: 'percentage',
      discountValue: 50,
      startDate: '2024-11-29T00:00:00Z',
      endDate: '2024-12-02T23:59:59Z',
      isActive: true,
      conditions: {
        minPurchase: 0
      },
      priority: 1
    },
    {
      id: '2',
      title: 'Bundle Deal: Buy 2 Get 1 Free',
      description: 'Mix and match any 3 items',
      type: 'bundle',
      discountType: 'percentage',
      discountValue: 33,
      startDate: '2024-11-01T00:00:00Z',
      endDate: '2024-11-30T23:59:59Z',
      isActive: true,
      conditions: {
        minPurchase: 0
      },
      priority: 2
    }
  ]);

  const [loyaltyProgram] = useState<LoyaltyProgram>({
    id: '1',
    name: 'Dieuclat Rewards',
    description: 'Earn points on every purchase and unlock exclusive benefits',
    pointsPerDollar: 1,
    pointsExpiryDays: 365,
    tiers: [
      {
        id: 'bronze',
        name: 'Bronze',
        minPoints: 0,
        benefits: {
          discountPercentage: 0,
          freeShipping: false,
          bonusPointsMultiplier: 1
        }
      },
      {
        id: 'silver',
        name: 'Silver',
        minPoints: 500,
        benefits: {
          discountPercentage: 5,
          freeShipping: false,
          bonusPointsMultiplier: 1.2
        }
      },
      {
        id: 'gold',
        name: 'Gold',
        minPoints: 1500,
        benefits: {
          discountPercentage: 10,
          freeShipping: true,
          bonusPointsMultiplier: 1.5
        }
      },
      {
        id: 'platinum',
        name: 'Platinum',
        minPoints: 5000,
        benefits: {
          discountPercentage: 15,
          freeShipping: true,
          bonusPointsMultiplier: 2
        }
      }
    ]
  });

  const [userLoyalty] = useState<UserLoyalty | null>(null);

  // Coupon functions
  const validateCoupon = useCallback((code: string, cartTotal: number, cartItems: CartItem[]): { valid: boolean; discount?: AppliedDiscount; error?: string } => {
    const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase() && c.isActive);

    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code' };
    }

    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);

    if (now < validFrom || now > validUntil) {
      return { valid: false, error: 'Coupon has expired' };
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit exceeded' };
    }

    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      return { valid: false, error: `Minimum purchase of $${coupon.minPurchase} required` };
    }

    // Check applicable products/categories
    if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
      const hasApplicableProduct = cartItems.some(item =>
        coupon.applicableProducts!.includes(item.id.toString())
      );
      if (!hasApplicableProduct) {
        return { valid: false, error: 'Coupon not applicable to items in cart' };
      }
    }

    if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
      const hasApplicableCategory = cartItems.some(item =>
        coupon.applicableCategories!.includes(item.category)
      );
      if (!hasApplicableCategory) {
        return { valid: false, error: 'Coupon not applicable to items in cart' };
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (cartTotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discountAmount = coupon.value;
    } else if (coupon.type === 'free_shipping') {
      // Free shipping will be handled separately
      discountAmount = 0;
    }

    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }

    const appliedDiscount: AppliedDiscount = {
      id: coupon.id,
      type: 'coupon',
      code: coupon.code,
      description: coupon.description,
      discountAmount,
      originalAmount: cartTotal
    };

    return { valid: true, discount: appliedDiscount };
  }, [coupons]);

  const applyCoupon = useCallback((couponId: string) => {
    setCoupons(prev => prev.map(coupon =>
      coupon.id === couponId
        ? { ...coupon, usedCount: coupon.usedCount + 1 }
        : coupon
    ));
  }, []);

  // Promotion functions
  const getActivePromotions = useCallback(() => {
    const now = new Date();
    return promotions.filter(promo => {
      const startDate = new Date(promo.startDate);
      const endDate = new Date(promo.endDate);
      return promo.isActive && now >= startDate && now <= endDate;
    }).sort((a, b) => b.priority - a.priority);
  }, [promotions]);

  const calculatePromotionDiscount = useCallback((cartItems: CartItem[], cartTotal: number): AppliedDiscount[] => {
    const activePromotions = getActivePromotions();
    const discounts: AppliedDiscount[] = [];

    for (const promo of activePromotions) {
      let applicableTotal = cartTotal;

      // Check conditions
      if (promo.conditions.minPurchase && cartTotal < promo.conditions.minPurchase) {
        continue;
      }

      if (promo.conditions.applicableProducts && promo.conditions.applicableProducts.length > 0) {
        const applicableItems = cartItems.filter(item =>
          promo.conditions.applicableProducts!.includes(item.id.toString())
        );
        applicableTotal = applicableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }

      if (promo.conditions.applicableCategories && promo.conditions.applicableCategories.length > 0) {
        const applicableItems = cartItems.filter(item =>
          promo.conditions.applicableCategories!.includes(item.category)
        );
        applicableTotal = applicableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }

      if (applicableTotal > 0) {
        let discountAmount = 0;
        if (promo.discountType === 'percentage') {
          discountAmount = (applicableTotal * promo.discountValue) / 100;
        } else {
          discountAmount = promo.discountValue;
        }

        discounts.push({
          id: promo.id,
          type: 'promotion',
          description: promo.description,
          discountAmount,
          originalAmount: applicableTotal
        });
      }
    }

    return discounts;
  }, [getActivePromotions]);

  // Loyalty functions
  const getUserTier = useCallback((points: number) => {
    const sortedTiers = [...loyaltyProgram.tiers].sort((a, b) => b.minPoints - a.minPoints);
    return sortedTiers.find(tier => points >= tier.minPoints) || loyaltyProgram.tiers[0];
  }, [loyaltyProgram.tiers]);

  const calculateLoyaltyDiscount = useCallback((cartTotal: number, userPoints: number): AppliedDiscount | null => {
    const userTier = getUserTier(userPoints);
    if (userTier.benefits.discountPercentage > 0) {
      const discountAmount = (cartTotal * userTier.benefits.discountPercentage) / 100;
      return {
        id: 'loyalty-discount',
        type: 'loyalty',
        description: `${userTier.name} tier discount (${userTier.benefits.discountPercentage}%)`,
        discountAmount,
        originalAmount: cartTotal
      };
    }
    return null;
  }, [getUserTier]);

  const earnLoyaltyPoints = useCallback((orderTotal: number, userId: string) => {
    const pointsEarned = Math.floor(orderTotal * loyaltyProgram.pointsPerDollar);
    // In a real app, this would update the user's loyalty points in the database
    console.log(`User ${userId} earned ${pointsEarned} loyalty points`);
  }, [loyaltyProgram.pointsPerDollar]);

  // Admin functions
  const createCoupon = useCallback((coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      usedCount: 0
    };
    setCoupons(prev => [...prev, newCoupon]);
  }, []);

  const updateCoupon = useCallback((couponId: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(coupon =>
      coupon.id === couponId ? { ...coupon, ...updates } : coupon
    ));
  }, []);

  const deleteCoupon = useCallback((couponId: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
  }, []);

  const createPromotion = useCallback((promotion: Omit<Promotion, 'id'>) => {
    const newPromotion: Promotion = {
      ...promotion,
      id: Date.now().toString()
    };
    setPromotions(prev => [...prev, newPromotion]);
  }, []);

  const updatePromotion = useCallback((promotionId: string, updates: Partial<Promotion>) => {
    setPromotions(prev => prev.map(promo =>
      promo.id === promotionId ? { ...promo, ...updates } : promo
    ));
  }, []);

  const deletePromotion = useCallback((promotionId: string) => {
    setPromotions(prev => prev.filter(promo => promo.id !== promotionId));
  }, []);

  return {
    // Data
    coupons,
    promotions,
    loyaltyProgram,
    userLoyalty,

    // Coupon functions
    validateCoupon,
    applyCoupon,

    // Promotion functions
    getActivePromotions,
    calculatePromotionDiscount,

    // Loyalty functions
    getUserTier,
    calculateLoyaltyDiscount,
    earnLoyaltyPoints,

    // Admin functions
    createCoupon,
    updateCoupon,
    deleteCoupon,
    createPromotion,
    updatePromotion,
    deletePromotion
  };
};