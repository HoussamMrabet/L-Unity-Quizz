import { Theme } from '../types';

export const areAllQuestionsCompleted = (themes: Theme[]): boolean => {
  return themes.every(theme => 
    theme.categories.every(category =>
      category.subCategories.every(subCategory =>
        subCategory.questions.every(question => question.isCompleted === true)
      )
    )
  );
};

export const getTotalQuestions = (themes: Theme[]): number => {
  return themes.reduce((total, theme) => 
    total + theme.categories.reduce((catTotal, category) =>
      catTotal + category.subCategories.reduce((subTotal, subCategory) =>
        subTotal + subCategory.questions.length, 0
      ), 0
    ), 0
  );
};

export const getCompletedQuestions = (themes: Theme[]): number => {
  return themes.reduce((total, theme) => 
    total + theme.categories.reduce((catTotal, category) =>
      catTotal + category.subCategories.reduce((subTotal, subCategory) =>
        subTotal + subCategory.questions.filter(q => q.isCompleted).length, 0
      ), 0
    ), 0
  );
};