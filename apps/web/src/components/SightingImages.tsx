import { useEffect, useState } from "react";
import axios from "axios";
import UploadImageButton from "./UploadImageButton";
import ImageWithAnnotations from "./ImageWithAnnotations";

interface Image {
  id: number;
  url: string;
  annotations?: {
    id: number;
    tl_x: number; tl_y: number; br_x: number; br_y: number;
    specimenId: number | null;
    specimen?: { id: number; name: string | null } | null;
  }[];
}

interface Props {
  sightingId: number;
}

export default function SightingImages({ sightingId }: Props) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/sighting-images/${sightingId}/images`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImages(res.data);
    } catch {
      alert("Errore nel caricamento delle immagini");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/sighting-images/${sightingId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      loadImages();
    } catch {
      alert("Errore nel caricamento dell’immagine");
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("Vuoi davvero eliminare questa foto?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/sighting-images/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages((imgs) => imgs.filter((i) => i.id !== imageId));
    } catch {
      alert("Errore nell’eliminazione");
    }
  };

  useEffect(() => {
    loadImages();
  }, [sightingId]);

  return (
    <section className="mt-10 bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Foto avvistamento</h2>
        <UploadImageButton onUpload={handleUpload} />
      </div>

      {loading ? (
        <p className="text-gray-500">Caricamento immagini…</p>
      ) : images.length === 0 ? (
        <p className="text-gray-500 italic">Nessuna foto disponibile.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <ImageWithAnnotations image={img} onSaved={loadImages} />
              <div className="absolute z-30 top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-600 text-white px-2 py-1 text-xs rounded opacity-90"
                  aria-label="Elimina immagine"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
