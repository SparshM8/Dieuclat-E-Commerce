import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, Package, Settings, LogOut } from 'lucide-react';
import { User as UserType, useAuth } from '../hooks/useAuth';

interface HeaderProps {
  cartItemCount: number;
  onSearchClick: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  onAdminClick?: () => void;
  onWishlistClick?: () => void;
  user: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onSearchClick, onCartClick, onAuthClick, onAdminClick, onWishlistClick, user }) => {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.account-dropdown')) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Free shipping on orders $100+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              <span>Premium gift wrapping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100/50' : 'bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20 relative">
            {/* Logo with enhanced hover effect */}
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="flex items-center text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                <img
                  src="/8.png"
                  alt="Dieuclat Logo"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Navigation with enhanced hover effects - Centered */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 absolute left-1/2 transform -translate-x-1/2 z-10">
              <a href="#shop" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 py-2 group whitespace-nowrap text-sm xl:text-base">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#occasions" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 py-2 group whitespace-nowrap text-sm xl:text-base">
                Occasions
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#all-products" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 py-2 group whitespace-nowrap text-sm xl:text-base">
                All Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 py-2 group whitespace-nowrap text-sm xl:text-base">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>z
              <a href="#contact" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 py-2 group whitespace-nowrap text-sm xl:text-base">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Right Side Actions with enhanced touch targets */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
              {/* Search Button */}
              <button
                onClick={onSearchClick}
                className="p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Dropdown with enhanced mobile experience */}
              <div className="relative account-dropdown">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center gap-2 p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>

                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100/50 backdrop-blur-sm py-3 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    {user ? (
                      // Authenticated user dropdown
                      <>
                        <div className="px-5 py-4 border-b border-gray-100/50">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onWishlistClick && onWishlistClick();
                            setIsAccountDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1 w-full text-left"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Wishlist</span>
                        </button>

                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1">
                          <Package className="w-4 h-4" />
                          <span>Order History</span>
                        </a>

                        {onAdminClick && user?.email === 'admin@dieuclat.com' && (
                          <button
                            onClick={() => {
                              onAdminClick();
                              setIsAccountDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1 w-full text-left"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </button>
                        )}

                        <div className="border-t border-gray-100/50 mt-3 pt-3">
                          <button
                            onClick={logout}
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg mx-2 my-1 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      // Unauthenticated user dropdown
                      <>
                        <div className="px-5 py-4 border-b border-gray-100/50">
                          <p className="text-sm font-semibold text-gray-900">Welcome to Dieuclat</p>
                          <p className="text-xs text-gray-500 mt-1">Sign in for a personalized experience</p>
                        </div>

                        <button
                          onClick={() => {
                            onAuthClick();
                            setIsAccountDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1 w-full text-left"
                        >
                          <User className="w-4 h-4" />
                          <span>Sign In / Register</span>
                        </button>

                        <button
                          onClick={() => {
                            onWishlistClick && onWishlistClick();
                            setIsAccountDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1 w-full text-left"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Wishlist</span>
                        </button>

                        <a href="#" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-lg mx-2 my-1">
                          <Package className="w-4 h-4" />
                          <span>Order History</span>
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>

              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <Menu className="w-5 h-5" />
                  </span>
                  <span className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                    <X className="w-5 h-5" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100/50 shadow-xl overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#shop" className="text-gray-700 hover:text-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 active:bg-purple-100 touch-manipulation">Occasions</a>
              <a href="#occasions" className="text-gray-700 hover:text-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 active:bg-purple-100 touch-manipulation">Shop</a>
              <a href="#all-products" className="text-gray-700 hover:text-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 active:bg-purple-100 touch-manipulation">All Products</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 active:bg-purple-100 touch-manipulation">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 active:bg-purple-100 touch-manipulation">Contact</a>
            </nav>

            {/* Mobile Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100/50">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onSearchClick}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px]"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Search</span>
                </button>
                <button
                  onClick={onCartClick}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation relative min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm font-medium">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;