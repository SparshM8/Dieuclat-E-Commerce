import React from 'react';
import { usePromotions } from '../hooks/useAppState';
import { Crown, Star, Gift, TrendingUp } from 'lucide-react';

interface LoyaltyProgramProps {
  userPoints?: number;
  userTier?: string;
  className?: string;
}

export const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({
  userPoints = 500, // Demo points
  userTier,
  className = ''
}) => {
  const { loyaltyProgram, getUserTier } = usePromotions();

  const currentTier = userTier ? loyaltyProgram.tiers.find(t => t.id === userTier) : getUserTier(userPoints);
  const nextTier = loyaltyProgram.tiers.find(t => t.minPoints > userPoints);

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'bronze':
        return <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center"><Crown className="w-5 h-5 text-amber-600" /></div>;
      case 'silver':
        return <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><Star className="w-5 h-5 text-gray-600" /></div>;
      case 'gold':
        return <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"><Crown className="w-5 h-5 text-yellow-600" /></div>;
      case 'platinum':
        return <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"><Crown className="w-5 h-5 text-purple-600" /></div>;
      default:
        return <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><Star className="w-5 h-5 text-gray-600" /></div>;
    }
  };

  const getTierColor = (tierId: string) => {
    switch (tierId) {
      case 'bronze':
        return 'border-amber-200 bg-amber-50';
      case 'silver':
        return 'border-gray-200 bg-gray-50';
      case 'gold':
        return 'border-yellow-200 bg-yellow-50';
      case 'platinum':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getProgressToNextTier = () => {
    if (!nextTier) return 100; // Max tier reached

    const currentTierMin = currentTier?.minPoints || 0;
    const progress = ((userPoints - currentTierMin) / (nextTier.minPoints - currentTierMin)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Gift className="w-6 h-6 text-purple-600" />
          {loyaltyProgram.name}
        </h2>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{userPoints.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Points Earned</p>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{loyaltyProgram.description}</p>

      {/* Current Tier */}
      <div className={`p-4 rounded-lg border-2 mb-6 ${getTierColor(currentTier?.id || 'bronze')}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getTierIcon(currentTier?.id || 'bronze')}
            <div>
              <h3 className="font-semibold text-gray-900">{currentTier?.name} Member</h3>
              <p className="text-sm text-gray-600">
                {currentTier?.benefits.discountPercentage}% discount on all purchases
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Current Tier</p>
            <div className="flex items-center gap-1">
              {currentTier?.benefits.freeShipping && (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Free Shipping
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      {nextTier && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Progress to {nextTier.name}</h4>
            <span className="text-sm text-gray-600">
              {userPoints} / {nextTier.minPoints} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressToNextTier()}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {nextTier.minPoints - userPoints} more points to reach {nextTier.name} tier
          </p>
        </div>
      )}

      {/* All Tiers */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 mb-3">All Membership Tiers</h4>
        {loyaltyProgram.tiers.map((tier) => (
          <div
            key={tier.id}
            className={`p-3 rounded-lg border ${
              tier.id === currentTier?.id
                ? getTierColor(tier.id) + ' border-2'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTierIcon(tier.id)}
                <div>
                  <h5 className="font-medium text-gray-900">{tier.name}</h5>
                  <p className="text-sm text-gray-600">
                    {tier.minPoints.toLocaleString()} points required
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {tier.benefits.discountPercentage}% off
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {tier.benefits.freeShipping && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Free Shipping
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {tier.benefits.bonusPointsMultiplier}x points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Earn Points */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          How to Earn Points
        </h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Earn {loyaltyProgram.pointsPerDollar} point per $1 spent</li>
          <li>• Points never expire</li>
          <li>• Higher tiers earn bonus multiplier points</li>
          <li>• Exclusive discounts and free shipping at higher tiers</li>
        </ul>
      </div>
    </div>
  );
};

// Compact version for use in other components
export const LoyaltyStatus: React.FC<{ userPoints?: number; compact?: boolean }> = ({
  userPoints = 500,
  compact = false
}) => {
  const { getUserTier } = usePromotions();
  const currentTier = getUserTier(userPoints);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {getTierIcon(currentTier.id)}
        <div>
          <p className="text-sm font-medium text-gray-900">{currentTier.name}</p>
          <p className="text-xs text-gray-600">{userPoints} points</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getTierIcon(currentTier.id)}
          <div>
            <p className="font-medium text-gray-900">{currentTier.name} Member</p>
            <p className="text-sm text-gray-600">{userPoints} points</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {currentTier.benefits.discountPercentage}% off
          </p>
          {currentTier.benefits.freeShipping && (
            <p className="text-xs text-green-600">Free Shipping</p>
          )}
        </div>
      </div>
    </div>
  );
};

const getTierIcon = (tierId: string) => {
  switch (tierId) {
    case 'bronze':
      return <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center"><Crown className="w-4 h-4 text-amber-600" /></div>;
    case 'silver':
      return <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"><Star className="w-4 h-4 text-gray-600" /></div>;
    case 'gold':
      return <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center"><Crown className="w-4 h-4 text-yellow-600" /></div>;
    case 'platinum':
      return <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center"><Crown className="w-4 h-4 text-purple-600" /></div>;
    default:
      return <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"><Star className="w-4 h-4 text-gray-600" /></div>;
  }
};