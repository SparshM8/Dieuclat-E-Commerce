import React from 'react';
import { Promotion } from '../types/index';

interface PromotionBannerProps {
  promotion: Promotion;
  onViewDetails?: () => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({
  promotion,
  onViewDetails
}) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(promotion.endDate);
    const timeDiff = endDate.getTime() - now.getTime();

    if (timeDiff <= 0) return null;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const getBannerStyle = () => {
    switch (promotion.type) {
      case 'flash_sale':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      case 'bundle':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white';
      case 'clearance':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'seasonal':
        return 'bg-gradient-to-r from-green-500 to-teal-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
    }
  };

  const getIcon = () => {
    switch (promotion.type) {
      case 'flash_sale':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        );
      case 'bundle':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'clearance':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className={`${getBannerStyle()} rounded-lg p-4 mb-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h3 className="font-bold text-lg">{promotion.title}</h3>
            <p className="text-sm opacity-90">{promotion.description}</p>
            {promotion.discountType === 'percentage' && (
              <p className="text-sm font-semibold mt-1">
                Up to {promotion.discountValue}% OFF
              </p>
            )}
            {promotion.discountType === 'fixed' && (
              <p className="text-sm font-semibold mt-1">
                ${promotion.discountValue} OFF
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {timeRemaining && (
            <div className="bg-black bg-opacity-20 rounded-full px-3 py-1 text-xs font-medium">
              {timeRemaining}
            </div>
          )}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for displaying multiple promotions
interface PromotionBannersProps {
  promotions: Promotion[];
  onViewDetails?: (promotion: Promotion) => void;
}

export const PromotionBanners: React.FC<PromotionBannersProps> = ({
  promotions,
  onViewDetails
}) => {
  if (promotions.length === 0) return null;

  return (
    <div className="space-y-4">
      {promotions.map((promotion) => (
        <PromotionBanner
          key={promotion.id}
          promotion={promotion}
          onViewDetails={onViewDetails ? () => onViewDetails(promotion) : undefined}
        />
      ))}
    </div>
  );
};