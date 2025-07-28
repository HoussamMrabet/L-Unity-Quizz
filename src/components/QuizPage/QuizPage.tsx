import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Player, Question, Category, QuizView } from '../../types';
import { CompactTimer } from '../Timer/CompactTimer';
import { CompactScoreboard } from '../Scoreboard/CompactScoreboard';
import { QuestionDisplay } from '../Question/QuestionDisplay';
import { CategoryGrid } from '../Categories/CategoryGrid';

interface QuizPageProps {
  players: Player[];
  categories: Category[];
  currentView: QuizView;
  selectedQuestion: Question | null;
  showAnswer: boolean;
  showHint: boolean;
  timeLeft: number;
  isRunning: boolean;
  onUpdatePlayers: (players: Player[]) => void;
  onSelectQuestion: (questionId: string) => void;
  onToggleAnswer: () => void;
  onToggleHint: () => void;
  onAdjustZoom: (change: number) => void;
  onBackToCategories: () => void;
  onNextQuestion: () => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetTimer: (seconds: number) => void;
  onAdjustTimer: (seconds: number) => void;
  onBackToMain: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  players,
  categories,
  currentView,
  selectedQuestion,
  showAnswer,
  showHint,
  timeLeft,
  isRunning,
  onUpdatePlayers,
  onSelectQuestion,
  onToggleAnswer,
  onToggleHint,
  onAdjustZoom,
  onBackToCategories,
  onNextQuestion,
  onToggleTimer,
  onResetTimer,
  onSetTimer,
  onAdjustTimer,
  onBackToMain,
}) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start relative"
      style={{
        backgroundImage: "url('/test_4.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

      {/* Main content wrapper */}
      <div className="container relative z-10 w-full px-4 py-4 flex flex-col flex-grow">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Main
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7]">
            L Unity Quizz
          </h1>
          <div className="w-[140px]"></div>
        </div>

        {/* Timer */}
        <div className="mb-6 sticky top-6 z-20 ">
          <CompactTimer
            timeLeft={timeLeft}
            isRunning={isRunning}
            onToggle={onToggleTimer}
            onReset={onResetTimer}
            onSetTimer={onSetTimer}
            onAdjustTimer={onAdjustTimer}
          />
        </div>

        {/* Main Content */}
        <div className="mb-6">
          {currentView === 'categories' ? (
            <CategoryGrid
              categories={categories}
              onSelectQuestion={onSelectQuestion}
            />
          ) : selectedQuestion ? (
            <QuestionDisplay
              question={selectedQuestion}
              showAnswer={showAnswer}
              showHint={showHint}
              onToggleAnswer={onToggleAnswer}
              onToggleHint={onToggleHint}
              onAdjustZoom={onAdjustZoom}
              onBackToCategories={onBackToCategories}
              onNextQuestion={onNextQuestion}
            />
          ) : null}
        </div>

        {/* Scoreboard */}
        <CompactScoreboard
          players={players}
          currentQuestion={
            selectedQuestion || categories[0]?.questions[0] || null
          }
          onUpdatePlayers={onUpdatePlayers}
        />
      </div>
    </div>
  );
};