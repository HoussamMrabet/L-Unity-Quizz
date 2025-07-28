import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSetTimer: (seconds: number) => void;
  onAdjustTimer: (seconds: number) => void;
}

export const Timer: React.FC<TimerProps> = ({
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
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-[#5BD8FF] w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Timer</h2>
      </div>
      <div className="text-center">
        <div className={`text-6xl font-bold mb-4 transition-colors duration-300 ${getTimerColor()}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => onSetTimer(15)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            15s
          </button>
          <button
            onClick={() => onSetTimer(30)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            30s
          </button>
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onAdjustTimer(-5)}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            -5s
          </button>
          <button
            onClick={() => onAdjustTimer(5)}
            className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            +5s
          </button>
        </div>
      </div>
    </div>
  );
};