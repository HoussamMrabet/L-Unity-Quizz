import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Player, Question, SubCategory, Category, Theme, QuizView } from '../../types';
import { CompactTimer } from '../Timer/CompactTimer';
import { CompactScoreboard } from '../Scoreboard/CompactScoreboard';
import { QuestionDisplay } from '../Question/QuestionDisplay';
import { ThemeGrid } from '../Themes/ThemeGrid';
import { CategoryGrid } from '../Categories/CategoryGrid';
import { SubCategoryGrid } from '../SubCategories/SubCategoryGrid';
import { VolumeControl } from '../VolumeControl';

interface QuizPageProps {
  players: Player[];
  themes: Theme[];
  currentView: QuizView;
  selectedTheme: Theme | null;
  selectedCategory: Category | null;
  selectedSubCategory: SubCategory | null;
  selectedQuestion: Question | null;
  showAnswer: boolean;
  showHint: boolean;
  revealedHintClues?: number;
  timeLeft: number;
  isRunning: boolean;
  onUpdatePlayers: (players: Player[]) => void;
  onSelectTheme: (themeId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubCategory: (subCategoryId: string) => void;
  onSelectQuestion: (questionId: string) => void;
  onToggleAnswer: () => void;
  onToggleHint: () => void;
  onAdjustZoom: (change: number) => void;
  onAdjustBlur?: (change: number) => void;
  onRevealClue?: () => void;
  onRevealHintClue?: () => void;
  onBackToThemes: () => void;
  onBackToCategories: () => void;
  onBackToSubCategories: () => void;
  onNextQuestion: () => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSetTimer: (seconds: number) => void;
  onAdjustTimer: (seconds: number) => void;
  onResetPlayers: () => void;
  onResetQuiz: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  players,
  themes,
  currentView,
  selectedTheme,
  selectedCategory,
  selectedSubCategory,
  selectedQuestion,
  showAnswer,
  showHint,
  revealedHintClues,
  timeLeft,
  isRunning,
  onUpdatePlayers,
  onSelectTheme,
  onSelectCategory,
  onSelectSubCategory,
  onSelectQuestion,
  onToggleAnswer,
  onToggleHint,
  onAdjustZoom,
  onAdjustBlur,
  onRevealClue,
  onRevealHintClue,
  onBackToThemes,
  onBackToCategories,
  onBackToSubCategories,
  onNextQuestion,
  onToggleTimer,
  onResetTimer,
  onSetTimer,
  onAdjustTimer,
  onResetPlayers,
  onResetQuiz,
}) => {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/');
  };

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
            onClick={handleBackToMain}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Main
          </button>
          <h1 className="hidden md:flex text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7]">
            L Unity Quiz
          </h1>
          <VolumeControl />
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
          {currentView === 'themes' ? (
            <ThemeGrid
              themes={themes}
              onSelectTheme={onSelectTheme}
            />
          ) : currentView === 'categories' && selectedTheme ? (
            <CategoryGrid
              categories={selectedTheme.categories}
              onSelectCategory={onSelectCategory}
              onBackToThemes={onBackToThemes}
              themeName={selectedTheme.name}
            />
          ) : currentView === 'subcategories' && selectedCategory ? (
            <SubCategoryGrid
              subCategories={selectedCategory.subCategories}
              onSelectQuestion={onSelectQuestion}
              onBackToCategories={onBackToCategories}
              categoryName={selectedCategory.name}
              themeName={selectedTheme?.name}
            />
          ) : selectedQuestion ? (
            <QuestionDisplay
              question={selectedQuestion}
              showAnswer={showAnswer}
              showHint={showHint}
             revealedHintClues={revealedHintClues}
              onToggleAnswer={onToggleAnswer}
              onToggleHint={onToggleHint}
              onAdjustZoom={onAdjustZoom}
             onAdjustBlur={onAdjustBlur}
             onRevealClue={onRevealClue}
             onRevealHintClue={onRevealHintClue}
              onBackToCategories={onBackToSubCategories}
              onNextQuestion={onNextQuestion}
            />
          ) : null}
        </div>

        {/* Scoreboard */}
        <CompactScoreboard
          players={players}
          currentQuestion={
            selectedQuestion || 
            themes[0]?.categories[0]?.subCategories[0]?.questions[0] || 
            null
          }
          onUpdatePlayers={onUpdatePlayers}
          onResetPlayers={onResetPlayers}
          onResetQuiz={onResetQuiz}
        />
      </div>
    </div>
  );
};