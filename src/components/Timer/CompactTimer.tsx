import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface CompactTimerProps {
  timeLeft: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSetTimer: (seconds: number) => void;
  onAdjustTimer: (seconds: number) => void;
}

export const CompactTimer: React.FC<CompactTimerProps> = ({
  timeLeft,
  isRunning,
  onToggle,
  onReset,
  onSetTimer,
  onAdjustTimer,
}) => {
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-400';
    if (timeLeft <= 30) return 'text-[#5BD8FF]';
    return 'text-green-400';
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="text-[#5BD8FF] w-5 h-5" />
          <div className={`text-3xl font-bold transition-colors duration-300 ${getTimerColor()}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAdjustTimer(-5)}
            className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold transition-colors duration-200"
          >
            -5s
          </button>
          <button
            onClick={() => onAdjustTimer(5)}
            className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold transition-colors duration-200"
          >
            +5s
          </button>
          <button
            onClick={() => onSetTimer(15)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold transition-colors duration-200"
          >
            15s
          </button>
          <button
            onClick={() => onSetTimer(30)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold transition-colors duration-200"
          >
            30s
          </button>
          <button
            onClick={onToggle}
            className={`flex items-center gap-1 px-3 py-1 rounded font-semibold transition-colors duration-200 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1 bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded font-semibold transition-colors duration-200"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};