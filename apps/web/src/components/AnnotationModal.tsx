import { ServerSpecimen } from "../types"; // 👈 se non hai già i tipi, puoi copiare l’interfaccia

interface Props {
  specimens: ServerSpecimen[];
  selectedSpecimen: string;
  setSelectedSpecimen: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AnnotationModal({
  specimens,
  selectedSpecimen,
  setSelectedSpecimen,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">Associa esemplare</h2>

        <select
          value={selectedSpecimen}
          onChange={(e) => setSelectedSpecimen(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-3"
        >
          <option value="">-- Seleziona esemplare --</option>
          {specimens.map((s) => (
            <option key={s.id} value={s.name ?? ""}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nuovo esemplare"
          value={selectedSpecimen}
          onChange={(e) => setSelectedSpecimen(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-3"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}
