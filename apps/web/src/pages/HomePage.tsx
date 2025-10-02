import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapSection from "../components/MapSection";
import SightingsTable from "../components/SightingsTable";
import AddSightingModal from "../components/AddSightingModal";
import { exportSightingsToCsv } from "../utils/exportCsv";
import type { Sighting } from "../types";

export default function HomePage() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const loadSightings = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://isi-seawatch.csr.unibo.it:3000/sightings?take=200", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSightings(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadSightings().catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-10 lg:py-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            Avvistamenti
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-sm sm:text-base"
            >
              + Aggiungi
            </button>
            <button
              onClick={() => exportSightingsToCsv(sightings)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base"
            >
              Esporta
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Caricamento…</p>
        ) : (
          <div className="space-y-8 lg:space-y-12">
            <MapSection sightings={sightings} />
            <SightingsTable sightings={sightings} />
          </div>
        )}
      </main>

      <AddSightingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={loadSightings}
      />
    </div>
  );
}
