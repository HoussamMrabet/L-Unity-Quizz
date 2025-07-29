import React, { useState } from 'react';
import { useEffect } from 'react';
import { Player, AppPage } from './types';
import { INITIAL_PLAYERS, SAMPLE_CATEGORIES } from './data/sampleData';
import { useTimer } from './hooks/useTimer';
import { useQuestions } from './hooks/useQuestions';
import { MainPage } from './components/MainPage/MainPage';
import { QuizPage } from './components/QuizPage/QuizPage';
import { 
  savePlayersToStorage, 
  loadPlayersFromStorage, 
  saveCategoriesToStorage, 
  loadCategoriesFromStorage,
  clearPlayersFromStorage,
  clearCategoriesFromStorage
} from './utils/storageUtils';

function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = loadPlayersFromStorage();
    return savedPlayers || INITIAL_PLAYERS;
  });
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
    setCategories,
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
  } = useQuestions(() => {
    const savedCategories = loadCategoriesFromStorage();
    return savedCategories || SAMPLE_CATEGORIES;
  });

  // Save players to localStorage whenever players change
  useEffect(() => {
    savePlayersToStorage(players);
  }, [players]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    saveCategoriesToStorage(categories);
  }, [categories]);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleResetPlayers = () => {
    clearPlayersFromStorage();
    setPlayers(INITIAL_PLAYERS);
  };

  const handleResetQuiz = () => {
    clearCategoriesFromStorage();
    setCategories(SAMPLE_CATEGORIES);
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
      onResetPlayers={handleResetPlayers}
      onResetQuiz={handleResetQuiz}
    />
  );
}

export default App;