import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { openDB } from "../db";

export default function DBTestScreen() {
  const [status, setStatus] = useState("Inizializzo DB...");

  useEffect(() => {
    const init = async () => {
      try {
        const db = await openDB();
        setStatus("✅ DB aperto correttamente");

        // Query di test
        const res = await db.getAllAsync("SELECT 1 as test");
        console.log("Risultato query:", res);
        setStatus("✅ Query ok: " + JSON.stringify(res));
      } catch (err) {
        console.error("❌ Errore DB:", err);
        setStatus("❌ Errore DB: " + String(err));
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, textAlign: "center", padding: 20 },
});
