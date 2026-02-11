import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, HeartIcon, ShareIcon } from "lucide-react";

const reels = [
  {
    id: 1,
    username: "@foodie_adventures",
    location: "Joe's Coffee",
    discount: "30% OFF",
    description: "Amazing latte art and cozy vibes! ☕",
  },
  {
    id: 2,
    username: "@burger_lover",
    location: "Burger Palace",
    discount: "Buy 1 Get 1",
    description: "Best burgers in town! 🍔",
  },
  {
    id: 3,
    username: "@coffee_daily",
    location: "Cafe Luna",
    discount: "25% OFF",
    description: "Perfect spot for work and coffee ☕💻",
  },
];

export function ReelsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [couponsUsed, setCouponsUsed] = useState(3);
  const totalCoupons = 10;

  const currentReel = reels[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleWeGo = () => {
    if (couponsUsed < totalCoupons) {
      setCouponsUsed(couponsUsed + 1);
      alert(`Coupon activated for ${currentReel.location}! 🎉`);
    }
  };

  return (
    <div className="h-full bg-gray-900 relative">
      {/* Coupon Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
        <span className="text-white text-sm font-semibold">
          {couponsUsed}/{totalCoupons}
        </span>
      </div>

      {/* Mock Video Content */}
      <div className="h-full w-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative">
        <div className="text-center">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-6xl">🍔</span>
          </div>
          <div className="text-white text-2xl font-bold">{currentReel.location}</div>
          <div className="text-green-300 text-xl font-semibold mt-2">{currentReel.discount}</div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <button
          onClick={handlePrev}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Interaction Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-4 z-10">
        <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-white hover:bg-black/50 transition-colors">
          <HeartIcon className="w-6 h-6" />
          <span className="text-xs mt-0.5">234</span>
        </button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-white hover:bg-black/50 transition-colors">
          <ShareIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-24 left-4 right-4 z-10 text-white">
        <div className="font-semibold text-lg">{currentReel.username}</div>
        <div className="text-sm mt-1 opacity-90">{currentReel.description}</div>
      </div>

      {/* We Go Button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleWeGo}
          disabled={couponsUsed >= totalCoupons}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-12 py-3.5 rounded-full font-bold text-lg shadow-lg transition-colors"
        >
          We Go
        </button>
      </div>
    </div>
  );
}