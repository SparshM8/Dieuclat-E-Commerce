import React from 'react';
import { Star, Users } from 'lucide-react';
import { ReviewStats } from '../hooks/useAppState';

interface ReviewStatsProps {
  stats: ReviewStats;
}

const ReviewStatsComponent: React.FC<ReviewStatsProps> = ({ stats }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getPercentage = (count: number) => {
    return stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            {renderStars(Math.round(stats.averageRating))}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{stats.totalReviews} reviews</span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
            const percentage = getPercentage(count);

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-sm text-gray-600 text-right">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating Summary */}
      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalReviews}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {getPercentage(stats.ratingDistribution[4] + stats.ratingDistribution[5])}%
            </div>
            <div className="text-sm text-gray-600">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.averageRating >= 4 ? 'Excellent' :
               stats.averageRating >= 3 ? 'Good' :
               stats.averageRating >= 2 ? 'Average' : 'Poor'}
            </div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {stats.ratingDistribution[5]}
            </div>
            <div className="text-sm text-gray-600">5-Star</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStatsComponent;