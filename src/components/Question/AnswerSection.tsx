import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnswerSectionProps {
  answer: string;
  answerImage?: string;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}

export const AnswerSection: React.FC<AnswerSectionProps> = ({
  answer,
  answerImage,
  showAnswer,
  onToggleAnswer,
}) => {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-4">Ready for the Answer?</h4>
        <button
          onClick={onToggleAnswer}
          className="group bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3">
            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
            <span>🎉 Reveal Answer! 🎉</span>
            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
          </div>
        </button>
      </div>
    </div>
  );
};