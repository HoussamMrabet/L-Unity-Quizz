export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: string;
  type: 'text' | 'audio' | 'image' | 'progressive';
  content: string;
  answer: string;
  answerImage?: string;
  basePoints: number;
  currentPoints: number;
  category: string;
  pointDeduction: number; // Points deducted for unzoom (10 or 20)
  hint?: {
    type: 'text' | 'audio' | 'image';
    content: string;
    audioUrl?: string;
    imageUrl?: string;
  };
  isCompleted?: boolean;
  audioUrl?: string;
  imageUrl?: string;
  zoomLevel?: number;
  zoomOrigin?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  bg?: string;
  questions: Question[];
}
export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
}

export type AppPage = 'main' | 'quiz';
export type QuizView = 'categories' | 'question';