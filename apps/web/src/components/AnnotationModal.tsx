import { useEffect, useState } from "react";

interface ServerWound {
  id: number;
  type: string;
  severity: string;
}

interface ServerSpecimen {
  id: number;
  name: string | null;
  wounds?: ServerWound[]; // 👈 importante per pre-popolare
}

interface SelectedSpecimen {
  id: number | null;
  name: string;
}

interface Props {
  specimens: ServerSpecimen[];
  selectedSpecimen: SelectedSpecimen;
  setSelectedSpecimen: (val: SelectedSpecimen) => void;
  onConfirm: (payload: {
    newWounds: { type: string; severity: string }[];
    removeWoundIds: number[];
  }) => void;
  onCancel: () => void;
}

export default function AnnotationModal({
  specimens,
  selectedSpecimen,
  setSelectedSpecimen,
  onConfirm,
  onCancel,
}: Props) {
  // ferite già presenti su DB
  const [existingWounds, setExistingWounds] = useState<ServerWound[]>([]);
  // ferite appena aggiunte dall'utente
  const [newWounds, setNewWounds] = useState<{ type: string; severity: string }[]>([]);
  // ids di ferite esistenti da eliminare
  const [toRemove, setToRemove] = useState<number[]>([]);

  const [newWound, setNewWound] = useState<{ type: string; severity: string }>({
    type: "",
    severity: "Lieve",
  });

  // quando cambia l’esemplare selezionato o ricarichi la lista, pre-popoliamo
  useEffect(() => {
    if (selectedSpecimen.id) {
      const found = specimens.find(s => s.id === selectedSpecimen.id);
      setExistingWounds(found?.wounds ?? []);
    } else {
      setExistingWounds([]);
    }
    setNewWounds([]);
    setToRemove([]);
  }, [selectedSpecimen.id, specimens]);

  const addWound = () => {
    if (!newWound.type.trim()) return;
    setNewWounds(prev => [...prev, newWound]);
    setNewWound({ type: "", severity: "Lieve" });
  };

  const removeExisting = (id: number) => {
    setExistingWounds(prev => prev.filter(w => w.id !== id));
    setToRemove(prev => [...prev, id]);
  };

  const removeNew = (idx: number) => {
    setNewWounds(prev => prev.filter((_, i) => i !== idx));
  };

  const handleConfirm = () => {
    onConfirm({ newWounds, removeWoundIds: toRemove });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Associa esemplare</h2>

        {/* Select esemplare esistente */}
        <select
          value={selectedSpecimen.id ?? ""}
          onChange={(e) => {
            const id = e.target.value ? Number(e.target.value) : null;
            const found = specimens.find(s => s.id === id);
            setSelectedSpecimen({
              id,
              name: found?.name ?? "",
            });
          }}
          className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-3 text-sm sm:text-base"
        >
          <option value="">-- Seleziona esemplare --</option>
          {specimens.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Oppure nuovo esemplare */}
        <input
          type="text"
          placeholder="Oppure nuovo esemplare"
          value={selectedSpecimen.name}
          onChange={(e) => setSelectedSpecimen({ id: null, name: e.target.value })}
          className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2 mb-3 text-sm sm:text-base"
        />

        {(selectedSpecimen.id || selectedSpecimen.name) && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-md sm:text-lg font-semibold mb-2">Ferite</h3>

            {/* Ferite esistenti (DB) */}
            {existingWounds.length > 0 && (
              <>
                <p className="text-xs text-gray-500 mb-1">Già registrate</p>
                <ul className="mb-3 space-y-2">
                  {existingWounds.map((w) => (
                    <li key={w.id} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded">
                      <span className="text-sm sm:text-base">{w.type} ({w.severity})</span>
                      <button
                        onClick={() => removeExisting(w.id)}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-300 text-sm sm:text-base rounded hover:bg-gray-400"
                      >
                        Rimuovi
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Ferite aggiunte ora (non ancora su DB) */}
            {newWounds.length > 0 && (
              <>
                <p className="text-xs text-gray-500 mb-1">Da aggiungere</p>
                <ul className="mb-3 space-y-2">
                  {newWounds.map((w, i) => (
                    <li key={i} className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded">
                      <span className="text-sm">{w.type} ({w.severity})</span>
                      <button
                        onClick={() => removeNew(i)}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-sky-600 text-white text-sm sm:text-base rounded hover:bg-sky-700"
                      >
                        Rimuovi
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Form aggiunta ferita */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Descrizione ferita"
                value={newWound.type}
                onChange={(e) => setNewWound({ ...newWound, type: e.target.value })}
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <select
                value={newWound.severity}
                onChange={(e) => setNewWound({ ...newWound, severity: e.target.value })}
                className="border rounded px-1 text-sm"
              >
                <option value="Lieve">Lieve</option>
                <option value="Moderata">Moderata</option>
                <option value="Grave">Grave</option>
              </select>
              <button
                onClick={addWound}
                className="px-2 bg-green-600 text-white rounded text-sm"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Bottoni */}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
            Annulla
          </button>
          <button onClick={handleConfirm} className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700">
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}
