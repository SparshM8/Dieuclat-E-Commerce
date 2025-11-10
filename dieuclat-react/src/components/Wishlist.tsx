import React from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useWishlist, useCart } from '../hooks/useAppState';

interface WishlistProps {
  onBackToShop: () => void;
  onProductClick: (productId: number) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ onBackToShop, onProductClick }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Optional: remove from wishlist after adding to cart
    // toggleWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <button
            onClick={onBackToShop}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={`/${product.imageText}`}
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => onProductClick(product.id)}
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="p-4">
                  <h3
                    className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-purple-600 transition-colors line-clamp-2"
                    onClick={() => onProductClick(product.id)}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-purple-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist!</p>
            <button
              onClick={onBackToShop}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;