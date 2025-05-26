"use client";

import { MapboxMap } from "@/components/mapbox-map";
import { useState } from "react";

export default function Home() {
  const [activeStyle, setActiveStyle] = useState("mapbox://styles/mapbox/streets-v12");

  const mapStyles = [
    { id: "streets-v12", name: "Streets", style: "mapbox://styles/mapbox/streets-v12" },
    { id: "satellite-streets-v12", name: "Satellite", style: "mapbox://styles/mapbox/satellite-streets-v12" },
    { id: "dark-v11", name: "Dark", style: "mapbox://styles/mapbox/dark-v11" }
  ];

  return (
    <div className="h-full w-full relative">
      <MapboxMap mapStyle={activeStyle}/>

      {/* Floating Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {/* Stats Mini Cards */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">2,847</div>
              <div className="text-xs text-gray-600">Lokasi</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">1,234</div>
              <div className="text-xs text-gray-600">Users</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">89</div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
          </div>
        </div>

        {/* Map Style Controls */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="text-xs font-medium text-gray-700 mb-2">Map Style</div>
          <div className="flex gap-1">
            {mapStyles.map(style => (
              <button 
                key={style.id}
                onClick={() => setActiveStyle(style.style)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  activeStyle === style.style 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="text-xs font-medium text-gray-700 mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">Jakarta Pusat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Landmark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Bisnis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">Komersial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
