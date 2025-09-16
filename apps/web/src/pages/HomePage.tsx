import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapSection from "../components/MapSection";
import SightingsTable from "../components/SightingsTable";
import type { Sighting } from "../types";

export default function HomePage() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    axios.get("http://localhost:3000/sightings?take=200", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => { setSightings(res.data.items); setLoading(false); })
    .catch(() => { localStorage.removeItem("token"); navigate("/login"); });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Avvistamenti
        </h1>

        {loading ? (
          <p className="text-gray-600">Caricamento…</p>
        ) : (
          <div className="space-y-8"> 
            {/* Mappa full width */}
            <MapSection sightings={sightings} />

            {/* Tabella full width */}
            <SightingsTable sightings={sightings} />
          </div>
        )}
      </main>
    </div>
  );
}
