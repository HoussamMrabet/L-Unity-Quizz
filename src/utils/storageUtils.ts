import { Player, Theme } from '../types';

const PLAYERS_STORAGE_KEY = 'quiz-arena-players';
const THEMES_STORAGE_KEY = 'quiz-arena-themes';

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

export const saveThemesToStorage = (themes: Theme[]): void => {
  try {
    localStorage.setItem(THEMES_STORAGE_KEY, JSON.stringify(themes));
  } catch (error) {
    console.error('Failed to save themes to localStorage:', error);
  }
};

export const loadThemesFromStorage = (): Theme[] | null => {
  try {
    const stored = localStorage.getItem(THEMES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load themes from localStorage:', error);
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

export const clearThemesFromStorage = (): void => {
  try {
    localStorage.removeItem(THEMES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear themes from localStorage:', error);
  }
};

export const generatePlayerId = (): string => {
  return `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};