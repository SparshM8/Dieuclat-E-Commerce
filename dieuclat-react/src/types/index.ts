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

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GiftCategory {
  id: string;
  name: string;
  image: string;
  description: string;
}

/// <reference types="vite/client" />

// Promotion and Discount Types
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // percentage (0-100) or fixed amount
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  applicableProducts?: string[]; // product IDs
  applicableCategories?: string[]; // category names
  description: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'flash_sale' | 'bundle' | 'category_discount' | 'loyalty_bonus' | 'clearance' | 'seasonal';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  conditions: {
    minPurchase?: number;
    applicableProducts?: string[];
    applicableCategories?: string[];
    userSegments?: string[];
  };
  bannerImage?: string;
  priority: number; // for sorting multiple promotions
}

export interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  tiers: LoyaltyTier[];
  pointsPerDollar: number;
  pointsExpiryDays?: number;
}

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  benefits: {
    discountPercentage: number;
    freeShipping: boolean;
    bonusPointsMultiplier: number;
  };
}

export interface UserLoyalty {
  userId: string;
  totalPoints: number;
  currentTier: string;
  pointsHistory: LoyaltyTransaction[];
  redeemedRewards: LoyaltyReward[];
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'expired';
  points: number;
  reason: string;
  date: string;
  orderId?: string;
}

export interface LoyaltyReward {
  id: string;
  type: 'discount' | 'free_shipping' | 'bonus_points';
  value: number;
  redeemedAt: string;
  expiresAt?: string;
}

export interface AppliedDiscount {
  id: string;
  type: 'coupon' | 'promotion' | 'loyalty';
  code?: string;
  description: string;
  discountAmount: number;
  originalAmount: number;
}