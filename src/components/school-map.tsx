"use client"

import { useEffect, useRef, useState } from "react"
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
  const [mapLoaded, setMapLoaded] = useState(false)
  const schoolDataRef = useRef<GeoJSON.FeatureCollection>({
    type: 'FeatureCollection',
    features: []
  })

  // Convert schools to GeoJSON once instead of on every render
  useEffect(() => {
    schoolDataRef.current = {
      type: 'FeatureCollection',
      features: schools
        .filter(school => school.lokasi && school.lokasi[0]?.bujur && school.lokasi[0]?.lintang)
        .map(school => ({
          type: 'Feature',
          properties: { 
            id: school.npsn,
            name: school.nama,
            level: school.bentuk_pendidikan,
            akreditasi: school.akreditasi || '-',
            status: school.status_satuan_pendidikan,
            jalan: school.alamat && school.alamat[0] ? school.alamat[0].jalan || '-' : '-',
            kecamatan: school.alamat && school.alamat[0] ? school.alamat[0].nama_kecamatan || '-' : '-',
            kabupaten: school.alamat && school.alamat[0] ? school.alamat[0].nama_kabupaten || '-' : '-'
          },
          geometry: { 
            type: 'Point', 
            coordinates: [school.lokasi[0].bujur, school.lokasi[0].lintang] 
          }
        }))
    }

    if (map.current && mapLoaded) {
      updateSchoolSource()
    }
  }, [schools, mapLoaded])

  // Tambahkan style CSS untuk popup
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .school-popup .mapboxgl-popup-content {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        padding: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Initialize map
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
        attributionControl: false,
        maxZoom: 18
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right")
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right"
      )
      map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-right")
      
      // Setup hover effect for clusters
      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      
      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });

      // Zoom into cluster on click
      map.current.on('click', 'clusters', (e) => {
        if (!e.features || e.features.length === 0 || !map.current) return;
        
        const feature = e.features[0];
        const clusterId = feature.properties?.cluster_id;
        
        const source = map.current.getSource('schools');
        if (source && 'getClusterExpansionZoom' in source) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || !map.current) return;
            
            const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
            
            map.current.easeTo({
              center: coordinates,
              zoom: zoom as number
            });
          });
        }
      });

      // Wait for map to load before adding layers
      map.current.on('load', () => {
        // Load custom icons first
        loadCustomIcons();
        
        // Then initialize the rest after a short delay to ensure icons are loaded
        setTimeout(() => {
          setMapLoaded(true);
          initializeSchoolLayers();
          updateMapLayers();
        }, 100);
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Fungsi untuk mendaftarkan icon kustom
  const loadCustomIcons = () => {
    if (!map.current) return;
    
    // Daftarkan berbagai icon warna untuk jenis sekolah yang berbeda
    const createPinIcon = (color: string, name: string) => {
      // SVG untuk pin marker
      const svg = `
        <svg width="24" height="35" viewBox="0 0 24 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C15.1826 0 18.2349 1.26425 20.4854 3.51465C22.7358 5.76511 24 8.81737 24 12C24 21.0001 12 34.2861 12 34.2861C11.9688 34.2516 0 20.9884 0 12C1.10418e-05 8.8174 1.26423 5.7651 3.51465 3.51465C5.76508 1.26422 8.81742 4.77657e-05 12 0ZM11.4424 15.7861L6.18457 13.2197V15.9824L11.4424 18.4766L16.6992 15.9824V13.2197L11.4424 15.7861ZM3.55566 9.88281L11.4424 14.4326L17.8438 10.7393V15.8486H19.3203V9.8877L19.3281 9.88281L11.4424 5.33301L3.55566 9.88281Z" fill="${color}"/>
        </svg>
      `;
      
      // Buat canvas untuk konversi SVG ke gambar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Atur ukuran canvas
      canvas.width = 24;
      canvas.height = 36;
      
      // Proses konversi
      img.onload = () => {
        if (ctx && map.current) {
          ctx.drawImage(img, 0, 0);
          map.current.addImage(name, ctx.getImageData(0, 0, 24, 36));
        }
      };
      
      // Konversi SVG ke base64 untuk digunakan sebagai sumber gambar
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    };
    
    // Buat icon untuk setiap jenis sekolah
    createPinIcon('#ef4444', 'pin-sd');
    createPinIcon('#3b82f6', 'pin-smp');
    createPinIcon('#10b981', 'pin-sma');
    createPinIcon('#f59e0b', 'pin-smk');
    createPinIcon('#8b5cf6', 'pin-default');
  };

  // Initialize school layers
  const initializeSchoolLayers = () => {
    if (!map.current) return;

    // Add source
    map.current.addSource('schools', {
      type: 'geojson',
      data: schoolDataRef.current,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    // Add cluster layer
    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'schools',
      filter: ['has', 'point_count'],
      paint: {
        // Color circles by school count
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',  // 0-20 schools
          20,
          '#f1f075',  // 20-100 schools
          100,
          '#f28cb1'   // 100+ schools
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          15,         // 15px radius for 0-20 schools
          20,
          20,         // 20px for 20-100 schools
          100,
          25          // 25px for 100+ schools
        ],
        'circle-stroke-width': 1,
        'circle-stroke-color': 'white'
      }
    });

    // Add cluster count 
    map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'schools',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      paint: {
        'text-color': '#ffffff'
      }
    });

    // Add individual point layer with pin markers instead of circles
    map.current.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'schools',
      filter: ['!', ['has', 'point_count']],
      layout: {
        // Gunakan pin icon sesuai dengan jenis sekolah
        'icon-image': [
          'match',
          ['get', 'level'],
          'SD', 'pin-sd',
          'SMP', 'pin-smp', 
          'SMA', 'pin-sma',
          'SMK', 'pin-smk',
          'pin-default'  // default icon
        ],
        'icon-size': markerSize,
        'icon-allow-overlap': true,
        'icon-anchor': 'bottom', // Penting: anchor di bagian bawah pin
        'icon-offset': [0, 0]
      }
    });

    // Add popup but only create it once
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: '300px',
      className: 'school-popup',
      offset: [0, -5] // Offset untuk posisi popup di atas pin
    });

    // Set up click handler for school selection
    map.current.on('click', 'unclustered-point', (e) => {
      if (!e.features || e.features.length === 0) return;
      
      const feature = e.features[0];
      const props = feature.properties;
      if (!props) return;
      
      const npsn = props.id;
      const school = schools.find(s => s.npsn === npsn);
      if (school) {
        onSchoolSelect(school);
      }
    });

    // Change cursor when hovering over points
    map.current.on('mouseenter', 'unclustered-point', () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });
    
    map.current.on('mouseleave', 'unclustered-point', () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
    });

    // Show popup on hover for individual points
    map.current.on('mouseenter', 'unclustered-point', (e) => {
      if (!map.current || !e.features || e.features.length === 0) return;
      
      const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
      const props = e.features[0].properties;
      if (!props) return;
      
      // Get color based on school level
      const getMarkerColor = (level: string) => {
        switch (level) {
          case "SD": return "#ef4444";
          case "SMP": return "#3b82f6";
          case "SMA": return "#10b981";
          case "SMK": return "#f59e0b";
          default: return "#8b5cf6";
        }
      };

      const color = getMarkerColor(props.level);
      
      // HTML for popup
      const html = `
        <div class="p-3 max-w-sm">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
            <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">${props.level}</span>
            <span class="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">${props.akreditasi}</span>
          </div>
          
          <h3 class="font-bold text-base mb-2 text-gray-900 line-clamp-2">${props.name}</h3>
          
          <div class="space-y-1 text-xs mb-3">
            <div class="flex items-start gap-1">
              <span class="font-medium text-gray-600 min-w-[45px]">NPSN:</span>
              <span class="text-gray-900">${props.id}</span>
            </div>
            
            <div class="flex items-start gap-1">
              <span class="font-medium text-gray-600 min-w-[45px]">Alamat:</span>
              <span class="text-gray-900 line-clamp-2">${props.jalan}</span>
            </div>
            
            <div class="flex items-start gap-1">
              <span class="font-medium text-gray-600 min-w-[45px]">Kec:</span>
              <span class="text-gray-900">${props.kecamatan}</span>
            </div>
          </div>
        </div>
      `;
      
      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    });

    map.current.on('mouseleave', 'unclustered-point', () => {
      popup.remove();
    });
  };

  // Update the school data source when schools change
  const updateSchoolSource = () => {
    if (!map.current || !map.current.getSource('schools')) return;
    
    const source = map.current.getSource('schools');
    if (source && 'setData' in source) {
      source.setData(schoolDataRef.current);
    }

    // Fit bounds to show all schools
    if (schools.length > 0 && map.current) {
      const validSchools = schools.filter(school => 
        school.lokasi && school.lokasi[0]?.bujur && school.lokasi[0]?.lintang
      );
      
      if (validSchools.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        
        // Only include first 10000 schools in bounds calculation for performance
        const schoolsForBounds = validSchools.slice(0, 10000);
        
        schoolsForBounds.forEach(school => {
          bounds.extend([school.lokasi[0].bujur, school.lokasi[0].lintang]);
        });
        
        if (!bounds.isEmpty()) {
          map.current.fitBounds(bounds, { 
            padding: 50,
            maxZoom: 13  // Limit zoom level for better overview
          });
        }
      }
    }
  };

  // Update map style when it changes
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      map.current.setStyle(mapStyle);
      
      // Re-add sources and layers when style changes
      map.current.once("styledata", () => {
        // Load icons first
        loadCustomIcons();
        
        // Then re-initialize layers
        setTimeout(() => {
          if (mapLoaded) {
            initializeSchoolLayers();
            updateMapLayers();
          }
        }, 100);
      });
    }
  }, [mapStyle]);

  // Update map layers when settings change
  useEffect(() => {
    if (map.current && mapLoaded) {
      updateMapLayers();
    }
  }, [showTraffic, show3D, showLabels, mapLoaded]);

  // Update marker size when it changes
  useEffect(() => {
    if (map.current && mapLoaded && map.current.getLayer('unclustered-point')) {
      try {
        map.current.setLayoutProperty(
          'unclustered-point',
          'icon-size',
          markerSize
        );
      } catch (error) {
        console.error('Error updating marker size:', error);
      }
    }
  }, [markerSize, mapLoaded]);

  // Function to update layers based on settings
  const updateMapLayers = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Handle traffic layer
    if (showTraffic) {
      if (!map.current.getSource("traffic")) {
        map.current.addSource("traffic", {
          type: "vector",
          url: "mapbox://mapbox.mapbox-traffic-v1",
        });
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
              "low", "#4CC24A",
              "moderate", "#FFAD33",
              "heavy", "#E63946",
              "severe", "#801A26",
              "#000000",
            ],
          },
        });
      }
    } else {
      if (map.current.getLayer("traffic")) {
        map.current.removeLayer("traffic");
      }
      if (map.current.getSource("traffic")) {
        map.current.removeSource("traffic");
      }
    }

    // Handle 3D buildings
    if (show3D) {
      if (!map.current.getLayer("3d-buildings")) {
        // Find the first symbol layer
        const layers = map.current.getStyle().layers;
        let firstSymbolId;
        for (const layer of layers!) {
          if (layer.type === "symbol") {
            firstSymbolId = layer.id;
            break;
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
          firstSymbolId
        );
      }
    } else {
      if (map.current.getLayer("3d-buildings")) {
        map.current.removeLayer("3d-buildings");
      }
    }

    // Handle labels visibility
    const layers = map.current.getStyle().layers;
    if (layers) {
      for (const layer of layers) {
        if (layer.type === "symbol" && !["cluster-count", "unclustered-point"].includes(layer.id)) {
          map.current.setLayoutProperty(
            layer.id, 
            "visibility", 
            showLabels ? "visible" : "none"
          );
        }
      }
    }
  };

  return <div ref={mapContainer} className="w-full h-full" />;
}