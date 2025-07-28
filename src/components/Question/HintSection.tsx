import React from 'react';
import { Lightbulb, Volume2, Image as ImageIcon } from 'lucide-react';
import { Question } from '../../types';

interface HintSectionProps {
  question: Question;
  showHint: boolean;
  onToggleHint: () => void;
}

export const HintSection: React.FC<HintSectionProps> = ({
  question,
  showHint,
  onToggleHint,
}) => {
  if (!question.hint) return null;

  const getHintIcon = () => {
    switch (question.hint?.type) {
      case 'audio':
        return <Volume2 className="w-4 h-4" />;
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#5BD8FF]" />
          Hint
        </h4>
        <button
          onClick={onToggleHint}
          className="flex items-center gap-2 bg-[#2371C6] hover:bg-[#3DDCFF] text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          {getHintIcon()}
          {showHint ? 'Hide Hint' : 'Show Hint (-50% Points)'}
        </button>
      </div>
      
      {showHint && (
        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
          {question.hint.type === 'text' && (
            <p className="text-blue-200">{question.hint.content}</p>
          )}
          
          {question.hint.type === 'audio' && question.hint.audioUrl && (
            <div>
              <p className="text-yellow-200 mb-3">{question.hint.content}</p>
              <audio controls className="w-full">
                <source src={question.hint.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {question.hint.type === 'image' && question.hint.imageUrl && (
            <div>
              <p className="text-yellow-200 mb-3">{question.hint.content}</p>
              <img
                src={question.hint.imageUrl}
                alt="Hint"
                className="w-full max-w-md h-48 object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};