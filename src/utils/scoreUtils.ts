import { Player, Question } from '../types';

export const calculatePenalty = (basePoints: number): number => {
  return Math.floor(basePoints / 2);
};

export const updatePlayerScore = (
  players: Player[],
  playerId: string,
  scoreChange: number
): Player[] => {
  return players.map((player) =>
    player.id === playerId 
      ? { ...player, score: player.score + scoreChange } 
      : player
  );
};

export const sortPlayersByScore = (players: Player[]): Player[] => {
  return [...players].sort((a, b) => b.score - a.score);
};

export const getRankColor = (index: number): string => {
  switch (index) {
    case 0:
      return 'bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 border-yellow-400/50 shadow-lg shadow-yellow-400/20';
    case 1:
      return 'bg-gradient-to-r from-slate-600/20 to-slate-400/20 border-slate-400/50 shadow-lg shadow-slate-400/20';
    case 2:
      return 'bg-gradient-to-r from-orange-600/20 to-orange-400/20 border-orange-400/50 shadow-lg shadow-orange-400/20';
    default:
      return 'bg-slate-700/50 border-slate-600/50 hover:border-blue-400/50';
  }
};

export const getRankBadgeColor = (index: number): string => {
  switch (index) {
    case 0:
      return 'bg-yellow-400 text-slate-900';
    case 1:
      return 'bg-slate-400 text-slate-900';
    case 2:
      return 'bg-orange-600 text-white';
    default:
      return 'bg-slate-600 text-white';
  }
};