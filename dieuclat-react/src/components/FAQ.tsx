import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useFAQ } from '../hooks/useAppState';
import { SectionHeader } from './UIComponents';
import { GlassMorphismCard } from './PremiumUIComponents';

const FAQ: React.FC = () => {
  const { toggleItem, isOpen } = useFAQ();

  const faqs = [
    {
      id: 1,
      question: 'What is your shipping policy?',
      answer: 'We offer free standard shipping on orders over $100. Orders under $100 ship for $9.99. Express and overnight options are also available.'
    },
    {
      id: 2,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Free return shipping for defective items only.'
    },
    {
      id: 3,
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! All gifts include premium gift wrapping with elegant paper, satin ribbons, and branded packaging at no extra cost.'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.'
    },
    {
      id: 5,
      question: 'How can I contact customer service?',
      answer: 'Email us at hello@dieuclat.com, call (555) 123-4567, or use our live chat. We respond within 24 hours.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Help Center"
          description="Everything you need to know about shopping with Dieuclat"
        />

        <GlassMorphismCard className="bg-white/70">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white/90 rounded-xl shadow-sm overflow-hidden">
                <button
                  className="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-all duration-300"
                  onClick={() => toggleItem(faq.id)}
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen(faq.id) ? 'rotate-180' : ''}`} />
                </button>
                <div className={`faq-answer ${isOpen(faq.id) ? '' : 'hidden'} p-6 pt-0 text-gray-700 border-t border-gray-100`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassMorphismCard>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-6 text-white/90">Our customer service team is here to help you find the perfect gift.</p>
            <a href="#contact" className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;