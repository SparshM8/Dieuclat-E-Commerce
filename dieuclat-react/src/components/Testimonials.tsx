import React from 'react';
import { Star } from 'lucide-react';
import { SectionHeader, Badge } from './UIComponents';
import { GlassMorphismCard } from './PremiumUIComponents';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah J.',
      text: 'The most beautiful gift box I\'ve ever received! The quality was incredible.',
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: 'Michael B.',
      text: 'My clients were so impressed. Dieuclat is my new go-to for corporate gifting.',
      rating: 5,
      verified: false
    },
    {
      id: 3,
      name: 'Emily L.',
      text: 'Customer service was amazing. They helped me build the perfect anniversary gift.',
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Reviews"
          description="Trusted by thousands of happy customers"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <GlassMorphismCard key={testimonial.id} className="bg-white/70">
              <div className="flex items-center justify-center gap-2 mb-4 text-brand-gold">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 text-center">"{testimonial.text}"</p>
              <div className="text-center space-y-2">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <Badge variant={testimonial.verified ? 'success' : 'secondary'} size="sm">
                  {testimonial.verified ? 'Verified Buyer' : 'Business Owner'}
                </Badge>
              </div>
            </GlassMorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;