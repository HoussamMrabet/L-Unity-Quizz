import React from 'react';
import { SubCategory } from '../../types';

interface SubCategoryCardProps {
  subCategory: SubCategory;
  onSelectQuestion: (questionId: string) => void;
}

export const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  subCategory,
  onSelectQuestion,
}) => {
  const totalQuestions = subCategory.questions.length;
  const completedQuestions = subCategory.questions.filter(q => q.isCompleted).length;
  const isCompleted = totalQuestions > 0 && completedQuestions === totalQuestions;

  const gradientColorMap: Record<string, { from: string; to: string }> = {
    red: { from: 'from-red-600', to: 'to-red-800' },
    blue: { from: 'from-blue-600', to: 'to-blue-800' },
    green: { from: 'from-green-600', to: 'to-green-800' },
    yellow: { from: 'from-yellow-600', to: 'to-yellow-800' },
    purple: { from: 'from-purple-600', to: 'to-purple-800' },
    pink: { from: 'from-pink-600', to: 'to-pink-800' },
    orange: { from: 'from-orange-600', to: 'to-orange-800' },
    teal: { from: 'from-teal-600', to: 'to-teal-800' },
    amber: { from: 'from-amber-600', to: 'to-amber-800' },
    lime: { from: 'from-lime-600', to: 'to-lime-800' },
    gray: { from: 'from-gray-600', to: 'to-gray-800' }, // fallback
  };
  const color = subCategory.color || 'gray';
  const gradient = gradientColorMap[color] || gradientColorMap['gray'];

  if (subCategory.bg) {
    return (
      <div
        className={`relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden ${
          isCompleted ? 'opacity-50 grayscale' : ''
        }`}
        style={{
          backgroundImage: `url('${subCategory.bg}')`,
        }}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 backdrop-blur-sm z-0 ${
          isCompleted ? 'bg-slate-900/80' : 'bg-slate-900/50'
        }`}></div>

        {/* Content */}
        <div className="relative z-10 p-4">
          <h3 className={`text-xl font-bold text-center mb-4 ${
            isCompleted ? 'text-gray-400' : 'text-white'
          }`}>
            {subCategory.name}
          </h3>
          {isCompleted && (
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-3 py-1 text-green-400 text-sm font-semibold">
                ✓ ALL COMPLETED
              </span>
            </div>
          )}
          <div className="space-y-2">
            {subCategory.questions.map((question) => (
              <button
                key={question.id}
                onClick={() => onSelectQuestion(question.id)}
                disabled={question.isCompleted || isCompleted}
                className={`w-full p-3 rounded-lg font-semibold transition-all duration-200 ${
                  question.isCompleted || isCompleted
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
  }

  return (
    <div className={`bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl p-4 shadow-lg border border-white/10 ${
      isCompleted ? 'opacity-50 grayscale' : ''
    }`}>
      <h3 className={`text-xl font-bold text-center mb-4 ${
        isCompleted ? 'text-gray-300' : 'text-white'
      }`}>
        {subCategory.name}
      </h3>
      {isCompleted && (
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-3 py-1 text-green-400 text-sm font-semibold">
            ✓ ALL COMPLETED
          </span>
        </div>
      )}
      <div className="space-y-2">
        {subCategory.questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelectQuestion(question.id)}
            disabled={question.isCompleted || isCompleted}
            className={`w-full p-3 rounded-lg font-semibold transition-all duration-200 ${
              question.isCompleted || isCompleted
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
};