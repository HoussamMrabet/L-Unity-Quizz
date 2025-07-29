import type React from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

interface Reward {
  id: number
  title: string
  image: string
}

const rewards: Reward[] = [
  { id: 1, title: "Spirit Orb", image: "/orb" },
  { id: 2, title: "Prestige Spirit Blossom Zed", image: "/zed.webp" },
  { id: 3, title: "Mythic Essence", image: "/mythic.webp" },
  { id: 4, title: "Orange Essence", image: "/orange.webp" },
  { id: 5, title: "Nightbringer Evelynn", image: "/evelynn.webp" },
  { id: 6, title: "Dawnbringer Janna", image: "/janna.webp" },
]

export const MainPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [hoveredReward, setHoveredReward] = useState<number | null>(null)

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % rewards.length)
  }

  const handleJoinDiscord = (): void => {
    // Replace with your actual Discord server invite link
    window.open('https://discord.gg/3mrCj6xE', '_blank')
  }
  // Get 4 visible rewards with circular wrapping
  const getVisibleRewards = (): Reward[] => {
    const visible: Reward[] = []
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % rewards.length
      visible.push(rewards[index])
    }
    return visible
  }

  const visibleRewards = getVisibleRewards()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Spirit Blossom Background"
          className="w-[200vw] h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Discord Server Logo - Top Right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <img src="/lunity.png" alt="LUnity" className="w-8 h-8 bg-contain text-white" />
          {/* <FaDiscord className="w-5 h-5 text-white" /> */}
        </div>
        <span className="text-white font-medium text-sm">Hosted by LUnity Server</span>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Title and Description */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  L Unity
                </span>
                <br />
                <span className="text-white">Quiz Event</span>
              </h1>

              <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
                Join us on <strong>LUnity</strong> for an unforgettable League of Legends quiz event! Prove your knowledge of champions, lore, and game mechanics to win the exclusive <strong>Spirit Blossom: Beyond Pass</strong> and other mystical rewards. Do you have what it takes to transcend the Spirit Realm?
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center gap-3">
                  <MdEventAvailable className="w-5 h-5" />
                  Join the Event
                </button>
                
                <button 
                  onClick={handleJoinDiscord}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center gap-3"
                >
                  <FaDiscord className="w-5 h-5" />
                  Join Discord
                </button>
              </div>
            </div>

            {/* Rewards Slider */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Event Rewards</h3>

              <div className="flex items-center space-x-4 relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                  {visibleRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="relative aspect-square rounded-lg bg-white/5 p-2 flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                      onMouseEnter={() => setHoveredReward(reward.id)}
                      onMouseLeave={() => setHoveredReward(null)}
                    >
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="max-h-full max-w-full object-contain"
                      />
                      
                      {/* Tooltip */}
                      {hoveredReward === reward.id && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl border border-white/20 z-50">
                          {reward.title}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next rewards"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Character Image */}
          <div className="relative flex justify-center order-1 lg:order-2 lg:justify-end">
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-cyan-400/30 rounded-full blur-3xl scale-110 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />

              {/* Character Image */}
              <div className="relative z-10 animate-softBounce" style={{ animationDuration: '3s' }}>
                <img
                  src="/pass"
                  alt="Spirit Blossom Champion"
                  className="w-full lg:w-screen h-auto drop-shadow-2xl"
                />
              </div>

              {/* Additional Highlight Effects */}
              <div className="absolute top-1/4 -left-8 w-32 h-32 bg-pink-400/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute bottom-1/4 -right-8 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-cyan-400/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
