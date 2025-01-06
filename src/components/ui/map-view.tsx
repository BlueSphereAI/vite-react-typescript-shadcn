'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapViewProps {
  latitude: number
  longitude: number
  name: string
  address: string
}

export function MapView({ latitude, longitude, name, address }: MapViewProps) {
  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([latitude, longitude], 13)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Add marker
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`
        <strong>${name}</strong><br>
        ${address}
      `)
      .openPopup()

    // Cleanup
    return () => {
      map.remove()
    }
  }, [latitude, longitude, name, address])

  return <div id="map" className="h-[400px] w-full rounded-lg" />
} 