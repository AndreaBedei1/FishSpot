import type { Sighting } from '../types';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export default function SightingsTable({ sightings }: { sightings: Sighting[] }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {sightings.map((s) => (
          <div key={s.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between">
              <div className="font-semibold text-gray-900">{s.user.email}</div>
              <div className="text-gray-600">
                {format(new Date(s.date), 'Pp', { locale: it })}
              </div>
            </div>
            <div className="mt-2 text-gray-700 text-sm">
              <div>Zona: {s.latitude.toFixed(6)} {s.longitude.toFixed(6)}</div>
              <div>Animale: {s.animal.name}{s.species ? ` · ${s.species.name}` : ''}</div>
            </div>
            <button
              onClick={() => navigate(`/sightings/${s.id}`)}
              className="mt-3 w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition"
            >
              Vedi
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: tabella */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-4 py-3 font-semibold">Utente</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Zona</th>
              <th className="px-4 py-3 font-semibold">Animale</th>
              <th className="px-4 py-3 font-semibold sr-only">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {sightings.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{s.user.email}</td>
                <td className="px-4 py-3">{format(new Date(s.date), 'Pp', { locale: it })}</td>
                <td className="px-4 py-3">{s.latitude.toFixed(6)} {s.longitude.toFixed(6)}</td>
                <td className="px-4 py-3">{s.animal.name}{s.species ? ` · ${s.species.name}` : ''}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/sightings/${s.id}`)}
                    className="bg-sky-600 text-white px-3 py-1.5 rounded-lg hover:bg-sky-700 transition"
                    aria-label={`Vedi avvistamento ${s.id}`}
                  >
                    Vedi
                  </button>
                </td>
              </tr>
            ))}
            {!sightings.length && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Nessun avvistamento trovato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
