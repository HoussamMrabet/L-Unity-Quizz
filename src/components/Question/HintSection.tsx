import React from 'react';
import { Lightbulb, Volume2, Image as ImageIcon, Eye, EyeOff, List } from 'lucide-react';
import { Question } from '../../types';

interface HintSectionProps {
  question: Question;
  showHint: boolean;
  onToggleHint: () => void;
  onRevealHintClue?: () => void;
  revealedHintClues?: number;
}

export const HintSection: React.FC<HintSectionProps> = ({
  question,
  showHint,
  onToggleHint,
  onRevealHintClue,
  revealedHintClues = 0,
}) => {
  if (!question.hint) return null;

  const getHintIcon = () => {
    switch (question.hint?.type) {
      case 'audio':
        return <Volume2 className="w-4 h-4" />;
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'clues':
        return <List className="w-4 h-4" />;
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
          
          {question.hint.type === 'clues' && question.hint.clues && (
            <div>
              <p className="text-yellow-200 mb-4">{question.hint.content}</p>
              <div className="space-y-3">
                {question.hint.clues.slice(0, revealedHintClues).map((clue, index) => (
                  <div
                    key={index}
                    className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 animate-fade-in"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-yellow-900 text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-yellow-200">{clue}</p>
                    </div>
                  </div>
                ))}
                
                {onRevealHintClue && revealedHintClues < question.hint.clues.length && (
                  <div className="text-center">
                    <button
                      onClick={onRevealHintClue}
                      className="bg-yellow-600 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      <Eye className="w-4 h-4" />
                      Reveal Next Hint ({revealedHintClues + 1}/{question.hint.clues.length})
                    </button>
                  </div>
                )}
                
                {revealedHintClues >= question.hint.clues.length && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-600/20 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 text-sm">
                      <EyeOff className="w-4 h-4" />
                      All hint clues revealed
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};