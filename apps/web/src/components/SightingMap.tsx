import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function SightingMap({
  latitude,
  longitude,
  label,
}: {
  latitude: number;
  longitude: number;
  label?: string;
}) {
  return (
    <div className="w-full h-64 sm:h-80 lg:h-[400px] rounded-lg overflow-hidden shadow mt-6">
      <MapContainer
        center={[latitude, longitude]}
        zoom={9}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
