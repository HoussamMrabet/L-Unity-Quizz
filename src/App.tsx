import React, { useState } from 'react';
import { Player, AppPage } from './types';
import { INITIAL_PLAYERS, SAMPLE_CATEGORIES } from './data/sampleData';
import { useTimer } from './hooks/useTimer';
import { useQuestions } from './hooks/useQuestions';
import { MainPage } from './components/MainPage/MainPage';
import { QuizPage } from './components/QuizPage/QuizPage';

function App() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [currentPage, setCurrentPage] = useState<AppPage>('main');
  
  const {
    timeLeft,
    isRunning,
    toggleTimer,
    setTimer,
    adjustTimer,
    resetTimer,
  } = useTimer(30);

  const {
    categories,
    currentView,
    selectedQuestion,
    showAnswer,
    showHint,
    selectQuestion,
    backToCategories,
    nextQuestion,
    adjustZoom,
    toggleAnswer,
    toggleHint,
  } = useQuestions(SAMPLE_CATEGORIES);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  if (currentPage === 'main') {
    return <MainPage onStartQuiz={handleStartQuiz} />;
  }

  return (
    <QuizPage
      players={players}
      categories={categories}
      currentView={currentView}
      selectedQuestion={selectedQuestion}
      showAnswer={showAnswer}
      showHint={showHint}
      timeLeft={timeLeft}
      isRunning={isRunning}
      onUpdatePlayers={setPlayers}
      onSelectQuestion={selectQuestion}
      onToggleAnswer={toggleAnswer}
      onToggleHint={toggleHint}
      onAdjustZoom={adjustZoom}
      onBackToCategories={backToCategories}
      onNextQuestion={nextQuestion}
      onToggleTimer={toggleTimer}
      onResetTimer={resetTimer}
      onSetTimer={setTimer}
      onAdjustTimer={adjustTimer}
      onBackToMain={handleBackToMain}
    />
  );
}

export default App;