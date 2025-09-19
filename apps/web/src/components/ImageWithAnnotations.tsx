import { useRef, useState } from "react";

interface Image {
  id: number;
  url: string;
}

interface Annotation {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  image: Image;
}

export default function ImageWithAnnotations({ image }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!drawing || !start || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const width = endX - start.x;
    const height = endY - start.y;

    if (Math.abs(width) > 10 && Math.abs(height) > 10) {
      setAnnotations((anns) => [
        ...anns,
        { x: start.x, y: start.y, width, height },
      ]);
    }

    setDrawing(false);
    setStart(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative border rounded overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        src={`http://localhost:3000${image.url}`}
        alt="Foto avvistamento"
        className="w-full h-auto block"
        draggable={false}
      />

      {annotations.map((a, idx) => (
        <div
          key={idx}
          className="absolute border-2 border-yellow-400 bg-yellow-200 bg-opacity-30"
          style={{
            left: `${a.x}px`,
            top: `${a.y}px`,
            width: `${a.width}px`,
            height: `${a.height}px`,
          }}
        />
      ))}
    </div>
  );
}
