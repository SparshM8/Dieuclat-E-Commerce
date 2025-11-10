import React from 'react';
import { Star } from 'lucide-react';

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
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p className="text-center text-gray-700 mb-12">Trusted by thousands of happy customers</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg card-hover">
              <div className="flex justify-center mb-4 text-brand-gold">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 text-center">"{testimonial.text}"</p>
              <div className="text-center">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.verified ? 'Verified Buyer' : 'Business Owner'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;