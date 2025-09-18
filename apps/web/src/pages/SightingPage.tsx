import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditSightingModal from "../components/EditSightingModal";
import SightingMap from "../components/SightingMap";
import type { Sighting } from "../types";
import InfoModal from "../components/InfoModal";

export default function SightingPage() {
  const { id } = useParams<{ id: string }>();
  const [sighting, setSighting] = useState<Sighting | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState<any | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const navigate = useNavigate();

  const handleShowInfo = async () => {
      setSpeciesInfo(sighting.species?.info || null);
      setShowInfoModal(true);
  };

  const loadSighting = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/sightings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSighting(res.data);
      setLoading(false);
    } catch {
      alert("Errore nel caricamento dell’avvistamento");
      navigate("/home");
    }
  };

  useEffect(() => {
    loadSighting();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo avvistamento?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/sightings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/home");
    } catch {
      alert("Errore nell’eliminazione dell’avvistamento");
    }
  };

  if (loading) return <p className="p-6">Caricamento…</p>;
  if (!sighting) return <p className="p-6">Avvistamento non trovato</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"> Avvistamento </h1>
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <SightingMap
            latitude={sighting.latitude}
            longitude={sighting.longitude}
            label={`${sighting.animal?.name}${sighting.species ? " · " + sighting.species.name : ""}`}
          />
          <p><strong>Data:</strong> {new Date(sighting.date).toLocaleDateString()}</p>
          <p><strong>Utente:</strong> {sighting.user?.email}</p>
          <p><strong>Num. esemplari:</strong> {sighting.specimens}</p>
          <p><strong>Latitudine:</strong> {sighting.latitude}</p>
          <p><strong>Longitudine:</strong> {sighting.longitude}</p>
          <p><strong>Animale:</strong> {sighting.animal?.name}</p>
          <div className="flex items-center gap-2">
            <p><strong>Specie:</strong> {sighting.species?.name || "-"}</p>
            {sighting.species && (
              <button
                className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                onClick={ () => {
                  handleShowInfo()
                }}
              >
                Info
              </button>
            )}
          </div>
          <p><strong>Mare:</strong> {sighting.sea || "-"}</p>
          <p><strong>Vento:</strong> {sighting.wind || "-"}</p>
          <p><strong>Note:</strong> {sighting.notes || "-"}</p>


            <div className="flex justify-end">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <a
                  href={`mailto:${sighting.user?.email}`}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-center"
                >
                  Contatta
                </a>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Modifica
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>

        <div className="flex gap-2 mt-6">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Aggiungi foto
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Riconosci
          </button>
        </div>

        {/* Sezione vuota per il futuro */}
        <section className="mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Sezione extra</h2>
          <p className="text-gray-500 text-sm">In arrivo…</p>
        </section>
      </main>

      <Footer />

      {/* Modale per modifica */}
      <EditSightingModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        sighting={sighting}
        onUpdated={loadSighting}
      />

      <InfoModal
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        info={speciesInfo}
      />

    </div>
  );
}
