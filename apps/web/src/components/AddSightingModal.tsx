import { useState, useEffect } from "react";
import axios from "axios";

type Animal = { id: number; name: string };
type Species = { id: number; name: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export default function AddSightingModal({ open, onClose, onAdded }: Props) {
  const [formData, setFormData] = useState({
    date: "",
    specimens: "",
    latitude: "",
    longitude: "",
    animalId: "",
    speciesId: "",
    sea: "",
    wind: "",
    notes: "",
  });

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);

  const seaOptions = ["Calmo", "Poco mosso", "Mosso", "Molto mosso", "Agitato"];
  const windOptions = ["Assente", "Debole", "Moderato", "Forte", "Tempesta"];

  useEffect(() => {
    if (open) {
      // carico animali disponibili
      axios.get("http://isi-seawatch.csr.unibo.it:3000/animals").then((res) => setAnimals(res.data));
    }
  }, [open]);

  useEffect(() => {
    if (formData.animalId) {
      axios
        .get(`http://isi-seawatch.csr.unibo.it:3000/species?animalId=${formData.animalId}`)
        .then((res) => setSpecies(res.data));
    } else {
      setSpecies([]);
      setFormData((f) => ({ ...f, speciesId: "" }));
    }
  }, [formData.animalId]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://isi-seawatch.csr.unibo.it:3000/sightings",
        {
          date: formData.date,
          specimens: Number(formData.specimens),
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          animalId: Number(formData.animalId),
          speciesId: formData.speciesId ? Number(formData.speciesId) : undefined,
          sea: formData.sea || undefined,
          wind: formData.wind || undefined,
          notes: formData.notes || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdded();
      onClose();
    } catch {
      alert("Errore durante l'aggiunta dell'avvistamento");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto overflow-y-auto max-h-[90vh] relative z-[10000]">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Nuovo avvistamento
          </h2>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium mb-1">Data*</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Numero esemplari */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Num. esemplari*
            </label>
            <input
              type="number"
              name="specimens"
              value={formData.specimens}
              onChange={handleChange}
              required
              min={1}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Latitudine e Longitudine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Latitudine*
              </label>
              <input
                type="number"
                step="0.0001"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Longitudine*
              </label>
              <input
                type="number"
                step="0.0001"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Animale */}
          <div>
            <label className="block text-sm font-medium mb-1">Animale*</label>
            <select
              name="animalId"
              value={formData.animalId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">-- Seleziona animale --</option>
              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Specie */}
          <div>
            <label className="block text-sm font-medium mb-1">Specie</label>
            <select
              name="speciesId"
              value={formData.speciesId}
              onChange={handleChange}
              disabled={!formData.animalId}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
            >
              <option value="">-- Seleziona specie --</option>
              {species.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mare */}
          <div>
            <label className="block text-sm font-medium mb-1">Mare</label>
            <select
              name="sea"
              value={formData.sea}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">-- Seleziona stato del mare --</option>
              {seaOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Vento */}
          <div>
            <label className="block text-sm font-medium mb-1">Vento</label>
            <select
              name="wind"
              value={formData.wind}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">-- Seleziona vento --</option>
              {windOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          {/* Pulsanti */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
