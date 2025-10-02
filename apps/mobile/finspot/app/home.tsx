import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import axios from "axios";
import { openDB } from "../db";
import { API_URL } from "../constants/config";
import MapLibreGL from "@maplibre/maplibre-react-native";
import BottomNav from "../components/BottomNav";

type Sighting = {
  id: number;
  date: string;
  notes?: string | null;
  latitude: number;
  longitude: number;
  animalName: string;
  dirty?: number;
};

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

export default function HomeScreen() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const router = useRouter();

  const regionCenter = useMemo(() => {
    if (sightings.length > 0) {
      return [sightings[0].longitude, sightings[0].latitude] as [number, number];
    }
    return [12.0, 44.0] as [number, number];
  }, [sightings]);

  useEffect(() => {
    const init = async () => {
      try {
        const db = await openDB();
        const rows = await db.getAllAsync(
          "SELECT * FROM sightings ORDER BY date DESC"
        ) as Sighting[];
        setSightings(rows);

        const state = await NetInfo.fetch();
        if (state.isConnected) {
          await syncWithBackend(db);
          const updated = await db.getAllAsync(
            "SELECT * FROM sightings ORDER BY date DESC"
          ) as Sighting[];
          setSightings(updated);
        }

        // scarica mappe offline automaticamente
        try {
          await MapLibreGL.OfflineManager.createPack(
            {
              name: "area-rimini",
              styleURL: MAP_STYLE,
              minZoom: 5,
              maxZoom: 18, // 18 = alta definizione
              bounds: [
                [11.8, 43.8],
                [12.6, 44.4],
              ],
            },
            (p) => console.log("Scaricamento:", p),
            (e) => console.error("Errore offline:", e)
          );
        } catch (e) {
          console.log("Mappe offline già disponibili o errore:", e);
        }

      } catch (err) {
        console.error("❌ Errore apertura DB:", err);
      }
    };
    init();
  }, []);

  const syncWithBackend = async (db: any) => {
    try {
      const token = Platform.OS === "web"
        ? localStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
      if (!token) return;

      const dirtyRows = await db.getAllAsync("SELECT * FROM sightings WHERE dirty = 1") as Sighting[];
      for (let s of dirtyRows) {
        try {
          await axios.post(`${API_URL}/sightings`, {
            date: s.date,
            notes: s.notes,
            latitude: s.latitude,
            longitude: s.longitude,
          }, { headers: { Authorization: `Bearer ${token}` } });

          await db.runAsync("UPDATE sightings SET dirty = 0 WHERE id = ?", [s.id]);
        } catch (err) {
          console.log("Errore sync avvistamento:", err);
        }
      }

      const res = await axios.get(`${API_URL}/sightings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const items = Array.isArray(res.data) ? res.data : (res.data.items ?? []);
      for (let r of items) {
        const animalName = r.animalName ?? r.animal?.name ?? "Sconosciuto";
        await db.runAsync(
          `INSERT OR REPLACE INTO sightings 
           (id, date, notes, latitude, longitude, animalName, dirty) 
           VALUES (?, ?, ?, ?, ?, ?, 0)`,
          [r.id, r.date, r.notes, r.latitude, r.longitude, animalName]
        );
      }
    } catch (err) {
      console.log("Errore sync:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>I tuoi avvistamenti</Text>

      {/* MAPPA CON MARKER COLORATI */}
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView style={styles.map} mapStyle={MAP_STYLE}>
          <MapLibreGL.Camera zoomLevel={7} centerCoordinate={regionCenter} />

          <MapLibreGL.ShapeSource
            id="sightings"
            shape={{
              type: "FeatureCollection",
              features: sightings.map((s) => ({
                type: "Feature",
                geometry: { type: "Point", coordinates: [s.longitude, s.latitude] },
                properties: { id: s.id, animalName: s.animalName },
              })),
            }}
            onPress={(e) => {
              const feature = e.features[0];
              if (feature?.properties?.id) {
                router.push(`/sighting/${feature.properties.id}`);
              }
            }}
          >
            <MapLibreGL.CircleLayer
              id="sightings-circles"
              style={{
                circleRadius: 8,
                circleStrokeWidth: 2,
                circleStrokeColor: "#fff",
                circleColor: [
                  "match",
                  ["get", "animalName"],
                  "Balena", "#a855f7",
                  "Delfino", "#0ea5e9",
                  "Foca", "#64748b",
                  "Razza", "#14b8a6",
                  "Squalo", "#ef4444",
                  "Tartaruga", "#10b981",
                  "Tonno", "#f59e0b",
                  "#6b7280",
                ],
              }}
            />
          </MapLibreGL.ShapeSource>
        </MapLibreGL.MapView>
      </View>

      {/* LISTA AVVISTAMENTI */}
      <FlatList
        data={sightings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/sighting/${item.id}`)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>
                📅 {new Date(item.date).toLocaleDateString()} — {item.animalName}
              </Text>
              <Text style={styles.subText}>
                {item.notes || "Nessuna nota"}{" "}
                {item.dirty === 1 ? "  ⏳ non sincronizzato" : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* NAVBAR */}
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", margin: 10 },
  mapContainer: { width: "100%", height: 280 },
  map: { width: "100%", height: "100%" },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { fontSize: 16, fontWeight: "600" },
  subText: { fontSize: 13, color: "#555", marginTop: 2 },
});
