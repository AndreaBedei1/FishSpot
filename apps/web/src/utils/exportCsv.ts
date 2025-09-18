import type { Sighting } from "../types";

export function exportSightingsToCsv(sightings: Sighting[]) {
  const headers = [
    "ID",
    "Data",
    "Num. esemplari",
    "Latitudine",
    "Longitudine",
    "Animale",
    "Specie",
    "Mare",
    "Vento",
    "Note",
    "Utente email",
  ];

  const rows = sightings.map((s) => [
    s.id,
    new Date(s.date).toISOString(),
    s.specimens,
    s.latitude,
    s.longitude,
    s.animal?.name || "",
    s.species?.name || "",
    s.sea || "",
    s.wind || "",
    s.notes || "",
    s.user?.email || "",
  ]);

  const csvContent =
    [headers, ...rows]
      .map((r) =>
        r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "avvistamenti.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
