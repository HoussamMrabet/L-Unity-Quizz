import { Category } from '../types';

export const areAllQuestionsCompleted = (categories: Category[]): boolean => {
  return categories.every(category => 
    category.questions.every(question => question.isCompleted === true)
  );
};

export const getTotalQuestions = (categories: Category[]): number => {
  return categories.reduce((total, category) => total + category.questions.length, 0);
};

export const getCompletedQuestions = (categories: Category[]): number => {
  return categories.reduce((total, category) => 
    total + category.questions.filter(q => q.isCompleted).length, 0
  );
};