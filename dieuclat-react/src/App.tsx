import { useState } from 'react';
import { Product } from './hooks/useAppState';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useToast } from './hooks/useToast';
import { useScrollReveal } from './hooks/useScrollReveal';
import Header from './components/Header';
import HeroEnhanced from './components/HeroEnhanced';
import FeaturedCategories from './components/FeaturedCategories';
import BestSellers from './components/BestSellers';
import AllProducts from './components/AllProducts';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import ProductDetail from './components/ProductDetail';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import Wishlist from './components/Wishlist';
import BackToTop from './components/BackToTop';
import ChatWidget from './components/ChatWidget';
import { ToastContainer } from './components/ToastContainer';
import { useCart, useModal, useScrollEffects, useWishlist, useRecentlyViewed, products } from './hooks/useAppState';
import { NotificationContainer } from './components/NotificationContainer';

function AppContent() {
  const cartState = useCart();
  const modalState = useModal();
  const scrollState = useScrollEffects();
  const wishlistState = useWishlist();
  const recentlyViewedState = useRecentlyViewed();
  const { authState } = useAuth();
  const { toasts, show, remove } = useToast();

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const heroRef = useScrollReveal();
  const categoriesRef = useScrollReveal({ delay: 80 });
  const bestSellersRef = useScrollReveal({ delay: 120 });
  const allProductsRef = useScrollReveal({ delay: 160 });
  const testimonialsRef = useScrollReveal({ delay: 200 });
  const faqRef = useScrollReveal({ delay: 240 });
  const newsletterRef = useScrollReveal({ delay: 280 });

  const handleAddToCart = (productId: number) => {
    cartState.addToCart(productId);
    const product = products.find(item => item.id === productId);
    show(product ? `${product.name} added to cart` : 'Added to cart', 'success', 2500);
  };

  const handleToggleWishlist = (productId: number) => {
    const wasInWishlist = wishlistState.isInWishlist(productId);
    wishlistState.toggleWishlist(productId);
    const product = products.find(item => item.id === productId);
    if (wasInWishlist) {
      show(product ? `${product.name} removed from wishlist` : 'Removed from wishlist', 'warning', 2200);
    } else {
      show(product ? `${product.name} added to wishlist` : 'Added to wishlist', 'success', 2200);
    }
  };

  // Show wishlist
  if (showWishlist) {
    return (
      <Wishlist
        onBackToShop={() => setShowWishlist(false)}
        onProductClick={(productId) => {
          const product = products.find(p => p.id === productId);
          if (product) {
            setCurrentProduct(product);
            setShowWishlist(false);
          }
        }}
      />
    );
  }

  // Show admin panel (only for admin users)
  if (showAdmin && authState.isAuthenticated && authState.user?.email === 'admin@dieuclat.com') {
    return (
      <AdminPanel onBackToShop={() => setShowAdmin(false)} />
    );
  }
  if (cartState.currentView === 'checkout' && !authState.isAuthenticated && !authState.isLoading) {
    return (
      <Auth onAuthSuccess={() => setShowAuth(false)} />
    );
  }

  // Show auth modal when requested
  if (showAuth) {
    return (
      <Auth onAuthSuccess={() => setShowAuth(false)} />
    );
  }

  // Render different views based on current state
  if (cartState.currentView === 'checkout') {
    return (
      <Checkout
        cart={cartState.cart}
        total={cartState.getCartTotal()}
        onBackToCart={cartState.continueShopping}
        onOrderComplete={cartState.placeOrder}
      />
    );
  }

  if (cartState.currentView === 'confirmation' && cartState.currentOrder) {
    return (
      <OrderConfirmation
        order={cartState.currentOrder}
        onContinueShopping={cartState.continueShopping}
      />
    );
  }

  if (currentProduct) {
    return (
      <ProductDetail
        product={currentProduct}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={modalState.openQuickViewModal}
        isInWishlist={wishlistState.isInWishlist}
        onBack={() => setCurrentProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={cartState.getCartItemCount()}
        onSearchClick={modalState.openSearchModal}
        onCartClick={modalState.openCartSidebar}
        onAuthClick={() => setShowAuth(true)}
        onAdminClick={() => setShowAdmin(true)}
        onWishlistClick={() => setShowWishlist(true)}
        user={authState.user}
      />
      <main>
        <div ref={heroRef} className="opacity-0">
          <HeroEnhanced />
        </div>
        <div ref={categoriesRef} className="opacity-0" id="occasions">
          <FeaturedCategories />
        </div>
        <div ref={bestSellersRef} className="opacity-0" id="shop">
          <BestSellers
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={modalState.openQuickViewModal}
            onProductClick={setCurrentProduct}
            isInWishlist={wishlistState.isInWishlist}
          />
        </div>
        <div ref={allProductsRef} className="opacity-0" id="all-products">
          <AllProducts
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={modalState.openQuickViewModal}
            onProductClick={setCurrentProduct}
            isInWishlist={wishlistState.isInWishlist}
          />
        </div>
        <div ref={testimonialsRef} className="opacity-0" id="about">
          <Testimonials />
        </div>
        <div ref={faqRef} className="opacity-0">
          <FAQ />
        </div>
        <div ref={newsletterRef} className="opacity-0">
          <Newsletter />
        </div>
      </main>
      <Footer />

      {/* Modals and Widgets */}
      <CartSidebar
        isOpen={modalState.isCartSidebarOpen}
        onClose={modalState.closeCartSidebar}
        cart={cartState.cart}
        onRemoveFromCart={cartState.removeFromCart}
        onUpdateQuantity={cartState.updateQuantity}
        onCheckout={cartState.checkout}
        total={cartState.getCartTotal()}
      />
      <SearchModal
        isOpen={modalState.isSearchModalOpen}
        onClose={modalState.closeSearchModal}
        onAddToCart={handleAddToCart}
        onQuickView={modalState.openQuickViewModal}
      />
      <QuickViewModal
        isOpen={modalState.isQuickViewModalOpen}
        onClose={modalState.closeQuickViewModal}
        product={modalState.quickViewProduct}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={wishlistState.isInWishlist}
        onAddToRecentlyViewed={recentlyViewedState.addToRecentlyViewed}
      />
      <BackToTop
        isVisible={scrollState.isVisible}
        onClick={scrollState.scrollToTop}
      />
      <ChatWidget />

      {/* Notifications */}
      <NotificationContainer notifications={cartState.notifications} />
      <ToastContainer toasts={toasts} onRemove={remove} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;