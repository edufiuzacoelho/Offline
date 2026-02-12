import { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

const REDEEM_DURATION_SECONDS = 60; // 1 minute

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

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ReelsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [couponsUsed, setCouponsUsed] = useState(3);
  const totalCoupons = 10;
  const [redeemedReel, setRedeemedReel] = useState<typeof reels[0] | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(REDEEM_DURATION_SECONDS);

  const currentReel = reels[currentIndex];
  const remainingCoupons = totalCoupons - couponsUsed;

  // Countdown when a code is redeemed
  useEffect(() => {
    if (redeemedReel == null) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRedeemedReel(null);
          return REDEEM_DURATION_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [redeemedReel]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleWeGo = () => {
    if (couponsUsed >= totalCoupons) return;
    const confirmed = window.confirm(
      "Do you really want to redeem this code? This action cannot be undone."
    );
    if (!confirmed) return;
    setCouponsUsed(couponsUsed + 1);
    setRedeemedReel(currentReel);
    setSecondsLeft(REDEEM_DURATION_SECONDS);
  };

  // Redeemed: full-screen timer over entire app (white & green, gaming font)
  if (redeemedReel) {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center min-h-screen p-6"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <div className="text-center text-green-600 flex flex-col items-center justify-center gap-20 sm:gap-28 w-full max-w-lg mx-auto flex-1">
          <div className="w-full">
            <div className="text-xl sm:text-2xl font-bold uppercase tracking-[0.35em] text-green-600/80 mb-5">
              Your code
            </div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-wide text-green-600 break-words">
              {redeemedReel.discount}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-green-700 mt-4">
              {redeemedReel.location}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-green-600/80">
              Time remaining
            </div>
            <div className="text-8xl sm:text-9xl font-black tabular-nums tracking-tighter text-green-600 leading-none">
              {formatTime(secondsLeft)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 relative">
      {/* Current reel - one at a time, no scroll */}
      <div className="h-full w-full relative">
        <div className="h-full w-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-6xl">🍔</span>
            </div>
            <div className="text-white text-2xl font-bold">{currentReel.location}</div>
            <div className="text-green-300 text-xl font-semibold mt-2">{currentReel.discount}</div>
          </div>
        </div>

        <div className="absolute bottom-24 left-4 right-4 z-10 text-white">
          <div className="font-semibold text-lg">{currentReel.username}</div>
          <div className="text-sm mt-1 opacity-90">{currentReel.description}</div>
        </div>

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

      {/* Remaining Codes */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
        <span className="text-white text-sm font-semibold">
          Remaining Codes: {remainingCoupons}
        </span>
      </div>

      {/* Toggle - previous/next reels */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label="Previous reel"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label="Next reel"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
