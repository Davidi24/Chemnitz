'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapCard } from './MapCard';
import { FeatureItem } from '@/types/FeatueType';

const customIcon = new Icon({
  iconUrl: '/assets/image/about/img1.png',
  iconSize: [40, 40],
  className: 'rounded-full border-[3px] hover:border-primary transition-all',
});

const userIcon = new Icon({
  iconUrl: '/assets/icons/user-pin.png',
  iconSize: [35, 35],
});

// Helper: Fly to a single marker when selected
function FlyToActiveMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 1.2 });
    }
  }, [position, map]);
  return null;
}

// Helper: Fit bounds to all marker positions, with extra padding!
function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, {
        paddingTopLeft: [120, 150],     // even more padding, adjust as needed!
        paddingBottomRight: [120, 150], // even more padding, adjust as needed!
        maxZoom: 16,
      });
    }
  }, [positions, map]);
  return null;
}

interface MapProps {
  features: FeatureItem[];
  loading?: boolean;
  activeFeatureId: string | null;
  setActiveFeatureId: (id: string) => void;
}

const Map = ({ features, loading, activeFeatureId, setActiveFeatureId }: MapProps) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const markerRefs = useRef<{ [id: string]: any }>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => {
        console.warn('Location access denied or failed:', err);
      }
    );
  }, []);

  // Find active feature position
  const activeFeature = features.find(f => f.id === activeFeatureId);
  const coords = activeFeature?.geometry.coordinates;
  const activePosition: [number, number] | null =
    coords && coords.length >= 2
      ? [coords[1], coords[0]]
      : null;

  // Calculate all marker positions for FitBounds
  const allPositions: [number, number][] = features
    .filter(f => f.geometry?.coordinates?.length >= 2)
    .map(f => [f.geometry.coordinates[1], f.geometry.coordinates[0]]);

  // Open popup when activeFeatureId changes
  useEffect(() => {
    if (activeFeatureId && markerRefs.current[activeFeatureId]) {
      const marker = markerRefs.current[activeFeatureId];
      setTimeout(() => {
        marker.openPopup();
      }, 200);
    }
  }, [activeFeatureId]);

  return (
    <div className="w-full relative">
      {features.length === 0 && !loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
          <h2 className="text-xl font-semibold text-gray-700">No Data Available</h2>
        </div>
      ) : (
        <MapContainer
          center={[50.8323, 12.9253]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-[37rem] xl:h-[45rem] xl:rounded-2xl rounded-md shadow-2xl"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render all markers */}
          {!loading &&
            features.map((feature) => {
              const pos: [number, number] = [
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ];
              return (
                <Marker
                  key={feature.id}
                  icon={customIcon}
                  position={pos}
                  ref={ref => {
                    if (ref) markerRefs.current[feature.id] = ref;
                  }}
                  eventHandlers={{
                    click: () => setActiveFeatureId(feature.id),
                  }}
                  zIndexOffset={feature.id === activeFeatureId ? 2000 : 1000}
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
              );
            })
          }

          {/* Fit bounds to all markers */}
          <FitBounds positions={allPositions} />

          {/* Optionally fly to selected marker */}
          <FlyToActiveMarker position={activePosition} />

          {/* User location marker */}
          {userLocation && (
            <Marker position={userLocation as [number, number]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
