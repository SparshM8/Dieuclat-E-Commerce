import React, { useEffect } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { useSearch } from '../hooks/useAppState';
import { Product } from '../hooks/useAppState';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  onQuickView: (product: Product) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onAddToCart, onQuickView }) => {
  const { query, results, search } = useSearch();

  useEffect(() => {
    if (isOpen) {
      // Focus search input when modal opens
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isOpen]);

  const handleSearch = (searchQuery: string) => {
    search(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Search Products</h3>
            <button onClick={onClose} aria-label="Close search">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mb-4">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="searchInput"
              placeholder="Search for gifts..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 && query.length >= 2 ? (
              <p className="text-gray-500 text-center py-8">No products found</p>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      onQuickView(result);
                      onClose();
                    }}
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={`/${result.imageText}`}
                        alt={result.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-lg">{result.name}</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{result.description}</p>
                      <p className="text-purple-600 font-bold">${result.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(result.id);
                        onClose();
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : query.length === 0 ? (
              <div className="text-center py-8">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Start typing to search for products...</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;