import React from 'react';
import { Sparkles, Gift, HeartHandshake } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-responsive-4xl md:text-responsive-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Choose Dieuclat
          </h2>
          <p className="text-gray-600 text-responsive-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the art of gifting with our premium selection and exceptional service that makes every moment special
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-responsive-1 md:grid-responsive-3 gap-8">
          <div className="card-premium p-8 stagger-1">
            <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <Sparkles className="icon w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Curated Selection</h3>
            <p className="text-gray-600 leading-relaxed">
              Only the most unique and high-quality gifts, hand-picked by our experts for discerning tastes.
            </p>
          </div>

          <div className="card-premium p-8 stagger-2">
            <div className="inline-block p-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl mb-6 shadow-lg">
              <Gift className="icon w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Premium Packaging</h3>
            <p className="text-gray-600 leading-relaxed">
              Every gift is beautifully wrapped with luxury materials to create a memorable unboxing experience.
            </p>
          </div>

          <div className="card-premium p-8 stagger-3">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mb-6 shadow-lg">
              <HeartHandshake className="icon w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Gifting Experts</h3>
            <p className="text-gray-600 leading-relaxed">
              Our team of gifting specialists is here to help you find the perfect gift for any person or occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;