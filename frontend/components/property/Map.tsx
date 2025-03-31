"use client";

import { useEffect } from "react";
import L, { LatLngBoundsLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FitBounds = ({
  boundingBox,
}: {
  boundingBox: [number, number, number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!boundingBox || boundingBox.length !== 4) return;

    const bounds: LatLngBoundsLiteral = [
      [boundingBox[0], boundingBox[2]],
      [boundingBox[1], boundingBox[3]],
    ];

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, boundingBox]);

  return null;
};

interface MapComponentProps {
  lat: string;
  lon: string;
  display_name: string;
  boundingBox: string[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lon,
  display_name,
  boundingBox,
}) => {
  const formattedBoundingBox: [number, number, number, number] =
    boundingBox.map(Number) as [number, number, number, number];

  return (
    <MapContainer
      center={[parseFloat(lat), parseFloat(lon)]}
      maxZoom={18}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[parseFloat(lat), parseFloat(lon)]}>
        <Popup>{display_name}</Popup>
      </Marker>
      <FitBounds boundingBox={formattedBoundingBox} />
    </MapContainer>
  );
};

export default MapComponent;
