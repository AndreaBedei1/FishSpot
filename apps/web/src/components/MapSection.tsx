import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Sighting } from '../types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

function markerIcon(hex: string) {
  const color = hex || '#0ea5e9'; // default sky-500
  return L.divIcon({
    className: 'custom-marker',
    html: `<span style="
      background:${color};
      width:18px;height:18px;display:block;border-radius:50%;
      border:2px solid white;box-shadow:0 0 0 2px rgba(0,0,0,.15)
    " aria-hidden="true"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useMemo(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [points, map]);
  return null;
}

export default function MapSection({ sightings }: { sightings: Sighting[] }) {
  const navigate = useNavigate();
  const points = sightings.map(s => [s.latitude, s.longitude] as [number, number]);

  return (
    <div className="w-full">
      <MapContainer
        className="h-64 sm:h-80 lg:h-[500px] rounded-lg shadow w-full"
        center={[41.9, 12.5]}
        zoom={5}
        scrollWheelZoom
        aria-label="Mappa avvistamenti"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!!points.length && <FitBounds points={points} />}

        {sightings.map((s) => (
          <Marker
            key={s.id}
            position={[s.latitude, s.longitude]}
            icon={markerIcon(s.animal.colorHex || colorByAnimal(s.animal.name))}
            eventHandlers={{ click: () => navigate(`/sightings/${s.id}`) }}
            title={`${s.animal.name}${s.species ? ` - ${s.species.name}` : ''} (${format(new Date(s.date),'Pp',{locale:it})})`}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={1}>
              <div className="text-sm">
                <div className="font-semibold">{s.animal.name}{s.species ? ` · ${s.species.name}` : ''}</div>
                <div>{format(new Date(s.date), 'Pp', { locale: it })}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// fallback colori per animale (solo tipologia)
function colorByAnimal(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('delfin')) return '#0ea5e9';     // sky
  if (n.includes('tartarug')) return '#10b981';   // emerald
  if (n.includes('balen')) return '#a855f7';      // violet
  if (n.includes('uccell') || n.includes('gabbian')) return '#f59e0b'; // amber
  return '#ef4444'; // red default
}
