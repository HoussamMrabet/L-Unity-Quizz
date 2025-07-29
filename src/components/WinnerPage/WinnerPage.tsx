import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Trophy, Sparkles, Home, RotateCcw } from 'lucide-react';
import { Player } from '../../types';
import { sortPlayersByScore } from '../../utils/scoreUtils';

interface WinnerPageProps {
  players: Player[];
  onResetQuiz: () => void;
  onResetPlayers: () => void;
}

export const WinnerPage: React.FC<WinnerPageProps> = ({
  players,
  onResetQuiz,
  onResetPlayers,
}) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const sortedPlayers = sortPlayersByScore(players);
  const winner = sortedPlayers[0];

  useEffect(() => {
    // Delay content appearance for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    onResetQuiz();
    onResetPlayers();
    navigate('/quiz');
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/test_4.jpg')"
      }}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90 backdrop-blur-sm z-0"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className={`text-center max-w-4xl mx-auto px-6 relative z-10 transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } mt-5`}>
        
        {/* Victory Banner */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <Crown className="text-yellow-400 w-8 h-8 mx-4" />
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4 animate-text-reveal">
            GAME OVER
          </h1>
          
          <p className="text-slate-300 text-xl md:text-2xl font-medium">
            Quiz Contest Complete
          </p>
        </div>

        {/* Winner Card */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-yellow-400/30 p-8 mb-8 shadow-2xl shadow-yellow-400/10 animate-popup-enter">
          {/* Winner Crown */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/30">
                <Crown className="w-12 h-12 text-yellow-900" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse delay-500" />
              </div>
            </div>
          </div>

          {/* Winner Info */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {winner.name}
            </h2>
            <p className="text-yellow-400 text-xl font-semibold mb-4">
              Master of the Rift
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-6 py-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{winner.score} Points</span>
            </div>
          </div>

          {/* Prize Announcement */}
          <div className="bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 rounded-2xl border border-yellow-400/20 p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                <img src="/spirit.png" alt="Spirit Blossom" className="w-16 h-16 rounded-full" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              🎉 Congratulations! 🎉
            </h3>
            <p className="text-slate-300 text-lg mb-3">
              You've won the <span className="text-cyan-400 font-semibold">Spirit Blossom Beyond: Act 2 Pass</span>
            </p>
            <p className="text-yellow-400 font-bold text-xl">
              Worth 1650 RP
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        {sortedPlayers.length > 1 && (
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-600/30 p-6 mb-8 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-slate-400" />
              Final Leaderboard
            </h3>
            <div className="space-y-3">
              {sortedPlayers.slice(0, 5).map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    index === 0
                      ? 'bg-yellow-400/10 border border-yellow-400/30'
                      : index === 1
                      ? 'bg-slate-400/10 border border-slate-400/30'
                      : index === 2
                      ? 'bg-orange-400/10 border border-orange-400/30'
                      : 'bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? 'bg-yellow-400 text-yellow-900'
                        : index === 1
                        ? 'bg-slate-400 text-slate-900'
                        : index === 2
                        ? 'bg-orange-400 text-orange-900'
                        : 'bg-slate-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{player.name}</span>
                  </div>
                  <span className={`font-bold ${
                    index === 0 ? 'text-yellow-400' : 'text-slate-300'
                  }`}>
                    {player.score} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
          <button
            onClick={handlePlayAgain}
            className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Play Again</span>
            </div>
          </button>
          
          <button
            onClick={handleBackToMain}
            className="group bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Back to Main</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};