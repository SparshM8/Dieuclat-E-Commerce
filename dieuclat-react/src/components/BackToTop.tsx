import React from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  isVisible: boolean;
  onClick: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-40 animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;