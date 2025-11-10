import React, { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, ArrowLeft, MessageSquare } from 'lucide-react';
import { Product, useReviews } from '../hooks/useAppState';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import ReviewStats from './ReviewStats';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onQuickView: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isInWishlist,
  onBack
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { addReview, getProductReviews, getProductReviewStats, markReviewHelpful } = useReviews();

  // Mock additional product data
  const productImages = [
    `/${product.imageText}`,
    `/${product.imageText}`,
    `/${product.imageText}`
  ];

  const relatedProducts = [
    { id: 4, name: 'Elegant Candle Set', price: 45.00, image: '/Aura Candle.jpeg', color: '#8B5A3C', imageText: 'Aura Candle.jpeg', category: 'home-decor', description: 'Hand-poured luxury candle', inStock: true },
    { id: 5, name: 'Luxury Notebook', price: 28.00, image: '/Leather Journal Set.jpeg', color: '#654321', imageText: 'Leather Journal Set.jpeg', category: 'stationery', description: 'Premium leather notebook', inStock: true },
    { id: 6, name: 'Crystal Vase', price: 65.00, image: '/Crystal Vase Set.jpeg', color: '#D4AF37', imageText: 'Crystal Vase Set.jpeg', category: 'home-decor', description: 'Elegant crystal vase', inStock: true }
  ];

  const productReviews = getProductReviews(product.id.toString());
  const reviewStats = getProductReviewStats(product.id.toString());

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product.id);
    }
  };

  const handleAddReview = (reviewData: any) => {
    addReview(reviewData);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/600x600/${product.color.replace('#', '')}/ffffff?text=${product.name.charAt(0)}`;
                }}
              />
            </div>
            <div className="flex gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/80x80/${product.color.replace('#', '')}/ffffff?text=${product.name.charAt(0)}`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-2">
                {product.category.replace('-', ' ')}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • 127 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.33).toFixed(2)}
                </span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Save ${(product.price * 0.33).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    title="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  title="Add to Cart"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                    isInWishlist(product.id) ? 'text-red-500 border-red-300' : 'text-gray-600'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600" title="Share Product">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">Orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Secure Payment</div>
                  <div className="text-sm text-gray-600">SSL Protected</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">Easy Returns</div>
                  <div className="text-sm text-gray-600">30-day policy</div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Handcrafted with care</li>
                  <li>• Perfect for gifting</li>
                  <li>• Eco-friendly packaging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
            >
              Write a Review
            </button>
          </div>

          {/* Review Stats */}
          <ReviewStats stats={reviewStats} />

          {/* Review Form */}
          {showReviewForm && (
            <div className="mt-8">
              <ReviewForm
                productId={product.id.toString()}
                onSubmit={handleAddReview}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* Reviews List */}
          <div className="mt-8 space-y-6">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  onMarkHelpful={markReviewHelpful}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="group bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onQuickView(relatedProduct as Product)}
              >
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/300x300/cccccc/666666?text=${relatedProduct.name.charAt(0)}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;