import { useState, useEffect, useRef } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentReel = reels[currentIndex];
  const remainingCoupons = totalCoupons - couponsUsed;

  // Track which reel is currently visible using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    reelRefs.current.forEach((reel, index) => {
      if (!reel) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px",
        }
      );

      observer.observe(reel);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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
          Remaining Coupons {remainingCoupons}/{totalCoupons}
        </span>
      </div>

      {/* Scrollable Container with CSS Scroll Snap */}
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            ref={(el) => {
              reelRefs.current[index] = el;
            }}
            className="h-full w-full snap-start relative"
          >
            {/* Mock Video Content */}
            <div className="h-full w-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-6xl">🍔</span>
                </div>
                <div className="text-white text-2xl font-bold">{reel.location}</div>
                <div className="text-green-300 text-xl font-semibold mt-2">{reel.discount}</div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-24 left-4 right-4 z-10 text-white">
              <div className="font-semibold text-lg">{reel.username}</div>
              <div className="text-sm mt-1 opacity-90">{reel.description}</div>
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
        ))}
      </div>
    </div>
  );
}