import { useState } from "react";
import axios from "axios";

interface Props {
  specimenId: number;
  onSaved?: () => void;
}

export default function WoundForm({ specimenId, onSaved }: Props) {
  const [severity, setSeverity] = useState("Lieve");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/specimens/${specimenId}/wounds`,
        { type, severity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setType("");
      setSeverity("Lieve");
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Errore salvataggio ferita", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <label className="block text-sm font-medium">Gravità</label>
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        <option value="Lieve">Lieve</option>
        <option value="Moderata">Moderata</option>
        <option value="Grave">Grave</option>
      </select>

      <label className="block text-sm font-medium">Descrizione ferita</label>
      <textarea
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Inserisci descrizione..."
        className="w-full border rounded px-2 py-1"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Salvataggio..." : "Aggiungi ferita"}
      </button>
    </form>
  );
}
