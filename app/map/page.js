'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import eventsData from './events.json';

const MapComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
  );
  const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
  );
  const CircleMarker = dynamic(
    () => import('react-leaflet').then((mod) => mod.CircleMarker),
    { ssr: false }
  );
  const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
  );

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer
        center={[39.8283, -98.5795]} // center of the US
        zoom={5}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventsData.map((event, index) => {
          const coordinates = event.coordinates;
          return (
            <CircleMarker 
              key={index} 
              center={coordinates} 
              radius={Math.log(Math.max(8, event.studentParticipation * 100))}
              fillColor="red"
              color="red"
              weight={1}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <h3>{event.name}</h3>
                <p>Date: {event.when}<br/>Participants: {event.studentParticipation}</p>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
