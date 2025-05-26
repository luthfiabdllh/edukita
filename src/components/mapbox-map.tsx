"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

interface MapboxMapProps {
  mapStyle?: string;
}


export function MapboxMap( { mapStyle = "mapbox://styles/mapbox/streets-v12" }: MapboxMapProps ) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

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
        style: mapStyle,
        center: [106.8456, -6.2088], // Jakarta coordinates
        zoom: 11,
      })

      // Add navigation control (moved to bottom right to avoid overlap)
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right")

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right",
      )

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left")

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-right")

      // Add multiple markers with different categories
      const locations = [
        {
          coords: [106.8456, -6.2088],
          color: "#ef4444",
          title: "Jakarta Pusat",
          description: "Ibu Kota Indonesia",
          category: "Pusat Kota",
        },
        {
          coords: [106.865, -6.1751],
          color: "#3b82f6",
          title: "Monas",
          description: "Monumen Nasional",
          category: "Landmark",
        },
        {
          coords: [106.8229, -6.1944],
          color: "#10b981",
          title: "Bundaran HI",
          description: "Pusat Bisnis Jakarta",
          category: "Bisnis",
        },
        {
          coords: [106.865, -6.2297],
          color: "#f59e0b",
          title: "Blok M",
          description: "Kawasan Komersial",
          category: "Komersial",
        },
        {
          coords: [106.7922, -6.2088],
          color: "#8b5cf6",
          title: "Grogol",
          description: "Kawasan Industri",
          category: "Industri",
        },
        {
          coords: [106.9014, -6.1944],
          color: "#ec4899",
          title: "Cakung",
          description: "Kawasan Timur Jakarta",
          category: "Residential",
        },
        {
          coords: [106.8456, -6.1751],
          color: "#06b6d4",
          title: "Gambir",
          description: "Stasiun Kereta Api",
          category: "Transport",
        },
        {
          coords: [106.8229, -6.2297],
          color: "#84cc16",
          title: "Kemang",
          description: "Kawasan Kuliner",
          category: "F&B",
        },
      ]

      locations.forEach((location) => {
        new mapboxgl.Marker({ color: location.color })
          .setLngLat(location.coords as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="p-3">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-3 h-3 rounded-full" style="background-color: ${location.color}"></div>
                  <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">${location.category}</span>
                </div>
                <h3 class="font-semibold text-lg mb-1">${location.title}</h3>
                <p class="text-sm text-gray-600 mb-3">${location.description}</p>
                <div class="flex gap-2">
                  <button class="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">Detail</button>
                  <button class="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">Rute</button>
                  <button class="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors">Share</button>
                </div>
              </div>`,
            ),
          )
          .addTo(map.current!)
      })

      // Add click event to show coordinates
      map.current.on("click", (e) => {
        console.log(`Coordinates: ${e.lngLat.lng}, ${e.lngLat.lat}`)
      })
    }

    if (map.current && mapStyle) {
      map.current.setStyle(mapStyle);
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map.current && mapStyle) {
      map.current.setStyle(mapStyle)
    }
  }, [mapStyle]) 

  return (
  <div 
    ref={mapContainer} 
    className="w-full h-full"
    style={{ borderRadius: 0 }} 
    />)
}
