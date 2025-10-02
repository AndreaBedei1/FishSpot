import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { openDB } from "../../db";

type Sighting = {
  id: number;
  date: string;
  notes?: string;
  latitude: number;
  longitude: number;
  wind?: string;
  sea?: string;
  specimens?: number;
  animalId?: number;
  speciesId?: number;
};

export default function SightingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sighting, setSighting] = useState<Sighting | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const db = await openDB();
        const rows = await db.getAllAsync(
          "SELECT * FROM sightings WHERE id = ?",
          [id]
        ) as Sighting[];
        if (rows.length > 0) {
          setSighting(rows[0]);
        }
      } catch (err) {
        console.error("Errore caricamento dettaglio:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!sighting) {
    return (
      <View style={styles.center}>
        <Text>⚠️ Avvistamento non trovato</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dettaglio Avvistamento</Text>
      <Text>📅 Data: {new Date(sighting.date).toLocaleString()}</Text>
      <Text>📝 Note: {sighting.notes || "Nessuna nota"}</Text>
      <Text>👥 Esemplari: {sighting.specimens ?? "-"}</Text>
      <Text>💨 Vento: {sighting.wind ?? "-"}</Text>
      <Text>🌊 Mare: {sighting.sea ?? "-"}</Text>
      <Text>
        🌍 Coordinate: {sighting.latitude}, {sighting.longitude}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
