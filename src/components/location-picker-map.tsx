"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Button } from "@/components/ui/button"
import { MapPin, Locate } from "lucide-react"

interface LocationPickerMapProps {
  initialLongitude?: number
  initialLatitude?: number
  onLocationSelected: (longitude: number, latitude: number) => void
}

export function LocationPickerMap({
  initialLongitude = 110.3695,
  initialLatitude = -7.7956,
  onLocationSelected,
}: LocationPickerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => {
    if (map.current) return // initialize map only once

    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is required")
      return
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [initialLongitude, initialLatitude],
        zoom: 13,
      })

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Add initial marker
      marker.current = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true,
      })
        .setLngLat([initialLongitude, initialLatitude])
        .addTo(map.current)

      // Update coordinates when marker is dragged
      marker.current.on("dragend", () => {
        const lngLat = marker.current!.getLngLat()
        onLocationSelected(lngLat.lng, lngLat.lat)
      })

      // Add click event to update marker position
      map.current.on("click", (e) => {
        marker.current!.setLngLat(e.lngLat)
        onLocationSelected(e.lngLat.lng, e.lngLat.lat)
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [initialLongitude, initialLatitude, onLocationSelected])

  const handleSelectSearchResult = (result: any) => {
    const [lng, lat] = result.center

    if (map.current && marker.current) {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
      })

      marker.current.setLngLat([lng, lat])
      onLocationSelected(lng, lat)
    }

    setShowSearchResults(false)
    setSearchQuery(result.place_name)
  }

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords

          if (map.current && marker.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 15,
            })

            marker.current.setLngLat([longitude, latitude])
            onLocationSelected(longitude, latitude)
          }
        },
        (error) => {
          console.error("Error getting user location:", error)
        },
      )
    }
  }

  return (
    <div className="relative w-full h-[400px] rounded-md overflow-hidden border">
      {/* Search controls */}
      <div className="absolute top-4 left-4 z-10 w-[calc(100%-32px)] max-w-md">
        {/* Search results dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                onClick={() => handleSelectSearchResult(result)}
              >
                <div className="font-medium">{result.text}</div>
                <div className="text-xs text-gray-500">{result.place_name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User location button */}
      <Button
        size="icon"
        variant="outline"
        onClick={handleUserLocation}
        className="absolute top-4 left-4 z-10 bg-card backdrop-blur-sm shadow-lg"
        title="Gunakan lokasi saya"
      >
        <Locate className="h-4 w-4" />
      </Button>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 bg-card backdrop-blur-sm p-2 rounded-md shadow-lg text-xs max-w-xs">
        <div className="flex items-center gap-1 font-medium mb-1">
          <MapPin className="h-3 w-3 text-red-500" />
          Petunjuk:
        </div>
        <ul className="list-disc pl-4 space-y-1">
          <li>Klik pada peta untuk memilih lokasi</li>
          <li>Drag marker merah untuk menyesuaikan posisi</li>
          <li>Gunakan pencarian untuk menemukan lokasi</li>
        </ul>
      </div>

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
