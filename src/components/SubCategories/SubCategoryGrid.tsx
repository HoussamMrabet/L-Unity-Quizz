import React from 'react';
import { SubCategory } from '../../types';
import { SubCategoryCard } from './SubCategoryCard';

interface SubCategoryGridProps {
  subCategories: SubCategory[];
  onSelectQuestion: (questionId: string) => void;
  onBackToCategories: () => void;
  categoryName?: string;
  themeName?: string;
}

export const SubCategoryGrid: React.FC<SubCategoryGridProps> = ({
  subCategories,
  onSelectQuestion,
  onBackToCategories,
  categoryName,
  themeName,
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToCategories}
          className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          ← Back to Categories
        </button>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7] mb-2">
          {themeName && categoryName ? `${themeName} - ${categoryName}` : 'Choose Your SubCategory'}
        </h2>
        <p className="text-blue-300">Select a question to test your League of Legends knowledge</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subCategories.map((subCategory) => (
          <SubCategoryCard
            key={subCategory.id}
            subCategory={subCategory}
            onSelectQuestion={onSelectQuestion}
          />
        ))}
      </div>
    </div>
  );
};