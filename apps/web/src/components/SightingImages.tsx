import { useEffect, useState } from "react";
import axios from "axios";
import UploadImageButton from "./UploadImageButton";
import ImageWithAnnotations from "./ImageWithAnnotations";

interface Image {
  id: number;
  url: string;
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
        `http://localhost:3000/sightings/${sightingId}/images`,
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
        `http://localhost:3000/sightings/${sightingId}/images`,
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

  const handleDelete = async (id: number) => {
    if (!confirm("Vuoi davvero eliminare questa foto?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/sightings/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages((imgs) => imgs.filter((i) => i.id !== id));
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <ImageWithAnnotations image={img} />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded opacity-80 group-hover:opacity-100"
              >
                Elimina
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
