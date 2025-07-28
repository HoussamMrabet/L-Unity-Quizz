import React from 'react';
import { Gift, Play } from 'lucide-react';

interface MainPageProps {
  onStartQuiz: () => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onStartQuiz }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/test_4.jpg')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5BD8FF] to-[#B2E9F7] mb-4">
            L Unity Quizz
          </h1>
          <p className="text-[#B2E9F7] text-xl md:text-2xl mb-2">League of Legends Event</p>
          <p className="text-[#D3D8E0] text-lg">Test your knowledge & compete for the Spirit Blossom Pass!</p>
        </div>

        {/* Event Pass Gift */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-[#FFD700]/30 p-8 mb-12 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gift className="text-[#3DDCFF] w-8 h-8" />
            <h2 className="text-3xl font-bold text-white">Spirit Blossom Beyond: Act 2 Pass</h2>
            <Gift className="text-[#3DDCFF] w-8 h-8" />
          </div>

          <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFF8DC]/10 rounded-xl p-6 border border-[#FFD700]/30">
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2371C6] to-[#3DDCFF] rounded-full flex items-center justify-center shadow-lg">
                  <img src="/spirit.png" alt="" className='w-24 h-24' />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#B2E9F7] mb-2">Spirit Blossom Beyond: Act 2 Pass (1650 RP)</h3>
            <p className="text-[#D3D8E0] text-lg mb-4">
              Win this exclusive pass to unlock premium Spirit Blossom skins and exclusive in-game content!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>legendary Skins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>ORBS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Exclusive content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartQuiz}
          className="group bg-gradient-to-r from-[#2371C6] to-[#3DDCFF] hover:from-[#3DDCFF] hover:to-[#7AE5FF] text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#5BD8FF]/30"
        >
          <div className="flex items-center gap-4">
            <Play className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" />
            <span>START QUIZ</span>
          </div>
        </button>

        <p className="text-gray-400 mt-6 text-lg">
          Answer questions correctly to earn points and climb the L Unity leaderboard!
        </p>
      </div>
    </div>
  );
};
