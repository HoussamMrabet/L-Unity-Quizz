import React from 'react';
import { Users, UserPlus, RotateCcw, RefreshCw } from 'lucide-react';
import { Player, Question } from '../../types';
import { CompactPlayerCard } from './CompactPlayerCard';
import { sortPlayersByScore, calculatePenalty, updatePlayerScore } from '../../utils/scoreUtils';
import { generatePlayerId } from '../../utils/storageUtils';

interface CompactScoreboardProps {
  players: Player[];
  currentQuestion: Question;
  onUpdatePlayers: (players: Player[]) => void;
  onResetPlayers?: () => void;
  onResetQuiz?: () => void;
}

export const CompactScoreboard: React.FC<CompactScoreboardProps> = ({
  players,
  currentQuestion,
  onUpdatePlayers,
  onResetPlayers,
  onResetQuiz,
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

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: generatePlayerId(),
      name: `Summoner ${players.length + 1}`,
      score: 0,
    };
    onUpdatePlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (playerId: string) => {
    if (players.length > 1) {
      const updatedPlayers = players.filter(player => player.id !== playerId);
      onUpdatePlayers(updatedPlayers);
    }
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="text-blue-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Scoreboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddPlayer}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold transition-colors duration-200"
            title="Add new player"
          >
            <UserPlus className="w-3 h-3" />
            Add
          </button>
          {onResetPlayers && (
            <button
              onClick={onResetPlayers}
              className="flex items-center gap-1 bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold transition-colors duration-200"
              title="Reset all players"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Players
            </button>
          )}
          {onResetQuiz && (
            <button
              onClick={onResetQuiz}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold transition-colors duration-200"
              title="Reset quiz progress"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Quiz
            </button>
          )}
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {/* First Place Player - Special Layout */}
        {sortedPlayers.length > 0 && (
          <div className="mb-4">
            <CompactPlayerCard
              key={sortedPlayers[0].id}
              player={sortedPlayers[0]}
              rank={0}
              canRemove={players.length > 1}
              isFirstPlace={true}
              onIncrementScore={() => handleIncrementScore(sortedPlayers[0].id)}
              onDecrementScore={() => handleDecrementScore(sortedPlayers[0].id)}
              onUpdateScore={(score) => handleUpdateScore(sortedPlayers[0].id, score)}
              onUpdateName={(name) => handleUpdateName(sortedPlayers[0].id, name)}
              onRemovePlayer={() => handleRemovePlayer(sortedPlayers[0].id)}
            />
          </div>
        )}
        
        {/* Rest of the Players - Grid Layout */}
        {sortedPlayers.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sortedPlayers.slice(1).map((player, index) => (
              <CompactPlayerCard
                key={player.id}
                player={player}
                rank={index + 1}
                canRemove={players.length > 1}
                isFirstPlace={false}
                onIncrementScore={() => handleIncrementScore(player.id)}
                onDecrementScore={() => handleDecrementScore(player.id)}
                onUpdateScore={(score) => handleUpdateScore(player.id, score)}
                onUpdateName={(name) => handleUpdateName(player.id, name)}
                onRemovePlayer={() => handleRemovePlayer(player.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};