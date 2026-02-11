import { MapPinIcon, CoffeeIcon, UtensilsIcon } from "lucide-react";

const locations = [
  { id: 1, name: "Joe's Coffee", type: "coffee", x: 30, y: 40, raid: true },
  { id: 2, name: "Burger Palace", type: "restaurant", x: 60, y: 25, raid: true },
  { id: 3, name: "Cafe Luna", type: "coffee", x: 45, y: 60, raid: true },
  { id: 4, name: "Pizza House", type: "restaurant", x: 75, y: 70, raid: true },
  { id: 5, name: "Bean & Co", type: "coffee", x: 20, y: 75, raid: true },
];

export function MapView() {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900">Active Raids</h1>
      </header>
      
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
          {/* Grid pattern for map effect */}
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* User Location */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>

        {/* Restaurant and Coffee Shop Locations */}
        {locations.map((location) => (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
          >
            <div className="relative group">
              <div className="w-10 h-10 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                {location.type === "coffee" ? (
                  <CoffeeIcon className="w-5 h-5 text-white" />
                ) : (
                  <UtensilsIcon className="w-5 h-5 text-white" />
                )}
              </div>
              {/* Raid indicator */}
              {location.raid && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {location.name}
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-30">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <CoffeeIcon className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-gray-700">Coffee Raid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <UtensilsIcon className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-gray-700">Restaurant Raid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
