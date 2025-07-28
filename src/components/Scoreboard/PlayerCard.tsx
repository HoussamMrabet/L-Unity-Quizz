import React from 'react';
import { Player } from '../../types';
import { getRankColor, getRankBadgeColor } from '../../utils/scoreUtils';

interface PlayerCardProps {
  player: Player;
  rank: number;
  currentPoints: number;
  penalty: number;
  onIncrementScore: () => void;
  onDecrementScore: () => void;
  onUpdateScore: (score: number) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  rank,
  currentPoints,
  penalty,
  onIncrementScore,
  onDecrementScore,
  onUpdateScore,
}) => {
  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 ${getRankColor(rank)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadgeColor(rank)}`}>
            {rank + 1}
          </div>
          <div>
            <h3 className="text-white font-semibold">{player.name}</h3>
            <p className="text-2xl font-bold text-yellow-400">{player.score}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onIncrementScore}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg transition-colors duration-200 font-semibold"
        >
          +{currentPoints}
        </button>
        <button
          onClick={onDecrementScore}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition-colors duration-200 font-semibold"
        >
          -{penalty}
        </button>
      </div>
      <input
        type="number"
        value={player.score}
        onChange={(e) => onUpdateScore(parseInt(e.target.value) || 0)}
        className="w-full mt-2 bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 transition-colors duration-200"
        placeholder="Manual score"
      />
    </div>
  );
};