import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-t border-amber-200">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Stay in the Loop</h3>
          <p className="text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Get exclusive access to new arrivals, special offers, and personalized gift recommendations delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none text-gray-900 text-base"
              />
              <button className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-200 shadow-lg text-base">
                Subscribe
              </button>
            </div>
            <p className="text-amber-200 text-sm mt-3">Join 12,000+ happy subscribers</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/8.png" alt="Dieuclat Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-amber-900">Dieuclat</span>
            </div>
            <p className="text-amber-700 mb-6 leading-relaxed">
              Crafting extraordinary moments through thoughtful, premium gifts.
              Every selection is carefully curated to create lasting memories.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-amber-200 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 text-amber-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-amber-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-amber-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 bg-amber-200 hover:bg-red-600 text-amber-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 bg-amber-200 hover:bg-blue-500 text-amber-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-amber-900">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#shop" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">All Gifts</a></li>
              <li><a href="#occasions" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Shop by Occasion</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Best Sellers</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">New Arrivals</a></li>
              <li><a href="#corporate" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Corporate Gifting</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-amber-900">Customer Care</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Shipping & Returns</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Track Order</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">Gift Wrapping</a></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-amber-900">About & Support</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-amber-700 hover:text-amber-600 transition-colors duration-200">About Dieuclat</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-sm text-amber-700 text-center md:text-left">
              <p className="text-xs sm:text-sm font-medium">Made with ❤️ for gifting excellence by SPARSH.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-amber-700">
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Secure Payments</span>
              </div>
              <div className="flex gap-2 justify-center">
                <div className="w-6 sm:w-8 h-4 sm:h-5 bg-amber-200 rounded flex items-center justify-center text-xs font-bold text-amber-800">VISA</div>
                <div className="w-6 sm:w-8 h-4 sm:h-5 bg-amber-200 rounded flex items-center justify-center text-xs font-bold text-amber-800">MC</div>
                <div className="w-6 sm:w-8 h-4 sm:h-5 bg-amber-200 rounded flex items-center justify-center text-xs font-bold text-amber-800">AMEX</div>
                <div className="w-6 sm:w-8 h-4 sm:h-5 bg-amber-200 rounded flex items-center justify-center text-xs font-bold text-amber-800">PP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;