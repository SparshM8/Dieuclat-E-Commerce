import React from 'react';
import { SectionHeader } from './UIComponents';

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Find the Perfect Gift"
          subtitle="Curated Collections"
          description="Explore our curated collections designed for every occasion and recipient"
        />
        <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full mb-16"></div>

        {/* Shop by Occasion */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">Shop by Occasion</h3>
          <p className="text-gray-700 text-center text-lg mb-12">Find the perfect gift, whatever the celebration.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/Birthday.jpeg" alt="Birthday Gifts" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Birthdays</h4>
                  <p className="text-sm opacity-90">Celebrate with joy</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/Aniversary.jpeg" alt="Anniversary Gifts" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Anniversaries</h4>
                  <p className="text-sm opacity-90">Love & romance</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/wedding.jpeg" alt="Wedding Gifts" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Weddings</h4>
                  <p className="text-sm opacity-90">Forever begins</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/Thank you.jpeg" alt="Thank You Gifts" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Thank You</h4>
                  <p className="text-sm opacity-90">Gratitude & appreciation</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Shop by Recipient */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">Shop by Recipient</h3>
          <p className="text-gray-700 text-center text-lg mb-12">Thoughtful gifts for every special person.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/her.png" alt="Gifts for Her" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">For Her</h4>
                  <p className="text-sm opacity-90">Elegance & beauty</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/him.png" alt="Gifts for Him" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">For Him</h4>
                  <p className="text-sm opacity-90">Style & adventure</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/home.jpeg" alt="Gifts for Home" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">For Home</h4>
                  <p className="text-sm opacity-90">Comfort & style</p>
                </div>
              </div>
            </a>
            <a href="#" className="group block overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/40 hover:ring-purple-300/60">
                <img src="/corporate.png" alt="Corporate Gifts" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">Corporate</h4>
                  <p className="text-sm opacity-90">Professional excellence</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;