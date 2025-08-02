import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Player } from './types';
import { INITIAL_PLAYERS, SAMPLE_THEMES } from './data/sampleData';
import { useTimer } from './hooks/useTimer';
import { useQuestions } from './hooks/useQuestions';
import { areAllQuestionsCompleted } from './utils/quizUtils';
import { MainPage } from './components/MainPage/MainPage';
import { QuizPage } from './components/QuizPage/QuizPage';
import { WinnerPage } from './components/WinnerPage/WinnerPage';
import { 
  savePlayersToStorage,
  loadPlayersFromStorage, 
  saveThemesToStorage, 
  loadThemesFromStorage,
  clearPlayersFromStorage,
  clearThemesFromStorage
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
    themes,
    setThemes,
    currentView,
    selectedTheme,
    selectedCategory,
    selectedSubCategory,
    selectedQuestion,
    showAnswer,
    showHint,
    revealedHintClues,
    selectTheme,
    selectCategory,
    selectSubCategory,
    selectQuestion,
    backToThemes,
    backToCategories,
    backToSubCategories,
    nextQuestion,
    adjustZoom,
    toggleAnswer,
    toggleHint,
    revealClue,
    revealHintClue,
    adjustBlur,
  } = useQuestions(() => {
    const savedThemes = loadThemesFromStorage();
    return savedThemes || SAMPLE_THEMES;
  });

  // Save players to localStorage whenever players change
  useEffect(() => {
    savePlayersToStorage(players);
  }, [players]);

  // Save themes to localStorage whenever themes change
  useEffect(() => {
    saveThemesToStorage(themes);
  }, [themes]);

  const handleResetPlayers = () => {
    clearPlayersFromStorage();
    setPlayers(INITIAL_PLAYERS);
  };

  const handleResetQuiz = () => {
    clearThemesFromStorage();
    setThemes(SAMPLE_THEMES);
  };

  // Check if all questions are completed
  const allQuestionsCompleted = areAllQuestionsCompleted(themes);

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
                themes={themes}
                currentView={currentView}
                selectedTheme={selectedTheme}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedQuestion={selectedQuestion}
                showAnswer={showAnswer}
                showHint={showHint}
                revealedHintClues={revealedHintClues}
                timeLeft={timeLeft}
                isRunning={isRunning}
                onUpdatePlayers={setPlayers}
                onSelectTheme={selectTheme}
                onSelectCategory={selectCategory}
                onSelectSubCategory={selectSubCategory}
                onSelectQuestion={selectQuestion}
                onToggleAnswer={toggleAnswer}
                onToggleHint={toggleHint}
                onAdjustZoom={adjustZoom}
               onAdjustBlur={adjustBlur}
                onRevealClue={revealClue}
                onRevealHintClue={revealHintClue}
                onBackToThemes={backToThemes}
                onBackToCategories={backToCategories}
                onBackToSubCategories={backToSubCategories}
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