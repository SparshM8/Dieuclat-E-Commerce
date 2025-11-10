import React from 'react';
import { ShoppingBag, Sparkles, Heart, ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="maincontent" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm60 60c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-2xl animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-36 h-36 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse opacity-50 [animation-delay:2s]"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-amber-200/35 to-orange-200/35 rounded-full blur-2xl animate-pulse opacity-55 [animation-delay:4s]"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-200/45 to-teal-200/45 rounded-full blur-xl animate-pulse opacity-40 [animation-delay:1.5s]"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-gradient-to-br from-violet-200/35 to-purple-200/35 rounded-full blur-2xl animate-pulse opacity-45 [animation-delay:3.5s]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Enhanced Content Section */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Premium Badge with Animation */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/60 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-amber-800 mb-6 sm:mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="relative">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 animate-pulse" />
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-xs sm:text-sm">Premium Luxury Gifting</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            </div>

            {/* Enhanced Hero Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up">
              <span className="block bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent hover:from-purple-800 hover:via-pink-800 hover:to-purple-800 transition-all duration-500">
                Extraordinary
              </span>
              <span className="block text-gray-800 font-light hover:text-gray-700 transition-colors duration-300">
                Gifts Await
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg leading-relaxed font-light animate-fade-in-up [animation-delay:0.2s] mx-auto lg:mx-0">
              Discover curated collections of premium gifts that create unforgettable moments.
              From elegant essentials to thoughtful surprises, find perfection in every occasion.
            </p>

            {/* Enhanced Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 sm:mb-10 animate-fade-in-up [animation-delay:0.4s]">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm border border-white/50">
                <div className="flex -space-x-1 sm:-space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200"></div>
                  ))}
                </div>
                <span className="text-gray-700 text-sm sm:text-base font-semibold ml-2">12,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm border border-white/50">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform duration-200" />
                  ))}
                </div>
                <span className="text-gray-800 text-sm sm:text-base font-bold ml-1">4.9/5</span>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10 sm:mb-12 animate-fade-in-up [animation-delay:0.6s]">
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                <span className="relative z-10">Explore Collection</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group bg-white/90 backdrop-blur-sm border-2 border-gray-200/80 hover:border-purple-300/80 text-gray-700 hover:text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 hover:bg-white">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
                <span>Gift Finder</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-200" />
              </button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up [animation-delay:0.8s]">
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-green-100/50">
                  <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-800 mb-1">Secure Payment</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">SSL Protected</div>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-blue-100/50">
                  <Truck className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-800 mb-1">Free Shipping</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Orders $100+</div>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-purple-100/50">
                  <Award className="w-5 h-5 sm:w-7 sm:h-7 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-800 mb-1">Premium Quality</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Hand Curated</div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src="/gift.jpeg"
                    alt="Luxury Gift Collection"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Price Tag */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-bold">
                  From $49
                </div>

                {/* Luxury Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                  ✨ Premium Collection
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-rose-200/50 to-pink-200/50 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-200/50 to-indigo-200/50 rounded-full blur-lg"></div>

              {/* Floating Hearts */}
              <div className="absolute top-1/4 -left-8 animate-bounce [animation-delay:1s]">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              </div>
              <div className="absolute bottom-1/4 -right-8 animate-bounce [animation-delay:2s]">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;