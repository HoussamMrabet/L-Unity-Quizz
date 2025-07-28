import React from 'react';
import { Player } from '../../types';
import { getRankColor, getRankBadgeColor } from '../../utils/scoreUtils';

interface CompactPlayerCardProps {
  player: Player;
  rank: number;
  onIncrementScore: () => void;
  onDecrementScore: () => void;
  onUpdateScore: (score: number) => void;
  onUpdateName: (name: string) => void;
}

export const CompactPlayerCard: React.FC<CompactPlayerCardProps> = ({
  player,
  rank,
  onIncrementScore,
  onDecrementScore,
  onUpdateScore,
  onUpdateName,
}) => {
  return (
    <div className={`p-3 rounded-lg border transition-all duration-300 ${getRankColor(rank)}`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadgeColor(rank)}`}>
          {rank + 1}
        </div>
        
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={player.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="w-full bg-transparent text-white font-semibold text-sm border-none outline-none focus:bg-slate-700/50 rounded px-2 py-1 transition-colors duration-200"
            placeholder="Summoner name"
          />
        </div>
        
        <input
          type="number"
          value={player.score}
          onChange={(e) => onUpdateScore(parseInt(e.target.value) || 0)}
          className="w-16 bg-slate-700 border border-slate-600 text-yellow-400 font-bold text-center px-2 py-1 rounded text-sm focus:outline-none focus:border-blue-400 transition-colors duration-200"
        />
        
        <div className="flex gap-1">
          <button
            onClick={onIncrementScore}
            className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold transition-colors duration-200"
          >
            +
          </button>
          <button
            onClick={onDecrementScore}
            className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold transition-colors duration-200"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};