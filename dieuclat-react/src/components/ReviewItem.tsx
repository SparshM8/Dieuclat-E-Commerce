import React, { useState } from 'react';
import { Star, ThumbsUp, User, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Review } from '../hooks/useAppState';

interface ReviewItemProps {
  review: Review;
  onMarkHelpful: (reviewId: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onMarkHelpful }) => {
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMarkHelpful = () => {
    if (!hasMarkedHelpful) {
      onMarkHelpful(review.id);
      setHasMarkedHelpful(true);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const commentPreview = review.comment.length > 200 ? review.comment.substring(0, 200) + '...' : review.comment;

  return (
    <div className="border-b border-gray-100 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex items-start gap-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            {review.verified && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Verified Purchase</span>
              </div>
            )}
          </div>

          {/* Rating and Date */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
          </div>

          {/* Review Title */}
          <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>

          {/* Review Comment */}
          <div className="text-gray-700 mb-3">
            {showFullComment || review.comment.length <= 200 ? (
              <p className="leading-relaxed">{review.comment}</p>
            ) : (
              <div>
                <p className="leading-relaxed">{commentPreview}</p>
                <button
                  onClick={() => setShowFullComment(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm mt-1"
                >
                  Read more
                </button>
              </div>
            )}
          </div>

          {/* Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {review.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      // In a real app, this would open a modal with the full image
                      console.log('Open image modal:', image);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleMarkHelpful}
              disabled={hasMarkedHelpful}
              className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                hasMarkedHelpful
                  ? 'text-green-600 cursor-default'
                  : 'text-gray-500 hover:text-purple-600 cursor-pointer'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${hasMarkedHelpful ? 'fill-current' : ''}`} />
              <span>Helpful ({review.helpful + (hasMarkedHelpful ? 1 : 0)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;