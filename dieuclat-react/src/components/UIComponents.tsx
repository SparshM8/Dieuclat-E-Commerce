import React from 'react';

interface PremiumSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Wrapper component for premium sections with built-in animation
 */
export const PremiumSection: React.FC<PremiumSectionProps> = ({ children, className = '', id }) => {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`} id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Reusable section header component
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <p className="text-sm sm:text-base font-bold text-purple-600 uppercase tracking-wider mb-3 sm:mb-4">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className={`text-lg sm:text-xl text-gray-600 max-w-2xl ${centered ? 'mx-auto' : 'mx-0'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card with gradient border effect
 */
export const GradientBorder: React.FC<GradientBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
      <div className="relative bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
};

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Content container with responsive padding
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = 'lg'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};

interface DividerProps {
  color?: 'gray' | 'purple' | 'gradient';
  className?: string;
}

/**
 * Animated divider component
 */
export const Divider: React.FC<DividerProps> = ({ color = 'gray', className = '' }) => {
  const colorClasses = {
    gray: 'bg-gray-200',
    purple: 'bg-purple-600',
    gradient: 'bg-gradient-to-r from-transparent via-purple-600 to-transparent'
  };

  return (
    <div className={`h-px ${colorClasses[color]} ${className}`}></div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Reusable badge component
 */
export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-purple-100 text-purple-700 border border-purple-200',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    danger: 'bg-red-100 text-red-700 border border-red-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full font-semibold inline-block ${className}`}>
      {children}
    </span>
  );
};
