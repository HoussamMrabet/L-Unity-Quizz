import React from 'react';
import { Users } from 'lucide-react';
import { Player, Question } from '../../types';
import { CompactPlayerCard } from './CompactPlayerCard';
import { sortPlayersByScore, calculatePenalty, updatePlayerScore } from '../../utils/scoreUtils';

interface CompactScoreboardProps {
  players: Player[];
  currentQuestion: Question;
  onUpdatePlayers: (players: Player[]) => void;
}

export const CompactScoreboard: React.FC<CompactScoreboardProps> = ({
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

  const handleUpdateName = (playerId: string, newName: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, name: newName } : player
    );
    onUpdatePlayers(updatedPlayers);
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-400 w-5 h-5" />
        <h2 className="text-lg font-bold text-white">Scoreboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
        {sortedPlayers.map((player, index) => (
          <CompactPlayerCard
            key={player.id}
            player={player}
            rank={index}
            onIncrementScore={() => handleIncrementScore(player.id)}
            onDecrementScore={() => handleDecrementScore(player.id)}
            onUpdateScore={(score) => handleUpdateScore(player.id, score)}
            onUpdateName={(name) => handleUpdateName(player.id, name)}
          />
        ))}
      </div>
    </div>
  );
};