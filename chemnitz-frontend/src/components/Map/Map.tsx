'use client'

import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { MapCard } from './MapCard'

type Feature = {
  id: string
  geometry: {
    coordinates: [number, number]
  }
  properties: {
    name?: string
    image?: string
    description?: string
    rating?: number
    amenity?: string
    [key: string]: any
  }
}

const customIcon = new Icon({
  iconUrl: '/assets/image/about/img1.png',
  iconSize: [40, 40],
  className: 'rounded-full border-[3px] hover:border-primary transition-all',
})

const userIcon = new Icon({
  iconUrl: '/assets/icons/user-pin.png',
  iconSize: [35, 35],
})

const Map = () => {
  const [features, setFeatures] = useState<Feature[]>([])
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/feature/category/hotel')
      const data = await res.json()
      setFeatures(data)
    }
    fetchData()

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
      },
      (err) => {
        console.warn('Location access denied or failed:', err)
      }
    )
  }, [])

  return (
    <div className='w-full flex justify-center my-20'>
      <MapContainer
        center={[50.8323, 12.9253]}
        zoom={13}
        scrollWheelZoom={true}
        className='h-[70vh] w-[80vw] rounded-2xl shadow-2xl'
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Feature markers */}
        {features.map((feature) => (
          <Marker
            key={feature.id}
            icon={customIcon}
            position={[
              feature.geometry.coordinates[1], // latitude
              feature.geometry.coordinates[0], // longitude
            ]}
          >
            <Popup>
              <MapCard
                title={feature.properties.name || 'No Name'}
                img={feature.properties.image || '/assets/image/about/img1.png'}
                subTitle={feature.properties.amenity || 'Category'}
                desc={feature.properties.description || 'No description'}
                rating={feature.properties.rating || 0}
              />
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup className='text-[30px] text-red-700'>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
