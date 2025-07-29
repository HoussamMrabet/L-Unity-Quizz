import { useState } from 'react';
import { Question, Category, QuizView } from '../types';

export const useQuestions = (initialCategories: Category[] | (() => Category[])) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [currentView, setCurrentView] = useState<QuizView>('categories');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const selectQuestion = (questionId: string) => {
    const question = categories
      .flatMap(cat => cat.questions)
      .find(q => q.id === questionId);
    
    if (question && !question.isCompleted) {
      setSelectedQuestion(question);
      setCurrentView('question');
      setShowAnswer(false);
      setShowHint(false);
    }
  };

  const markQuestionCompleted = () => {
    if (selectedQuestion) {
      setCategories(prev => 
        prev.map(category => ({
          ...category,
          questions: category.questions.map(q => 
            q.id === selectedQuestion.id ? { ...q, isCompleted: true } : q
          )
        }))
      );
    }
  };

  const backToCategories = () => {
    setCurrentView('categories');
    setSelectedQuestion(null);
    setShowAnswer(false);
    setShowHint(false);
  };

  const nextQuestion = () => {
    markQuestionCompleted();
    backToCategories();
  };

  const adjustZoom = (change: number) => {
    if (selectedQuestion && selectedQuestion.type === 'progressive') {
      const newZoomLevel = Math.max(100, Math.min(500, (selectedQuestion.zoomLevel || 300) + change));
      
      // Deduct points for unzoom (when decreasing zoom)
      if (change < 0) {
        const newPoints = Math.max(0, selectedQuestion.currentPoints - selectedQuestion.pointDeduction);
        const updatedQuestion = { 
          ...selectedQuestion, 
          zoomLevel: newZoomLevel,
          currentPoints: newPoints
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update in categories as well
        setCategories(prev => 
          prev.map(category => ({
            ...category,
            questions: category.questions.map(q => 
              q.id === selectedQuestion.id ? updatedQuestion : q
            )
          }))
        );
      } else {
        const updatedQuestion = { ...selectedQuestion, zoomLevel: newZoomLevel };
        setSelectedQuestion(updatedQuestion);
        
        setCategories(prev => 
          prev.map(category => ({
            ...category,
            questions: category.questions.map(q => 
              q.id === selectedQuestion.id ? updatedQuestion : q
            )
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
      
      // Update in categories as well
      setCategories(prev => 
        prev.map(category => ({
          ...category,
          questions: category.questions.map(q => 
            q.id === selectedQuestion.id ? updatedQuestion : q
          )
        }))
      );
    }
    setShowHint(!showHint);
  };

  return {
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
  };
};