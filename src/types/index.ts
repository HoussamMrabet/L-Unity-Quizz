export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: string;
  type: 'text' | 'audio' | 'image' | 'progressive' | 'clues' | 'blurred';
  content: string;
  answer?: string;
  answerImage?: string;
  basePoints: number;
  currentPoints: number;
  subCategory: string;
  pointDeduction: number; // Points deducted for unzoom (10 or 20)
  hint?: {
    type: 'text' | 'audio' | 'image' | 'clues';
    content?: string;
    audioUrl?: string;
    imageUrl?: string;
    clues?: string[];
  };
  isCompleted?: boolean;
  audioUrl?: string;
  imageUrl?: string;
  clues?: string[];
  revealedClues?: number;
  zoomLevel?: number;
  blurLevel?: number;
  clicksUsed?: number; // Track how many times zoom/blur has been adjusted
  zoomOrigin?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  zoomScale?: number; // Percentage scale for progressive zoom
  blurScale?: number; // Blur reduction amount per step
}

export interface SubCategory {
  id: string;
  name: string;
  color?: string;
  bg?: string;
  questions: Question[];
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  bg?: string;
  subCategories: SubCategory[];
}

export interface Theme {
  id: string;
  name: string;
  color?: string;
  bg?: string;
  categories: Category[];
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
}

export type AppPage = 'main' | 'quiz';
export type QuizView = 'themes' | 'categories' | 'subcategories' | 'question';