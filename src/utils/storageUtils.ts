import { Player, Category } from '../types';

const PLAYERS_STORAGE_KEY = 'quiz-arena-players';
const CATEGORIES_STORAGE_KEY = 'quiz-arena-categories';

export const savePlayersToStorage = (players: Player[]): void => {
  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
  } catch (error) {
    console.error('Failed to save players to localStorage:', error);
  }
};

export const loadPlayersFromStorage = (): Player[] | null => {
  try {
    const stored = localStorage.getItem(PLAYERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load players from localStorage:', error);
    return null;
  }
};

export const saveCategoriesToStorage = (categories: Category[]): void => {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories to localStorage:', error);
  }
};

export const loadCategoriesFromStorage = (): Category[] | null => {
  try {
    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load categories from localStorage:', error);
    return null;
  }
};

export const clearPlayersFromStorage = (): void => {
  try {
    localStorage.removeItem(PLAYERS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear players from localStorage:', error);
  }
};

export const clearCategoriesFromStorage = (): void => {
  try {
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear categories from localStorage:', error);
  }
};

export const generatePlayerId = (): string => {
  return `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};