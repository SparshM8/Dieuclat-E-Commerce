import React, { useState } from 'react';
import { useNewsletter } from '../hooks/useAppState';
import { Mail, Sparkles, Gift, Users, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const { isLoading, message, messageType, subscribe } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await subscribe(email);
    if (success) {
      setEmail('');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-rose-200/25 to-orange-200/25 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 md:p-12 text-center hover:shadow-3xl hover:shadow-purple-500/10 transition-all duration-500">
          {/* Premium Header */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
            Join Our Exclusive Community
          </h2>

          <p className="text-lg sm:text-xl mb-2 sm:mb-3 text-gray-700 font-medium px-4">
            Subscribe to our newsletter and get 15% off your first order!
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
            Be the first to know about new arrivals, exclusive offers, and the art of gifting.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100/50">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Exclusive Offers</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100/50">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">VIP Access</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100/50">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Early Access</span>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
            <div className="flex-grow relative">
              <label htmlFor="newsletterEmail" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletterEmail"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 placeholder-gray-500 text-base sm:text-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white/90 backdrop-blur-sm"
                required
              />
              <Mail className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[140px] sm:min-w-[160px]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm sm:text-base">Subscribing...</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">Subscribe Now</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Enhanced Message */}
          {message && (
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 animate-fade-in ${
              messageType === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              )}
              {message}
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/50 px-4">
            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Trusted by 12,000+ customers</p>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;