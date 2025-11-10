import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`skeleton ${className}`} />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card-premium p-6 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-4 skeleton-shimmer"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded skeleton-shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 skeleton-shimmer"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20 skeleton-shimmer"></div>
          <div className="h-8 bg-gray-200 rounded-full w-8 skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg w-3/4 skeleton-shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-full skeleton-shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6 skeleton-shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-4/6 skeleton-shimmer"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded-full w-32 skeleton-shimmer"></div>
              <div className="h-12 bg-gray-200 rounded-full w-32 skeleton-shimmer"></div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-3xl skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton: React.FC = () => {
  return (
    <div className="text-center animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 skeleton-shimmer"></div>
      <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8 skeleton-shimmer"></div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 skeleton-shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-2 skeleton-shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto skeleton-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full skeleton-shimmer"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 skeleton-shimmer"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mt-1 skeleton-shimmer"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded skeleton-shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 skeleton-shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 skeleton-shimmer"></div>
      </div>
      <div className="flex gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded skeleton-shimmer"></div>
        ))}
      </div>
    </div>
  );
};