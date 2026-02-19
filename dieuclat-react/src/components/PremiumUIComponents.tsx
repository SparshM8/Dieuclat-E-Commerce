/**
 * Premium UI Components - Copy & Paste Ready
 * Add these to your components folder
 */

// ============================================
// 1. PREMIUM BUTTON COMPONENT
// ============================================
import React from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';

export const PremiumButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ children, variant = 'primary', size = 'md', disabled = false, onClick, className = '' }) => {
  const baseStyles = `
    font-semibold rounded-lg transition-all duration-300 
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-2xl focus:ring-purple-600',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// ============================================
// 2. PREMIUM PRODUCT CARD
// ============================================
export const PremiumProductCard: React.FC<{
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  badge?: string;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onQuickView?: () => void;
  onClick?: () => void;
}> = ({ id, name, price, originalPrice, image, rating = 0, badge, isWishlisted, onAddToCart, onWishlist, onQuickView, onClick }) => {
  const [isWishlistedState, setIsWishlistedState] = React.useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const wishlisted = isWishlisted ?? isWishlistedState;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300 z-10"></div>

      {/* Image container */}
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {badge}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Wishlist button - appears on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isWishlisted === undefined) {
              setIsWishlistedState(!isWishlistedState);
            }
            onWishlist?.();
          }}
          className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20"
        >
          <Heart className={`w-5 h-5 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20"
            aria-label={`Quick view ${name}`}
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Add to cart button - appears on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-purple-600">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>

        {/* CTA Button */}
        <PremiumButton
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          View Details
        </PremiumButton>
      </div>
    </div>
  );
};

// ============================================
// 3. GLASS MORPHISM CARD
// ============================================
export const GlassMorphismCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`
    backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-6 sm:p-8
    shadow-2xl hover:shadow-2xl transition-all duration-300
    hover:border-white/40 hover:bg-white/40
    ${className}
  `}>
    {children}
  </div>
);

// ============================================
// 4. GRADIENT HEADING
// ============================================
export const GradientHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h1 className={`
    text-4xl sm:text-5xl md:text-6xl font-bold
    bg-gradient-to-r from-purple-600 via-pink-600 to-red-600
    bg-clip-text text-transparent
    animate-gradient-x
    ${className}
  `}>
    {children}
  </h1>
);

// ============================================
// 5. ANIMATED BADGE
// ============================================
export const AnimatedBadge: React.FC<{
  text: string;
  icon?: React.ReactNode;
  color?: 'amber' | 'green' | 'blue' | 'purple';
}> = ({ text, icon, color = 'amber' }) => {
  const colors = {
    amber: 'from-amber-50 to-orange-50 border-amber-200 text-amber-900',
    green: 'from-green-50 to-emerald-50 border-green-200 text-green-900',
    blue: 'from-blue-50 to-cyan-50 border-blue-200 text-blue-900',
    purple: 'from-purple-50 to-pink-50 border-purple-200 text-purple-900',
  };

  return (
    <div className={`
      inline-flex items-center gap-2
      bg-gradient-to-r ${colors[color]}
      border px-4 py-2 rounded-full
      text-sm font-semibold
    `}>
      {icon && <div className="relative inline-block">{icon}</div>}
      <span>{text}</span>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );
};

// ============================================
// 6. LOADING SKELETON
// ============================================
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-purple-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

// ============================================
// 7. TOAST NOTIFICATION
// ============================================
export const Toast: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  onClose?: () => void;
}> = ({ message, type = 'success', icon, onClose }) => {
  const styles = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    error: 'bg-gradient-to-r from-red-500 to-pink-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-600',
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-6 right-6 px-6 py-4 rounded-lg text-white
      ${styles[type]} shadow-2xl
      flex items-center gap-3
      animate-slide-in-right
      z-50
    `}>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-80 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

// ============================================
// 8. FLOATING ACTION BUTTON (FAB)
// ============================================
export const FloatingActionButton: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
  variant?: 'primary' | 'secondary';
}> = ({ icon, onClick, label, variant = 'primary' }) => {
  const styles = {
    primary: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
  };

  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        fixed bottom-8 right-8 w-14 h-14 rounded-full
        ${styles[variant]}
        text-white shadow-2xl
        transform hover:scale-110 active:scale-95
        transition-all duration-300
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600
        z-40
      `}
    >
      {icon}
    </button>
  );
};

// ============================================
// 9. PREMIUM SECTION HEADER
// ============================================
export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
}> = ({ title, subtitle, description }) => (
  <div className="text-center space-y-4 mb-12">
    {subtitle && (
      <AnimatedBadge text={subtitle} color="purple" />
    )}
    <h2 className="
      text-3xl sm:text-4xl md:text-5xl font-bold
      text-gray-900
    ">
      {title}
    </h2>
    {description && (
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {description}
      </p>
    )}
  </div>
);

// ============================================
// 10. ANIMATED COUNTER
// ============================================
export const AnimatedCounter: React.FC<{
  targetValue: number;
  duration?: number;
  suffix?: string;
  label?: string;
}> = ({ targetValue, duration = 2000, suffix = '', label }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const value = Math.floor(targetValue * progress);
      setCount(Math.min(value, targetValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      {label && <div className="text-gray-600 text-sm mt-2">{label}</div>}
    </div>
  );
};

// ============================================
// 11. FEATURE CARD WITH ICON
// ============================================
export const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    {/* Gradient border on hover */}
    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-300 transition-all duration-300"></div>

    {/* Icon with background */}
    <div className="mb-4 inline-block p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
      <div className="text-purple-600">{icon}</div>
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

    {/* Description */}
    <p className="text-gray-600 text-sm">{description}</p>

    {/* Hover arrow */}
    <div className="absolute bottom-4 right-4 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300">
      →
    </div>
  </div>
);

// Add shimmer animation to tailwind.config.js
// keyframes: {
//   'shimmer': {
//     '0%': { backgroundPosition: '-1000px 0' },
//     '100%': { backgroundPosition: '1000px 0' },
//   },
// },
// animation: {
//   'shimmer': 'shimmer 2s infinite',
// },
