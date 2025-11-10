import React, { useState, useMemo } from 'react';
import { Star, Heart, Eye, ShoppingBag, Filter, X, Search } from 'lucide-react';
import { Product } from '../hooks/useAppState';

interface AllProductsProps {
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onQuickView: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

const AllProducts: React.FC<AllProductsProps> = ({
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onProductClick,
  isInWishlist
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get all products data
  const allProducts = [
    {
      id: 5,
      name: 'Luxury Candle Collection',
      price: 75.00,
      color: '#8B5A3C',
      imageText: 'Luxury Candle Collection.jpeg',
      category: 'home-decor',
      description: 'A sophisticated collection of hand-poured candles with premium fragrances.',
      inStock: true
    },
    {
      id: 6,
      name: 'Artisan Coffee Set',
      price: 95.00,
      color: '#6B4423',
      imageText: 'Artisan Coffee Set.jpeg',
      category: 'food-beverage',
      description: 'Premium coffee beans from around the world with a beautiful brewing set.',
      inStock: true
    },
    {
      id: 7,
      name: 'Silk Scarf Collection',
      price: 120.00,
      color: '#E6B8A2',
      imageText: 'Silk Scarf Collection.jpeg',
      category: 'fashion',
      description: 'Luxurious silk scarves in various patterns and colors for the discerning fashionista.',
      inStock: true
    },
    {
      id: 8,
      name: 'Crystal Vase Set',
      price: 150.00,
      color: '#D4AF37',
      imageText: 'Crystal Vase Set.jpeg',
      category: 'home-decor',
      description: 'Elegant crystal vases that add sophistication to any space.',
      inStock: true
    },
    {
      id: 9,
      name: 'Gourmet Chocolate Box',
      price: 65.00,
      color: '#8B4513',
      imageText: 'Gourmet Chocolate Box.jpeg',
      category: 'food-beverage',
      description: 'Handcrafted chocolates with exotic fillings and premium ingredients.',
      inStock: true
    },
    {
      id: 10,
      name: 'Leather Journal Set',
      price: 85.00,
      color: '#654321',
      imageText: 'Leather Journal Set.jpeg',
      category: 'stationery',
      description: 'High-quality leather-bound journals perfect for writing and reflection.',
      inStock: true
    },
    {
      id: 11,
      name: 'Essential Oil Diffuser',
      price: 110.00,
      color: '#98FB98',
      imageText: 'Essential Oil Diffuser.jpeg',
      category: 'wellness',
      description: 'Modern ultrasonic diffuser with LED lighting and timer functions.',
      inStock: true
    },
    {
      id: 12,
      name: 'Designer Handbag',
      price: 250.00,
      color: '#FF69B4',
      imageText: 'Designer Handbag.jpeg',
      category: 'fashion',
      description: 'Elegant designer handbag crafted from premium materials.',
      inStock: true
    },
    {
      id: 13,
      name: 'Wine Tasting Set',
      price: 180.00,
      color: '#722F37',
      imageText: 'Wine Tasting Set.jpeg',
      category: 'food-beverage',
      description: 'Complete wine tasting set with glasses, aerator, and preservation tools.',
      inStock: true
    },
    {
      id: 14,
      name: 'Meditation Cushion',
      price: 70.00,
      color: '#F5DEB3',
      imageText: 'Meditation Cushion.jpeg',
      category: 'wellness',
      description: 'Comfortable meditation cushion filled with natural buckwheat hulls.',
      inStock: true
    },
    {
      id: 15,
      name: 'Perfume Collection',
      price: 135.00,
      color: '#DDA0DD',
      imageText: 'Perfume Collection.jpeg',
      category: 'beauty',
      description: 'A curated selection of luxury perfumes from renowned fragrance houses.',
      inStock: true
    },
    {
      id: 16,
      name: 'Desk Organizer Set',
      price: 55.00,
      color: '#A0522D',
      imageText: 'Desk Organizer Set.jpeg',
      category: 'stationery',
      description: 'Elegant desk organizer with compartments for pens, notes, and accessories.',
      inStock: true
    }
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map(product => product.category))];
    return ['all', ...cats];
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // For demo, reverse the array (newest first)
        filtered.reverse();
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">All Products</h2>
            <p className="text-gray-700">Discover our complete collection</p>
          </div>
          <div className="hidden md:flex gap-4">
            <label htmlFor="sortSelectAll" className="sr-only">Sort products</label>
            <select
              id="sortSelectAll"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              title="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters && <X className="w-4 h-4" />}
              </button>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    title="Filter by category"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="0"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="0"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceRange([0, 300]);
                      setSortBy('featured');
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 border border-gray-100/50 hover:border-purple-200/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 fade-in-up"
              data-stagger={`${index}`}
            >
              {/* Image Container with Enhanced Zoom */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 image-zoom group/image">
                <a href="#" onClick={(e) => { e.preventDefault(); onProductClick(product); }} className="block">
                  <img
                    src={`/${product.imageText}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/gift.jpeg';
                    }}
                    loading="lazy"
                  />
                  {/* Enhanced overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                {/* Enhanced Luxury Badge with pulse animation */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-amber-300/50 transform transition-all duration-300 group-hover:scale-105 animate-pulse">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-ping"></span>
                    Premium
                  </span>
                </div>

                {/* Enhanced Wishlist Button with better animation */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 hover:scale-110 border border-white/20 hover:border-red-200"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart className={`w-5 h-5 transition-all duration-200 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500 scale-110 animate-pulse' : 'text-gray-600 hover:text-red-500'}`} />
                </button>

                {/* Enhanced Quick View Button */}
                <button
                  onClick={() => onQuickView(product)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 hover:scale-110 border border-white/20 hover:border-purple-200"
                  aria-label={`Quick view ${product.name}`}
                >
                  <Eye className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors duration-200" />
                </button>

                {/* Enhanced Sale Badge with better animation */}
                <div className="absolute top-4 right-16 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 hover:scale-105">
                  <span className="flex items-center gap-1">
                    <span>25% OFF</span>
                    <span className="text-xs animate-bounce">🔥</span>
                  </span>
                </div>

                {/* Enhanced Stock Indicator with availability count */}
                {product.inStock && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-green-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="font-semibold">In Stock</span>
                  </div>
                )}

                {/* Color Swatch for products with colors */}
                {product.color && (
                  <div className="absolute bottom-16 left-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: product.color }}
                      title={`Color: ${product.color}`}
                    ></div>
                  </div>
                )}
              </div>

              {/* Enhanced Content Section */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-purple-500 via-transparent to-pink-500"></div>

                {/* Category with enhanced styling */}
                <div className="relative z-10 text-xs font-bold text-gradient uppercase tracking-wider mb-3 transform transition-all duration-300 group-hover:scale-105">
                  {product.category.replace('-', ' ')}
                </div>

                {/* Title with improved hover effect */}
                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors duration-300">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                    className="hover:text-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-sm"
                    aria-label={`View details for ${product.name}`}
                  >
                    {product.name}
                  </a>
                </h3>

                {/* Enhanced Rating with interactive stars */}
                <div className="relative z-10 flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-200 hover:scale-110 hover:fill-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">4.8</span>
                  <span className="text-xs text-gray-500">(127 reviews)</span>
                  <button
                    className="ml-auto text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-sm"
                    aria-label="Read reviews"
                  >
                    Read reviews
                  </button>
                </div>

                {/* Enhanced Price Section with better layout */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through group-hover:text-gray-500 transition-colors duration-300">
                      ${(product.price * 1.33).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-3 py-1.5 rounded-full self-start sm:self-center shadow-sm">
                    <span className="text-xs font-bold text-green-700">
                      Save ${(product.price * 0.33).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Add to Cart Button with loading state */}
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="relative z-10 w-full bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 hover:from-purple-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3 group/btn overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  disabled={!product.inStock}
                  aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <ShoppingBag className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover/btn:scale-110" />
                  <span className="relative z-10">
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </span>
                  {product.inStock && (
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;