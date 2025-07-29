import React from 'react';
import { X, Crown } from 'lucide-react';
import { Player } from '../../types';
import { getRankColor, getRankBadgeColor } from '../../utils/scoreUtils';

interface CompactPlayerCardProps {
  player: Player;
  rank: number;
  canRemove: boolean;
  isFirstPlace: boolean;
  onIncrementScore: () => void;
  onDecrementScore: () => void;
  onUpdateScore: (score: number) => void;
  onUpdateName: (name: string) => void;
  onRemovePlayer: () => void;
}

export const CompactPlayerCard: React.FC<CompactPlayerCardProps> = ({
  player,
  rank,
  canRemove,
  isFirstPlace,
  onIncrementScore,
  onDecrementScore,
  onUpdateScore,
  onUpdateName,
  onRemovePlayer,
}) => {
  if (isFirstPlace) {
    return (
      <div className="relative p-6 rounded-xl border-2 border-yellow-400/70 bg-gradient-to-r from-yellow-600/20 via-yellow-400/20 to-yellow-600/20 shadow-2xl shadow-yellow-400/30 transition-all duration-300">
        {/* Crown decoration */}

        {/* Sparkle effects */}
        <div className="absolute top-2 right-2 text-yellow-400/60 animate-pulse">
          ✨
        </div>
        <div className="absolute top-4 left-2 text-yellow-400/60 animate-pulse delay-500">
          ⭐
        </div>

        {canRemove && (
          <div className="absolute top-2 right-8">
            <button
              onClick={onRemovePlayer}
              className="text-red-400 hover:text-red-300 transition-colors duration-200"
              title="Remove player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-4xl font-bold text-yellow-900 shadow-lg">
                👑
              </div>
              <span className="text-xs text-yellow-400 font-semibold mt-1">Current Winner</span>
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={player.name}
                onChange={(e) => onUpdateName(e.target.value)}
                className="w-full bg-transparent text-white font-bold text-xl border-none outline-none focus:bg-slate-700/50 rounded px-3 py-2 transition-colors duration-200 placeholder-yellow-200/50"
                placeholder="Champion name"
              />
              <input
                type="text"
                value={player.score + " pts"}
                onChange={(e) => onUpdateScore(parseInt(e.target.value) || 0)}
                className="w-full bg-transparent text-yellow-400 font-bold text-3xl border-none outline-none focus:bg-slate-700/50 rounded px-3 py-2 transition-colors duration-200 placeholder-yellow-200/50 mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {/* <input
                type="number"
                value={player.score}
                onChange={(e) => onUpdateScore(parseInt(e.target.value) || 0)}
                className="w-20 bg-slate-700 border border-yellow-400/50 text-yellow-400 font-bold text-center px-3 py-2 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              /> */}
              <button
                onClick={onIncrementScore}
                className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-lg"
              >
                +
              </button>
              <button
                onClick={onDecrementScore}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-lg"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-lg border transition-all duration-300 ${getRankColor(rank)}`}>
      {canRemove && (
        <div className="flex justify-end mb-1">
          <button
            onClick={onRemovePlayer}
            className="text-red-400 hover:text-red-300 transition-colors duration-200"
            title="Remove player"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
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