import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface AnswerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  answer: string;
  answerImage?: string;
}

export const AnswerPopup: React.FC<AnswerPopupProps> = ({
  isOpen,
  onClose,
  answer,
  answerImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-yellow-400/50 shadow-2xl shadow-yellow-400/20 max-w-2xl w-full animate-popup-enter overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400/20 rounded-full animate-float-1" />
          <div className="absolute top-1/4 -right-2 w-6 h-6 bg-blue-400/20 rounded-full animate-float-2" />
          <div className="absolute -bottom-2 left-1/3 w-4 h-4 bg-purple-400/20 rounded-full animate-float-3" />
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400/20 rounded-full animate-float-1" />
        </div>

        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-yellow-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-full">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Answer Revealed!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200 group"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Answer Image */}
          {answerImage && (
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={answerImage}
                  alt="Answer"
                  className="max-w-full max-h-64 object-contain rounded-xl shadow-lg animate-image-reveal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent rounded-xl pointer-events-none" />
              </div>
            </div>
          )}

          {/* Answer Text */}
          <div className="text-center">
            <div className="inline-block p-6 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-xl border border-yellow-400/30 animate-text-reveal">
              <p className="text-3xl font-bold text-white mb-2">{answer}</p>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-yellow-400/30 animate-spin-slow">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute bottom-4 left-4 text-blue-400/30 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Footer */}
        <div className="relative p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/30"
          >
            Continue Quiz
          </button>
        </div>
      </div>
    </div>
  );
};