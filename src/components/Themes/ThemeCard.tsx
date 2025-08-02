import React from 'react';
import { Theme } from '../../types';

interface ThemeCardProps {
  theme: Theme;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onSelectTheme,
}) => {
  const totalQuestions = theme.categories.reduce((total, category) => 
    total + category.subCategories.reduce((subTotal, subCategory) => 
      subTotal + subCategory.questions.length, 0
    ), 0
  );

  const completedQuestions = theme.categories.reduce((total, category) => 
    total + category.subCategories.reduce((subTotal, subCategory) => 
      subTotal + subCategory.questions.filter(q => q.isCompleted).length, 0
    ), 0
  );

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
  
  const color = theme.color || 'gray';
  const gradient = gradientColorMap[color] || gradientColorMap['gray'];

  const handleClick = () => {
    if (!isCompleted) {
      onSelectTheme(theme.id);
    }
  };

  if (theme.bg) {
    return (
      <div
        className={`relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden transform transition-all duration-300 ${
          isCompleted 
            ? 'cursor-not-allowed opacity-50 grayscale' 
            : 'cursor-pointer hover:scale-105 hover:shadow-2xl'
        }`}
        style={{
          backgroundImage: `url('${theme.bg}')`,
        }}
        onClick={handleClick}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 backdrop-blur-sm z-0 ${
          isCompleted ? 'bg-slate-900/80' : 'bg-slate-900/50'
        }`}></div>

        {/* Content */}
        <div className="relative z-10 p-6 h-64 flex flex-col justify-center">
          <div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${
              isCompleted ? 'text-gray-400' : 'text-white'
            }`}>
              {theme.name}
            </h3>
            {isCompleted && (
              <div className="text-center">
                <span className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-3 py-1 text-green-400 text-sm font-semibold">
                  ✓ COMPLETED
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl p-6 shadow-lg border border-white/10 transform transition-all duration-300 h-48 flex flex-col justify-between ${
        isCompleted 
          ? 'cursor-not-allowed opacity-50 grayscale' 
          : 'cursor-pointer hover:scale-105 hover:shadow-2xl'
      }`}
      onClick={handleClick}
    >
      <div>
        <h3 className={`text-2xl font-bold text-center mb-2 ${
          isCompleted ? 'text-gray-300' : 'text-white'
        }`}>
          {theme.name}
        </h3>
        {isCompleted ? (
          <div className="text-center">
            <span className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-3 py-1 text-green-400 text-sm font-semibold">
              ✓ COMPLETED
            </span>
          </div>
        ) : (
          <p className="text-blue-200 text-center text-sm">
            {theme.categories.length} categories
          </p>
        )}
      </div>
      
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <p className={`font-semibold ${isCompleted ? 'text-gray-300' : 'text-white'}`}>
            {completedQuestions}/{totalQuestions} Questions
          </p>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-400' : 'bg-yellow-400'
              }`}
              style={{ width: `${totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};