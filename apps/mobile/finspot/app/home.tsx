import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import axios from "axios";
import { openDB } from "../db";
import { API_URL } from "../constants/config";

type Sighting = {
  id: number;
  date: string;
  notes?: string;
  latitude: number;
  longitude: number;
  dirty?: number;
};

export default function HomeScreen() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const router = useRouter();

  // logout
  const handleLogout = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
      localStorage.removeItem("useBiometric");
    } else {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("useBiometric");
    }
    router.replace("/login");
  };

  // carica dati locali + sync
  useEffect(() => {
    const init = async () => {
      try {
        const db = await openDB();
        console.log("DB ricevuto in HomeScreen:", db);
        const rows = await db.getAllAsync("SELECT * FROM sightings ORDER BY date DESC") as Sighting[];
        setSightings(rows);

        const state = await NetInfo.fetch();
        if (state.isConnected) {
          await syncWithBackend(db);
          const updated = await db.getAllAsync("SELECT * FROM sightings ORDER BY date DESC") as Sighting[];
          setSightings(updated);
        }
      } catch (err) {
        console.error("❌ Errore apertura DB:", err);
      }
    };

    init();
  }, []);



  // sync
  const syncWithBackend = async (db: any) => {
    try {
      const token = Platform.OS === "web"
        ? localStorage.getItem("token")
        : await SecureStore.getItemAsync("token");
      if (!token) return;

      // 1. invia i dirty
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

      // 2. scarica i dati dal backend
      const res = await axios.get(`${API_URL}/sightings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 👇 ora prendiamo items
      const remoteSightings: Sighting[] = Array.isArray(res.data)
        ? res.data
        : res.data.items ?? [];

      for (let s of remoteSightings) {
        await db.runAsync(
          `INSERT OR REPLACE INTO sightings 
          (id, date, notes, latitude, longitude, dirty) 
          VALUES (?, ?, ?, ?, ?, 0)`,
          [s.id, s.date, s.notes, s.latitude, s.longitude]
        );
      }
    } catch (err) {
      console.log("Errore sync:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi avvistamenti</Text>

      <FlatList
        data={sightings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              📅 {new Date(item.date).toLocaleDateString()} - {item.notes || "Nessuna nota"}
            </Text>
            <Text style={styles.coords}>
              🌍 {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
            </Text>
            {item.dirty === 1 && <Text style={{ color: "orange" }}>⏳ Non sincronizzato</Text>}
          </View>
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  itemText: { fontSize: 16 },
  coords: { fontSize: 12, color: "#555" },
});
