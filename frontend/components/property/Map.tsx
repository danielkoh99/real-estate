"use client";

import { useEffect } from "react";
import L, { LatLngBoundsLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import { LocationData } from "@/types";

const customIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FitBounds = ({
  boundingbox,
}: {
  boundingbox: [number, number, number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!boundingbox || boundingbox.length !== 4) return;

    const bounds: LatLngBoundsLiteral = [
      [boundingbox[0], boundingbox[2]],
      [boundingbox[1], boundingbox[3]],
    ];

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, boundingbox]);

  return null;
};

interface MapComponentProps extends LocationData {
  lat: number;
  lon: number;
  display_name: string;
  boundingbox: [number, number, number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lon,
  display_name,
  boundingbox,
}) => {
  // const formattedBoundingBox: [number, number, number, number] =
  //   boundingbox.map(Number) as [number, number, number, number];

  return (
    <MapContainer
      center={[lat, lon]}
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
      <Marker icon={customIcon} position={[lat, lon]}>
        <Popup>{display_name}</Popup>
      </Marker>
      <FitBounds boundingbox={boundingbox} />
    </MapContainer>
  );
};

export default MapComponent;
