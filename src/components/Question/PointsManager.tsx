import React from 'react';
import { Question } from '../../types';

interface PointsManagerProps {
  question: Question;
  // onAdjustPoints: (change: number) => void;
}

export const PointsManager: React.FC<PointsManagerProps> = ({
  question,
}) => {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Points Management</h4>
      <div>
        <p className="text-gray-300">
          Base Points: <span className="text-blue-400 font-bold">{question.basePoints}</span>
        </p>
        <p className="text-gray-300">
          Current Points: <span className="text-yellow-400 font-bold">{question.currentPoints}</span>
        </p>
        <p className="text-gray-300 text-sm mt-2">
          Unzoom Penalty: <span className="text-red-400 font-bold">-{question.pointDeduction}</span>
        </p>
      </div>
    </div>
  );
};