import React from 'react';
import { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onBackToThemes: () => void;
  themeName?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  onBackToThemes,
  themeName,
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToThemes}
          className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          ← Back to Themes
        </button>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7] mb-2">
          {themeName ? `${themeName} - Categories` : 'Choose Your Category'}
        </h2>
        <p className="text-blue-300">Select a category to explore subcategories</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
};