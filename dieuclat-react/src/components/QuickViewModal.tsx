import React from 'react';
import { X, ShoppingBag, Heart, Gift, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../hooks/useAppState';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  onAddToRecentlyViewed: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onAddToRecentlyViewed
}) => {
  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product.id);
    onAddToRecentlyViewed(product);
    onClose();
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Close quick view">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square mb-4">
                <img
                  src={`/${product.imageText}`}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h2>
              <p className="text-2xl font-bold text-purple-600 mb-4">${product.price.toFixed(2)}</p>

              {product.inStock ? (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </div>
              )}

              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-purple-600" />
                  <span>Premium gift wrapping included</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span>30-day return policy</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg border-2 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;