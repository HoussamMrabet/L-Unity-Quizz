import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
        QUIZ ARENA
      </h1>
      <p className="text-blue-300 text-lg">League of Legends Tournament Quiz</p>
    </div>
  );
};