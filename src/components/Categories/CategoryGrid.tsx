import React from 'react';
import { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  onSelectQuestion: (questionId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectQuestion,
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7] mb-2">
          Choose Your Category
        </h2>
        <p className="text-blue-300">Select a question to test your League of Legends knowledge</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelectQuestion={onSelectQuestion}
          />
        ))}
      </div>
    </div>
  );
};