import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * Hook to reveal elements on scroll
 * Adds fade-in-up animation when element enters viewport
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add animation with delay
        setTimeout(() => {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('animate-fade-in-up');
        }, delay);
        observer.unobserve(entry.target);
      }
    }, {
      threshold,
      rootMargin
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  return ref;
};

/**
 * Hook for staggered animations
 * Returns animation delay for each item based on index
 */
export const useStaggerAnimation = (index: number, delay = 100) => {
  return {
    style: {
      animationDelay: `${index * delay}ms`
    },
    className: 'animate-fade-in-up'
  };
};

/**
 * Hook to detect if element is in viewport
 */
export const useInView = (options: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
};
