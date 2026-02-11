import { Link, useLocation } from "react-router";
import { MapIcon, VideoIcon, TrophyIcon } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive("/") ? "text-green-600" : "text-gray-500"
          }`}
        >
          <MapIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Map</span>
        </Link>
        
        <Link
          to="/reels"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive("/reels") ? "text-green-600" : "text-gray-500"
          }`}
        >
          <VideoIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Reels</span>
        </Link>
        
        <Link
          to="/leaderboard"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive("/leaderboard") ? "text-green-600" : "text-gray-500"
          }`}
        >
          <TrophyIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Leaderboard</span>
        </Link>
      </div>
    </nav>
  );
}
