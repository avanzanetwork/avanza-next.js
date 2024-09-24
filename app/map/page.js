'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import eventsData from './events.json';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.leafletElement;

    // Add event markers
    eventsData.forEach(event => {
      const coordinates = getCityCoordinates(event.city, event.state);
      L.circleMarker(coordinates, {
        radius: 8,
        fillColor: 'red',
        color: 'red',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)
        .bindPopup(`<h3>${event.name}</h3><p>Date: ${event.when}<br>Participants: ${event.studentParticipation}</p>`);
    });
  }, []);

  return (
    <MapContainer
      center={[39.8283, -98.5795]} // center of the US
      zoom={5}
      style={{ width: '100%', height: '100vh' }}
      whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
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
  );
};

export default MapComponent;
