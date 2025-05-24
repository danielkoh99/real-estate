"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import { MapLocationData } from "@/types";

const customIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapComponentProps {
  locations: MapLocationData[];
}

const FitAllBounds = ({
  locations,
}: {
  locations: MapComponentProps["locations"];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.lat, loc.lon] as [number, number]),
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, locations]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const initialCenter = locations[0]
    ? [locations[0].lat, locations[0].lon]
    : [0, 0];

  return (
    <MapContainer
      center={initialCenter as [number, number]}
      maxZoom={18}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, idx) => (
        <Marker
          key={idx}
          icon={customIcon}
          position={[location.lat, location.lon]}
        >
          <Popup>{location.display_name}</Popup>
        </Marker>
      ))}
      <FitAllBounds locations={locations} />
    </MapContainer>
  );
};

export default MapComponent;
