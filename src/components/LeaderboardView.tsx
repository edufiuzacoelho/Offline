import { MedalIcon, TrophyIcon } from "lucide-react";

const leaderboardData = [
  { rank: 1, username: "FoodieKing", points: 2450, avatar: "👑" },
  { rank: 2, username: "CoffeeQueen", points: 2180, avatar: "☕" },
  { rank: 3, username: "BurgerBoss", points: 1920, avatar: "🍔" },
  { rank: 4, username: "PizzaMaster", points: 1750, avatar: "🍕" },
  { rank: 5, username: "SushiSensei", points: 1590, avatar: "🍣" },
];

const currentUser = { rank: 23, username: "You", points: 845, avatar: "😊" };

export function LeaderboardView() {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getMedalBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50";
      case 2:
        return "bg-gray-50";
      case 3:
        return "bg-orange-50";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <TrophyIcon className="w-6 h-6 text-green-600" />
          <h1 className="text-xl font-semibold text-gray-900">Leaderboard</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Top 5 */}
        <div className="px-4 py-4 space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`${getMedalBg(user.rank)} rounded-xl p-4 flex items-center gap-4 border ${
                user.rank <= 3 ? "border-gray-200" : "border-gray-100"
              } shadow-sm`}
            >
              {/* Rank/Medal */}
              <div className="flex-shrink-0 w-12 flex justify-center">
                {user.rank <= 3 ? (
                  <MedalIcon className={`w-8 h-8 ${getMedalColor(user.rank)}`} fill="currentColor" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">{user.rank}</span>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                {user.avatar}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{user.username}</div>
                <div className="text-sm text-gray-500">{user.points.toLocaleString()} points</div>
              </div>

              {/* Rank Badge */}
              {user.rank <= 3 && (
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMedalColor(user.rank)} bg-white`}>
                  #{user.rank}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="border-t-2 border-dashed border-gray-300 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
              • • •
            </div>
          </div>
        </div>

        {/* Current User Position */}
        <div className="px-4 pb-6">
          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4 border-2 border-green-500 shadow-md">
            {/* Rank */}
            <div className="flex-shrink-0 w-12 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentUser.rank}</span>
              </div>
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-2xl flex-shrink-0">
              {currentUser.avatar}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{currentUser.username}</div>
              <div className="text-sm text-gray-600">{currentUser.points.toLocaleString()} points</div>
            </div>

            {/* Badge */}
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
              You
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
