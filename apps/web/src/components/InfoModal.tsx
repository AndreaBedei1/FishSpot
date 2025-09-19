interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  info: {
    scientificName?: string;
    description?: string;
    dimension?: string;
    curiosity?: string;
  } | null;
}

export default function InfoModal({ open, onClose, info }: InfoModalProps) {
  if (!open || !info) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="species-info-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Titolo */}
        <h2
          id="species-info-title"
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          {info.scientificName || "Specie"}
        </h2>

        {/* Contenuto */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {info.description && (
            <p className="text-gray-700 whitespace-pre-line">
              <strong>Descrizione:</strong> {info.description}
            </p>
          )}
          {info.dimension && (
            <p className="text-gray-700">
              <strong>Dimensione:</strong> {info.dimension}
            </p>
          )}
          {info.curiosity && (
            <p className="text-gray-700 whitespace-pre-line">
              <strong>Curiosità:</strong> {info.curiosity}
            </p>
          )}
          {!info.description && !info.dimension && !info.curiosity && (
            <p className="text-gray-500 italic">
              Nessuna informazione disponibile.
            </p>
          )}
        </div>

        {/* Pulsanti */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
