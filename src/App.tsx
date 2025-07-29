import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Player } from './types';
import { INITIAL_PLAYERS, SAMPLE_CATEGORIES } from './data/sampleData';
import { useTimer } from './hooks/useTimer';
import { useQuestions } from './hooks/useQuestions';
import { areAllQuestionsCompleted } from './utils/quizUtils';
import { MainPage } from './components/MainPage/MainPage';
import { QuizPage } from './components/QuizPage/QuizPage';
import { WinnerPage } from './components/WinnerPage/WinnerPage';
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

  const handleResetPlayers = () => {
    clearPlayersFromStorage();
    setPlayers(INITIAL_PLAYERS);
  };

  const handleResetQuiz = () => {
    clearCategoriesFromStorage();
    setCategories(SAMPLE_CATEGORIES);
  };

  // Check if all questions are completed
  const allQuestionsCompleted = areAllQuestionsCompleted(categories);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route 
          path="/quiz" 
          element={
            allQuestionsCompleted ? (
              <Navigate to="/winner" replace />
            ) : (
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
                onResetPlayers={handleResetPlayers}
                onResetQuiz={handleResetQuiz}
              />
            )
          } 
        />
        <Route 
          path="/winner" 
          element={
            <WinnerPage
              players={players}
              onResetQuiz={handleResetQuiz}
              onResetPlayers={handleResetPlayers}
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;