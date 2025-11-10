import React, { useState } from 'react';
import { Star, Upload, X } from 'lucide-react';
import { Review } from '../hooks/useAppState';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length <= 5) {
      setImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0 || !title.trim() || !comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would upload images to a server and get URLs back
    const imageUrls = images.map(() => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop');

    const reviewData: Omit<Review, 'id' | 'createdAt'> = {
      userId: 'current-user', // In a real app, get from auth context
      userName: 'You', // In a real app, get from auth context
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', // In a real app, get from auth context
      productId,
      rating,
      title: title.trim(),
      comment: comment.trim(),
      images: imageUrls,
      verified: true, // In a real app, check if user purchased the product
      helpful: 0
    };

    onSubmit(reviewData);

    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
    setImages([]);
    setIsSubmitting(false);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const starRating = i + 1;
      return (
        <button
          key={i}
          type="button"
          className="focus:outline-none"
          onClick={() => handleRatingClick(starRating)}
          onMouseEnter={() => setHoverRating(starRating)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={`w-6 h-6 transition-colors duration-150 ${
              starRating <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={100}
            required
          />
          <div className="text-xs text-gray-500 mt-1">{title.length}/100 characters</div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            maxLength={1000}
            required
          />
          <div className="text-xs text-gray-500 mt-1">{comment.length}/1000 characters</div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos (Optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  title="Upload review images"
                  aria-label="Upload review images"
                />
                <Upload className="w-6 h-6 text-gray-400" />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Upload up to 5 photos. Max file size: 5MB each.
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={rating === 0 || !title.trim() || !comment.trim() || isSubmitting}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;