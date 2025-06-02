"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { School } from "../types/school"

interface SchoolMapProps {
  schools: School[]
  onSchoolSelect: (school: School) => void
  mapStyle?: string
  showTraffic?: boolean
  show3D?: boolean
  showLabels?: boolean
  markerSize?: number
}

export function SchoolMap({
  schools,
  onSchoolSelect,
  mapStyle = "mapbox://styles/mapbox/streets-v12",
  showTraffic = false,
  show3D = false,
  showLabels = true,
  markerSize = 0.8,
}: SchoolMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is required")
      return
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [110.3695, -7.7956], // DIY center coordinates
        zoom: 10,
      })

      // Add navigation control
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

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-right")

      // Wait for map to load before adding layers
      map.current.on("load", () => {
        updateMapLayers()
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update map style when it changes
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      map.current.setStyle(mapStyle)
      map.current.once("styledata", () => {
        updateMapLayers()
        updateMarkers()
      })
    }
  }, [mapStyle])

  // Update map layers when settings change
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      updateMapLayers()
    }
  }, [showTraffic, show3D, showLabels])

  // Update markers when schools or marker size changes
  useEffect(() => {
    if (map.current) {
      updateMarkers()
    }
  }, [schools, markerSize, onSchoolSelect])

  const updateMapLayers = () => {
    if (!map.current || !map.current.isStyleLoaded()) return

    // Handle traffic layer
    if (showTraffic) {
      if (!map.current.getSource("traffic")) {
        map.current.addSource("traffic", {
          type: "vector",
          url: "mapbox://mapbox.mapbox-traffic-v1",
        })
      }

      if (!map.current.getLayer("traffic")) {
        map.current.addLayer({
          id: "traffic",
          type: "line",
          source: "traffic",
          "source-layer": "traffic",
          paint: {
            "line-width": 2,
            "line-color": [
              "match",
              ["get", "congestion"],
              "low",
              "#4CC24A",
              "moderate",
              "#FFAD33",
              "heavy",
              "#E63946",
              "severe",
              "#801A26",
              "#000000",
            ],
          },
        })
      }
    } else {
      if (map.current.getLayer("traffic")) {
        map.current.removeLayer("traffic")
      }
      if (map.current.getSource("traffic")) {
        map.current.removeSource("traffic")
      }
    }

    // Handle 3D buildings
    if (show3D) {
      if (!map.current.getLayer("3d-buildings")) {
        // Find the first symbol layer in the map style
        const layers = map.current.getStyle().layers
        let firstSymbolId
        for (const layer of layers!) {
          if (layer.type === "symbol") {
            firstSymbolId = layer.id
            break
          }
        }

        map.current.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
              "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
              "fill-extrusion-opacity": 0.6,
            },
          },
          firstSymbolId,
        )
      }
    } else {
      if (map.current.getLayer("3d-buildings")) {
        map.current.removeLayer("3d-buildings")
      }
    }

    // Handle labels visibility
    const layers = map.current.getStyle().layers
    if (layers) {
      for (const layer of layers) {
        if (layer.type === "symbol" && layer.id !== "3d-buildings") {
          map.current.setLayoutProperty(layer.id, "visibility", showLabels ? "visible" : "none")
        }
      }
    }
  }

  const updateMarkers = () => {
    if (!map.current) return

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove())
    markers.current = []

    // Add new markers for filtered schools
    schools.forEach((school) => {
      if (school.lokasi && school.lokasi[0]) {
        const { bujur, lintang } = school.lokasi[0]

        // Color based on education level
        const getMarkerColor = (bentuk: string) => {
          switch (bentuk) {
            case "SD":
              return "#ef4444" // Red
            case "SMP":
              return "#3b82f6" // Blue
            case "SMA":
              return "#10b981" // Green
            case "SMK":
              return "#f59e0b" // Orange
            default:
              return "#8b5cf6" // Purple
          }
        }

        const marker = new mapboxgl.Marker({
          color: getMarkerColor(school.bentuk_pendidikan),
          scale: markerSize,
        })
          .setLngLat([bujur, lintang])
          .setPopup(
            new mapboxgl.Popup({
              offset: 25,
              maxWidth: "300px",
              className: "school-popup",
            }).setHTML(
              `<div class="p-3 max-w-sm">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-3 h-3 rounded-full" style="background-color: ${getMarkerColor(school.bentuk_pendidikan)}"></div>
                  <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">${school.bentuk_pendidikan}</span>
                  <span class="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">${school.akreditasi}</span>
                </div>
                
                <h3 class="font-bold text-base mb-2 text-gray-900 line-clamp-2">${school.nama}</h3>
                
                <div class="space-y-1 text-xs mb-3">
                  <div class="flex items-start gap-1">
                    <span class="font-medium text-gray-600 min-w-[45px]">NPSN:</span>
                    <span class="text-gray-900">${school.npsn}</span>
                  </div>
                  
                  <div class="flex items-start gap-1">
                    <span class="font-medium text-gray-600 min-w-[45px]">Alamat:</span>
                    <span class="text-gray-900 line-clamp-2">${school.alamat[0]?.jalan || "-"}</span>
                  </div>
                  
                  <div class="flex items-start gap-1">
                    <span class="font-medium text-gray-600 min-w-[45px]">Kec:</span>
                    <span class="text-gray-900">${school.alamat[0]?.nama_kecamatan || "-"}</span>
                  </div>
                </div>
                
                <div class="flex gap-1">
                  <button 
                    class="flex-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors font-medium"
                    onclick="window.showSchoolDetail('${school.npsn}')"
                  >
                    Detail
                  </button>
                  <button class="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
                    Rute
                  </button>
                </div>
              </div>`,
            ),
          )
          .addTo(map.current!)

        markers.current.push(marker)
      }
    })

    // Global function to handle detail click
    ;(window as any).showSchoolDetail = (npsn: string) => {
      const school = schools.find((s) => s.npsn === npsn)
      if (school) {
        onSchoolSelect(school)
      }
    }

    // Fit map to show all markers if there are any
    if (schools.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds()
      schools.forEach((school) => {
        if (school.lokasi && school.lokasi[0]) {
          bounds.extend([school.lokasi[0].bujur, school.lokasi[0].lintang])
        }
      })

      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, { padding: 50 })
      }
    }
  }

  return <div ref={mapContainer} className="w-full h-full" />
}
