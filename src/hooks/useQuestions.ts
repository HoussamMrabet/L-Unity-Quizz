import { useState } from 'react';
import { Question, SubCategory, Category, Theme, QuizView } from '../types';

export const useQuestions = (initialThemes: Theme[] | (() => Theme[])) => {
  const [themes, setThemes] = useState<Theme[]>(initialThemes);
  const [currentView, setCurrentView] = useState<QuizView>('themes');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealedHintClues, setRevealedHintClues] = useState(0);

  const selectTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setSelectedTheme(theme);
      setCurrentView('categories');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedQuestion(null);
      setShowAnswer(false);
      setShowHint(false);
      setRevealedHintClues(0);
    }
  };

  const selectCategory = (categoryId: string) => {
    if (!selectedTheme) return;
    const category = selectedTheme.categories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setCurrentView('subcategories');
      setSelectedSubCategory(null);
      setSelectedQuestion(null);
      setShowAnswer(false);
      setShowHint(false);
      setRevealedHintClues(0);
    }
  };

  const selectSubCategory = (subCategoryId: string) => {
    if (!selectedCategory) return;
    const subCategory = selectedCategory.subCategories.find(sc => sc.id === subCategoryId);
    if (subCategory) {
      setSelectedSubCategory(subCategory);
      // Don't change view yet, stay in subcategories to show questions
    }
  };

  const selectQuestion = (questionId: string) => {
    const question = themes
      .flatMap(theme => theme.categories)
      .flatMap(category => category.subCategories)
      .flatMap(subCategory => subCategory.questions)
      .find(q => q.id === questionId);
    
    if (question && !question.isCompleted) {
      setSelectedQuestion(question);
      setCurrentView('question');
      setShowAnswer(false);
      setShowHint(false);
      setRevealedHintClues(0);
    }
  };

  const markQuestionCompleted = () => {
    if (selectedQuestion) {
      setThemes(prev => 
        prev.map(theme => ({
          ...theme,
          categories: theme.categories.map(category => ({
            ...category,
            subCategories: category.subCategories.map(subCategory => ({
              ...subCategory,
              questions: subCategory.questions.map(q => 
                q.id === selectedQuestion.id ? { ...q, isCompleted: true } : q
              )
            }))
          }))
        }))
      );
    }
  };

  const backToThemes = () => {
    setCurrentView('themes');
    setSelectedTheme(null);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedQuestion(null);
    setShowAnswer(false);
    setShowHint(false);
    setRevealedHintClues(0);
  };

  const backToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedQuestion(null);
    setShowAnswer(false);
    setShowHint(false);
    setRevealedHintClues(0);
  };

  const backToSubCategories = () => {
    setCurrentView('subcategories');
    setSelectedSubCategory(null);
    setSelectedQuestion(null);
    setShowAnswer(false);
    setShowHint(false);
    setRevealedHintClues(0);
  };

  const nextQuestion = () => {
    markQuestionCompleted();
    backToThemes();
  };

  const adjustZoom = (change: number) => {
    if (selectedQuestion && (selectedQuestion.type === 'progressive' || selectedQuestion.type === 'blurred')) {
      const currentClicks = selectedQuestion.clicksUsed || 0;
      
      // Only allow zoom out (negative change) for progressive and limit to 3 clicks
      if (selectedQuestion.type === 'progressive') {
        if (change >= 0 || currentClicks >= 3) return; // Only allow zoom out and max 3 clicks
        
        const newZoomLevel = Math.max(100, (selectedQuestion.zoomLevel || 300) + change);
        
        // Deduct points and increment clicks
        const newPoints = Math.max(0, selectedQuestion.currentPoints - selectedQuestion.pointDeduction);
        const updatedQuestion = { 
          ...selectedQuestion, 
          zoomLevel: newZoomLevel,
          currentPoints: newPoints,
          clicksUsed: currentClicks + 1
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update in themes as well
        setThemes(prev => 
          prev.map(theme => ({
            ...theme,
            categories: theme.categories.map(category => ({
              ...category,
              subCategories: category.subCategories.map(subCategory => ({
                ...subCategory,
                questions: subCategory.questions.map(q => 
                  q.id === selectedQuestion.id ? updatedQuestion : q
                )
              }))
            }))
          }))
        );
      } else if (selectedQuestion.type === 'blurred') {
        if (change >= 0 || currentClicks >= 3) return; // Only allow blur reduction and max 3 clicks
        
        const newBlurLevel = Math.max(1, (selectedQuestion.blurLevel || 10) + change);
        
        // Deduct points and increment clicks
        const newPoints = Math.max(0, selectedQuestion.currentPoints - selectedQuestion.pointDeduction);
        const updatedQuestion = { 
          ...selectedQuestion, 
          blurLevel: newBlurLevel,
          currentPoints: newPoints,
          clicksUsed: currentClicks + 1
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update in themes as well
        setThemes(prev => 
          prev.map(theme => ({
            ...theme,
            categories: theme.categories.map(category => ({
              ...category,
              subCategories: category.subCategories.map(subCategory => ({
                ...subCategory,
                questions: subCategory.questions.map(q => 
                  q.id === selectedQuestion.id ? updatedQuestion : q
                )
              }))
            }))
          }))
        );
      }
    }
  };

  const adjustBlur = (change: number) => {
    if (selectedQuestion && selectedQuestion.type === 'blurred') {
      const currentClicks = selectedQuestion.clicksUsed || 0;
      
      // Only allow blur reduction (negative change) and limit to 3 clicks
      if (change >= 0 || currentClicks >= 3) return;
      
      const currentBlur = selectedQuestion.blurLevel || 10;
      const newBlurLevel = Math.max(1, currentBlur + change);
      
      // Deduct points and increment clicks
      const newPoints = Math.max(0, selectedQuestion.currentPoints - selectedQuestion.pointDeduction);
      const updatedQuestion = { 
        ...selectedQuestion, 
        blurLevel: newBlurLevel,
        currentPoints: newPoints,
        clicksUsed: currentClicks + 1
      };
      setSelectedQuestion(updatedQuestion);
      
      // Update in themes as well
      setThemes(prev => 
        prev.map(theme => ({
          ...theme,
          categories: theme.categories.map(category => ({
            ...category,
            subCategories: category.subCategories.map(subCategory => ({
              ...subCategory,
              questions: subCategory.questions.map(q => 
                q.id === selectedQuestion.id ? updatedQuestion : q
              )
            }))
          }))
        }))
      );
    }
  };

  const revealClue = () => {
    if (selectedQuestion && selectedQuestion.type === 'clues' && selectedQuestion.clues) {
      const currentRevealed = selectedQuestion.revealedClues || 0;
      if (currentRevealed < selectedQuestion.clues.length) {
        const newRevealed = currentRevealed + 1;
        
        // Deduct points for revealing a clue
        const newPoints = selectedQuestion.currentPoints;
        
        const updatedQuestion = { 
          ...selectedQuestion, 
          revealedClues: newRevealed,
          currentPoints: newPoints
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update in themes as well
        setThemes(prev => 
          prev.map(theme => ({
            ...theme,
            categories: theme.categories.map(category => ({
              ...category,
              subCategories: category.subCategories.map(subCategory => ({
                ...subCategory,
                questions: subCategory.questions.map(q => 
                  q.id === selectedQuestion.id ? updatedQuestion : q
                )
              }))
            }))
          }))
        );
      }
    }
  };

  const revealHintClue = () => {
    if (selectedQuestion && selectedQuestion.hint?.type === 'clues' && selectedQuestion.hint.clues) {
      if (revealedHintClues < selectedQuestion.hint.clues.length) {
        setRevealedHintClues(prev => prev + 1);
        
        // Deduct points for revealing a hint clue
        const newPoints = selectedQuestion.currentPoints;
        
        const updatedQuestion = { 
          ...selectedQuestion, 
          currentPoints: newPoints
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update in themes as well
        setThemes(prev => 
          prev.map(theme => ({
            ...theme,
            categories: theme.categories.map(category => ({
              ...category,
              subCategories: category.subCategories.map(subCategory => ({
                ...subCategory,
                questions: subCategory.questions.map(q => 
                  q.id === selectedQuestion.id ? updatedQuestion : q
                )
              }))
            }))
          }))
        );
      }
    }
  };

  const toggleAnswer = () => setShowAnswer(!showAnswer);

  const toggleHint = () => {
    if (!showHint && selectedQuestion) {
      // Reduce points to half when showing hint
      const newPoints = Math.floor(selectedQuestion.currentPoints / 2);
      const updatedQuestion = { ...selectedQuestion, currentPoints: newPoints };
      setSelectedQuestion(updatedQuestion);
      
      // Update in themes as well
      setThemes(prev => 
        prev.map(theme => ({
          ...theme,
          categories: theme.categories.map(category => ({
            ...category,
            subCategories: category.subCategories.map(subCategory => ({
              ...subCategory,
              questions: subCategory.questions.map(q => 
                q.id === selectedQuestion.id ? updatedQuestion : q
              )
            }))
          }))
        }))
      );
    }
    setShowHint(!showHint);
  };

  return {
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
  };
};