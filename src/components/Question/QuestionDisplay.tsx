import React from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Question } from '../../types';
import { QuestionContent } from './QuestionContent';
import { AnswerSection } from './AnswerSection';
import { HintSection } from './HintSection';
import { PointsManager } from './PointsManager';
import { AnswerPopup } from './AnswerPopup';

interface QuestionDisplayProps {
  question: Question;
  showAnswer: boolean;
  showHint: boolean;
  onToggleAnswer: () => void;
  onToggleHint: () => void;
  onAdjustZoom: (change: number) => void;
  onBackToCategories: () => void;
  onNextQuestion: () => void;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  showAnswer,
  showHint,
  onToggleAnswer,
  onToggleHint,
  onAdjustZoom,
  onBackToCategories,
  onNextQuestion,
}) => {
  return (
    <>
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCategories}
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Categories
            </button>
            <HelpCircle className="text-[#5BD8FF] w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)} - {question.basePoints} Points
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-700/50 rounded-lg p-6">
            <QuestionContent question={question} onAdjustZoom={onAdjustZoom} />
          </div>

          {/* Only show hint section for non-progressive questions */}
          {question.type !== 'progressive' && (
            <HintSection
              question={question}
              showHint={showHint}
              onToggleHint={onToggleHint}
            />
          )}

          <AnswerSection
            answer={question.answer}
            answerImage={question.answerImage}
            showAnswer={showAnswer}
            onToggleAnswer={onToggleAnswer}
          />

          <PointsManager question={question} />

          <div className="flex justify-end">
            <button
              onClick={onNextQuestion}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Complete Question
            </button>
          </div>
        </div>
      </div>

      {/* Answer Popup */}
      <AnswerPopup
        isOpen={showAnswer}
        onClose={onToggleAnswer}
        answer={question.answer}
        answerImage={question.answerImage}
      />
    </>
  );
};