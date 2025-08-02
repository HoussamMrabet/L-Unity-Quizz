import React from 'react';
import { Theme } from '../../types';
import { ThemeCard } from './ThemeCard';

interface ThemeGridProps {
  themes: Theme[];
  onSelectTheme: (themeId: string) => void;
}

export const ThemeGrid: React.FC<ThemeGridProps> = ({
  themes,
  onSelectTheme,
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7] mb-2">
          Choose Your Theme
        </h2>
        <p className="text-blue-300">Select a theme to explore categories and test your League of Legends knowledge</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onSelectTheme={onSelectTheme}
          />
        ))}
      </div>
    </div>
  );
};