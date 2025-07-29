import React from 'react';
import { Volume2, Image, ZoomIn, Plus, Minus } from 'lucide-react';
import { Question } from '../../types';

interface QuestionContentProps {
  question: Question;
  onAdjustZoom: (change: number) => void;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  onAdjustZoom,
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

      {(question.type === 'image' || question.type === 'progressive') && question.imageUrl && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={question.imageUrl}
              alt="Question"
              className={`w-full h-full object-contain transition-transform duration-300
    ${question.zoomOrigin === 'top-left' ? 'origin-top-left' :
                  question.zoomOrigin === 'top-right' ? 'origin-top-right' :
                    question.zoomOrigin === 'bottom-left' ? 'origin-bottom-left' :
                      question.zoomOrigin === 'bottom-right' ? 'origin-bottom-right' :
                        'origin-center'}
  `}
              style={{
                transform: question.type === 'progressive'
                  ? `scale(${(question.zoomLevel || 300) / 100})`
                  : 'scale(1)'
              }}
            />
            {question.type === 'progressive' && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => onAdjustZoom(-25)}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onAdjustZoom(25)}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};