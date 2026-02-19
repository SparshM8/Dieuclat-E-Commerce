import React, { useEffect, useMemo, useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Product } from '../hooks/useAppState';
import { PremiumProductCard, ProductCardSkeleton } from './PremiumUIComponents';
import { SectionHeader } from './UIComponents';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
          <SectionHeader
            title="All Products"
            subtitle="Collection"
            description="Discover our complete collection"
            centered={false}
            className="mb-0"
          />
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={`all-products-skeleton-${index}`} />
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
                  rating={4.8}
                  badge="Premium"
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

export default AllProducts;