import React, { useEffect, useMemo, useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Product } from '../hooks/useAppState';
import { PremiumProductCard, ProductCardSkeleton } from './PremiumUIComponents';
import { SectionHeader } from './UIComponents';

interface BestSellersProps {
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onQuickView: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

const BestSellers: React.FC<BestSellersProps> = ({
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onProductClick,
  isInWishlist
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Get best sellers from products data
  const bestSellers = [
    {
      id: 1,
      name: 'The Luxe Set',
      price: 120.00,
      color: '#C2D8CA',
      imageText: 'set.jpeg',
      category: 'best-sellers',
      description: 'A luxurious collection of premium items carefully curated for those who appreciate the finer things.',
      inStock: true
    },
    {
      id: 2,
      name: 'Serenity Box',
      price: 85.00,
      color: '#F3B0C1',
      imageText: 'box.jpeg',
      category: 'best-sellers',
      description: 'Find peace and tranquility with this beautifully crafted collection of calming essentials.',
      inStock: true
    },
    {
      id: 3,
      name: 'Gourmet Treats',
      price: 95.00,
      color: '#CCC4E1',
      imageText: 'treat.jpeg',
      category: 'best-sellers',
      description: 'Indulge in a selection of artisan treats and gourmet delicacies.',
      inStock: true
    },
    {
      id: 4,
      name: 'Celebration Kit',
      price: 150.00,
      color: '#FFD88A',
      imageText: 'kit.jpeg',
      category: 'best-sellers',
      description: 'Everything you need to celebrate life\'s special moments in style.',
      inStock: true
    }
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(bestSellers.map(product => product.category))];
    return ['all', ...cats];
  }, [bestSellers]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = bestSellers.filter(product => {
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
  }, [bestSellers, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
          <SectionHeader
            title="Our Best Sellers"
            subtitle="Customer Favorites"
            description="Most loved by our customers"
            centered={false}
            className="mb-0"
          />
          <div className="hidden md:flex gap-4">
            <label htmlFor="sortSelect" className="sr-only">Sort products</label>
            <select
              id="sortSelect"
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
                      setPriceRange([0, 200]);
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={`best-sellers-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PremiumProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={Number((product.price * 1.33).toFixed(2))}
                  image={`/${product.imageText}`}
                  rating={4.9}
                  badge="Best Seller"
                  isWishlisted={isInWishlist(product.id)}
                  onAddToCart={() => onAddToCart(product.id)}
                  onWishlist={() => onToggleWishlist(product.id)}
                  onQuickView={() => onQuickView(product)}
                  onClick={() => onProductClick(product)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;