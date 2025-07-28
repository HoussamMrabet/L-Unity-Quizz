import React from 'react';
import { Users } from 'lucide-react';
import { Player, Question } from '../../types';
import { PlayerCard } from './PlayerCard';
import { sortPlayersByScore, calculatePenalty, updatePlayerScore } from '../../utils/scoreUtils';

interface ScoreboardProps {
  players: Player[];
  currentQuestion: Question;
  onUpdatePlayers: (players: Player[]) => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  players,
  currentQuestion,
  onUpdatePlayers,
}) => {
  const sortedPlayers = sortPlayersByScore(players);
  const penalty = calculatePenalty(currentQuestion.basePoints);

  const handleIncrementScore = (playerId: string) => {
    const updatedPlayers = updatePlayerScore(players, playerId, currentQuestion.currentPoints);
    onUpdatePlayers(updatedPlayers);
  };

  const handleDecrementScore = (playerId: string) => {
    const updatedPlayers = updatePlayerScore(players, playerId, -penalty);
    onUpdatePlayers(updatedPlayers);
  };

  const handleUpdateScore = (playerId: string, newScore: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, score: Math.max(0, newScore) } : player
    );
    onUpdatePlayers(updatedPlayers);
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-blue-400 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Scoreboard</h2>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedPlayers.map((player, index) => {
          const originalIndex = players.findIndex(p => p.id === player.id);
          return (
            <PlayerCard
              key={player.id}
              player={player}
              rank={index}
              currentPoints={currentQuestion.currentPoints}
              penalty={penalty}
              onIncrementScore={() => handleIncrementScore(player.id)}
              onDecrementScore={() => handleDecrementScore(player.id)}
              onUpdateScore={(score) => handleUpdateScore(player.id, score)}
            />
          );
        })}
      </div>
    </div>
  );
};