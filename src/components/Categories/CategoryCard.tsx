import React from 'react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onSelectQuestion: (questionId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelectQuestion,
}) => {
  if (category.bg) {
    return (
      <div
        className="relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url('${category.bg}')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-0"></div>

        {/* Content */}
        <div className="relative z-10 p-4">
          <h3 className="text-xl font-bold text-white text-center mb-4">
            {category.name}
          </h3>
          <div className="space-y-2">
            {category.questions.map((question) => (
              <button
                key={question.id}
                onClick={() => onSelectQuestion(question.id)}
                disabled={question.isCompleted}
                className={`w-full p-3 rounded-lg font-semibold transition-all duration-200 ${
                  question.isCompleted
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-white hover:scale-105 hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{question.basePoints} pts</span>
                  {question.isCompleted && (
                    <span className="text-xs">✓ DONE</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`bg-gradient-to-br from-${category.color || 'gray'}-600 to-${category.color || 'gray'}-800 rounded-xl p-4 shadow-lg border border-white/10`}>
        <h3 className="text-xl font-bold text-white text-center mb-4">{category.name}</h3>
        <div className="space-y-2">
          {category.questions.map((question) => (
            <button
              key={question.id}
              onClick={() => onSelectQuestion(question.id)}
              disabled={question.isCompleted}
              className={`w-full p-3 rounded-lg font-semibold transition-all duration-200 ${
                question.isCompleted
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white hover:scale-105 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{question.basePoints} pts</span>
              {question.isCompleted && <span className="text-xs">✓ DONE</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
  }
};
