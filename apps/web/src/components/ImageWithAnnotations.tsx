import { useEffect, useRef, useState } from "react";
import AnnotationModal from "./AnnotationModal";
import axios from "axios";

interface ServerSpecimen {
  id: number;
  name: string | null;
}

interface ServerAnnotation {
  id: number;
  tl_x: number;
  tl_y: number;
  br_x: number;
  br_y: number;
  specimenId: number | null;
  specimen?: ServerSpecimen | null;
}

interface Image {
  id: number;
  url: string;
  annotations?: ServerAnnotation[];
}

interface Props {
  image: Image;
  onSaved?: () => void;
}

// 👇 selectedSpecimen ora è un oggetto {id, name}
interface SelectedSpecimen {
  id: number | null;
  name: string;
}

export default function ImageWithAnnotations({ image, onSaved }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);

  // modalità annotazione
  const [annotateMode, setAnnotateMode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPx, setStartPx] = useState<{ x: number; y: number } | null>(null);
  const [previewRect, setPreviewRect] = useState<{
    tlx: number; tly: number; brx: number; bry: number;
  } | null>(null);

  // modale gestione annotazione
  const [showModal, setShowModal] = useState(false);
  const [editingAnnotation, setEditingAnnotation] = useState<ServerAnnotation | null>(null);
  const [specimens, setSpecimens] = useState<ServerSpecimen[]>([]);
  const [selectedSpecimen, setSelectedSpecimen] = useState<SelectedSpecimen>({ id: null, name: "" });

  // modale conferma eliminazione
  const [showDeleteModal, setShowDeleteModal] = useState<null | number>(null);

  const [wounds, setWounds] = useState<{ type: string; severity: string }[]>([]);

  // prende size nativa
  const onImgLoad = () => {
    if (imgRef.current) {
      setNaturalSize({
        w: imgRef.current.naturalWidth,
        h: imgRef.current.naturalHeight,
      });
    }
  };

  const displayToNatural = (dx: number, dy: number) => {
    if (!containerRef.current || !naturalSize) return { nx: dx, ny: dy };
    const rect = containerRef.current.getBoundingClientRect();
    const dw = rect.width;
    const dh = rect.height;
    const sx = naturalSize.w / dw;
    const sy = naturalSize.h / dh;
    return { nx: dx * sx, ny: dy * sy };
  };

  const percentBox = (tlx: number, tly: number, brx: number, bry: number) => {
    if (!naturalSize) return { left: 0, top: 0, width: 0, height: 0 };
    const left = (tlx / naturalSize.w) * 100;
    const top = (tly / naturalSize.h) * 100;
    const width = ((brx - tlx) / naturalSize.w) * 100;
    const height = ((bry - tly) / naturalSize.h) * 100;
    return { left, top, width, height };
  };

  // pointer down
  const onPointerDown = (e: React.PointerEvent) => {
    if (!annotateMode || !containerRef.current) return;
    containerRef.current.setPointerCapture(e.pointerId);
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left;
    const dy = e.clientY - rect.top;
    setStartPx({ x: dx, y: dy });
    setDragging(true);
  };

  // pointer move
  const onPointerMove = (e: React.PointerEvent) => {
    if (!annotateMode || !dragging || !containerRef.current || !startPx) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const dy = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const { nx: tlx, ny: tly } = displayToNatural(
      Math.min(startPx.x, dx),
      Math.min(startPx.y, dy)
    );
    const { nx: brx, ny: bry } = displayToNatural(
      Math.max(startPx.x, dx),
      Math.max(startPx.y, dy)
    );

    setPreviewRect({ tlx, tly, brx, bry });
  };

  // pointer up → apre modale
  const onPointerUp = () => {
    if (!annotateMode || !dragging || !previewRect) {
      resetDrawing();
      return;
    }

    if (previewRect.brx - previewRect.tlx < 10 || previewRect.bry - previewRect.tly < 10) {
      resetDrawing();
      return;
    }

    setEditingAnnotation(null); // nuovo
    setShowModal(true);
    setDragging(false);
    loadSpecimens();
  };

  const resetDrawing = () => {
    setDragging(false);
    setPreviewRect(null);
    setStartPx(null);
  };

  // carica esemplari già visti
  const loadSpecimens = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/specimens", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpecimens(res.data);
    } catch {
      console.error("Errore caricamento esemplari");
    }
  };

  // salva annotazione
  const confirmAnnotation = async (payload: {
    newWounds: { type: string; severity: string }[];
    removeWoundIds: number[];
  }) => {
    const { newWounds, removeWoundIds } = payload;

    try {
      const token = localStorage.getItem("token");

      let specimenId: number | null = selectedSpecimen.id;

      // Se non c’è id ma c’è un nome → crea specimen nuovo
      if (!specimenId && selectedSpecimen.name) {
        const res = await axios.post(
          "http://localhost:3000/specimens",
          { name: selectedSpecimen.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        specimenId = res.data.id;
      }

      if (!editingAnnotation && previewRect) {
        // ➕ Nuova annotazione
        await axios.post(
          `http://localhost:3000/sighting-images/${image.id}/annotations`,
          {
            tl_x: Math.round(previewRect.tlx),
            tl_y: Math.round(previewRect.tly),
            br_x: Math.round(previewRect.brx),
            br_y: Math.round(previewRect.bry),
            specimenName: selectedSpecimen.name, // usa specimenName, lato backend hai l’upsert
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (editingAnnotation) {
        // ✏️ Aggiornamento annotazione esistente
        await axios.patch(
          `http://localhost:3000/annotations/${editingAnnotation.id}`,
          { specimenName: selectedSpecimen.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // 🔄 Aggiorna ferite
      if (specimenId) {
        // rimuovi quelle esistenti che l’utente ha tolto
        for (const wid of removeWoundIds) {
          await axios.delete(`http://localhost:3000/specimens/wounds/${wid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        // aggiungi quelle nuove
        for (const wound of newWounds) {
          await axios.post(
            `http://localhost:3000/specimens/${specimenId}/wounds`,
            wound,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      onSaved?.();
    } catch (err) {
      console.error("Errore salvataggio annotazione o ferite:", err);
    } finally {
      setShowModal(false);
      resetDrawing();
      setAnnotateMode(false);
      setSelectedSpecimen({ id: null, name: "" });
      setWounds([]);
    }
  };

  const cancelAnnotation = () => {
    setShowModal(false);
    resetDrawing();
    setSelectedSpecimen({ id: null, name: "" });
  };

  const deleteAnnotation = async () => {
    if (!showDeleteModal) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/annotations/${showDeleteModal}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onSaved) onSaved();
    } catch {
      console.error("Errore eliminazione annotazione");
    } finally {
      setShowDeleteModal(null);
    }
  };

  // ESC per uscire modalità annotazione
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAnnotateMode(false);
        resetDrawing();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative group border rounded-lg overflow-hidden select-none">
      {/* Toolbar */}
      <div className="absolute z-20 top-2 left-2 flex gap-2 opacity-90">
        <button
          type="button"
          aria-pressed={annotateMode}
          aria-label="Attiva modalità annotazione"
          onClick={() => setAnnotateMode((v) => !v)}
          className={`px-3 py-1.5 text-xs rounded ${
            annotateMode ? "bg-yellow-600 text-white" : "bg-gray-800 text-white"
          }`}
        >
          {annotateMode ? "Annotazione attiva" : "Annota"}
        </button>
      </div>

      {/* Immagine + layer annotazioni */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ touchAction: annotateMode ? "none" : "auto" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          ref={imgRef}
          src={`http://localhost:3000${image.url}`}
          alt="Foto avvistamento"
          className="w-full h-auto block"
          draggable={false}
          onLoad={onImgLoad}
        />

        {/* Annotazioni */}
        {naturalSize && (image.annotations || []).map((ann) => {
          const { left, top, width, height } = percentBox(
            ann.tl_x, ann.tl_y, ann.br_x, ann.br_y
          );
          return (
            <div
              key={ann.id}
              className="absolute border-2 border-yellow-400 bg-yellow-200/30 cursor-pointer"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
              onClick={() => {
                setEditingAnnotation(ann);
                setSelectedSpecimen({ id: ann.specimen?.id ?? null, name: ann.specimen?.name ?? "" });
                setShowModal(true);
                loadSpecimens();
              }}
            >
              {ann.specimen?.name && (
                <span className="absolute -top-6 left-0 text-xs bg-yellow-500 text-white px-1.5 py-0.5 rounded">
                  {ann.specimen.name}
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(ann.id);
                }}
                className="absolute bottom-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* Rettangolo anteprima */}
        {naturalSize && previewRect && (() => {
          const { left, top, width, height } = percentBox(
            previewRect.tlx, previewRect.tly, previewRect.brx, previewRect.bry
          );
          return (
            <div
              className="absolute z-10 border-2 border-sky-500 bg-sky-300/20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
            />
          );
        })()}
      </div>

      {showModal && (
        <AnnotationModal
          specimens={specimens}
          selectedSpecimen={selectedSpecimen}
          setSelectedSpecimen={setSelectedSpecimen}
          onCancel={cancelAnnotation}
          onConfirm={(newWounds) => confirmAnnotation(newWounds)} 
        />
      )}

      {/* Modale elimina */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Conferma eliminazione</h2>
            <p className="mb-4 text-sm text-gray-600">
              Sei sicuro di voler eliminare questa annotazione?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annulla
              </button>
              <button
                onClick={deleteAnnotation}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
