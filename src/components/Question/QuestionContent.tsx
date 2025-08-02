import React from 'react';
import { Volume2, Image, ZoomIn, Plus, Minus, Eye, EyeOff, Bluetooth as Blur } from 'lucide-react';
import { Question } from '../../types';

interface QuestionContentProps {
  question: Question;
  onAdjustZoom: (change: number) => void;
  onAdjustBlur?: (change: number) => void;
  onRevealClue?: () => void;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  onAdjustZoom,
  onAdjustBlur,
  onRevealClue,
}) => {
  // const getQuestionTypeIcon = () => {
  //   switch (question.type) {
  //     case 'audio':
  //       return <Volume2 className="w-5 h-5" />;
  //     case 'image':
  //       return <Image className="w-5 h-5" />;
  //     case 'progressive':
  //       return <ZoomIn className="w-5 h-5" />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-white mb-4">{question.content}</h3>
        <div className="flex items-center gap-2 text-white">
          {/* {getQuestionTypeIcon()} */}
          <span className="capitalize font-semibold">{question.currentPoints}</span>
        </div>
      </div>

      {question.type === 'audio' && question.audioUrl && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <audio controls className="w-full">
            <source src={question.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {(question.type === 'image' || question.type === 'progressive' || question.type === 'blurred') && question.imageUrl && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="relative overflow-hidden rounded-lg max-w-2xl mx-auto">
            <img
              src={question.imageUrl}
              alt="Question"
              className={`w-full max-h-96 object-contain transition-all duration-300
    ${question.zoomOrigin === 'top-left' ? 'origin-top-left' :
                  question.zoomOrigin === 'top-right' ? 'origin-top-right' :
                    question.zoomOrigin === 'bottom-left' ? 'origin-bottom-left' :
                      question.zoomOrigin === 'bottom-right' ? 'origin-bottom-right' :
                        'origin-center'}
  `}
              style={{
                transform: question.type === 'progressive'
                  ? `scale(${(question.zoomLevel || 300) / 100})`
                  : 'scale(1)',
                filter: question.type === 'blurred'
                  ? `blur(${question.blurLevel || 10}px) grayscale(100%)`
                  : 'none'
              }}
            />
            {question.type === 'progressive' && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {/* Only show zoom out button, disabled after 3 clicks */}
                <button
                  onClick={() => onAdjustZoom((question.zoomScale || 25) * -1)}
                  disabled={(question.clicksUsed || 0) >= 3}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    (question.clicksUsed || 0) >= 3
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                  title={`Zoom Out (${3 - (question.clicksUsed || 0)} clicks left)`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="bg-slate-800/80 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  Clicks: {question.clicksUsed || 0}/3
                </div>
              </div>
            )}
            {question.type === 'blurred' && onAdjustBlur && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {/* Only show unblur button, disabled after 3 clicks */}
                <button
                  onClick={() => onAdjustBlur(-3)}
                  disabled={(question.clicksUsed || 0) >= 3}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    (question.clicksUsed || 0) >= 3
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                  title={`Reduce Blur (${3 - (question.clicksUsed || 0)} clicks left)`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="bg-slate-800/80 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  Blur: {question.blurLevel || 10}px | {question.clicksUsed || 0}/3
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {question.type === 'clues' && question.clues && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="space-y-4">
            {question.clues.slice(0, question.revealedClues || 0).map((clue, index) => (
              <div
                key={index}
                className="bg-slate-600/50 rounded-lg p-4 border-l-4 border-blue-400 animate-fade-in"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-white">{clue}</p>
                </div>
              </div>
            ))}
            
            {onRevealClue && (question.revealedClues || 0) < question.clues.length && (
              <div className="text-center">
                <button
                  onClick={onRevealClue}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <Eye className="w-4 h-4" />
                  Reveal Next Clue ({(question.revealedClues || 0) + 1}/{question.clues.length})
                </button>
              </div>
            )}
            
            {(question.revealedClues || 0) >= question.clues.length && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-4 py-2 text-green-400">
                  <EyeOff className="w-4 h-4" />
                  All clues revealed
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};