import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: number;
  message: string;
  date: string;
};

const dummyNotifications: Notification[] = [
  { id: 1, message: "Avvistamento approvato", date: "2025-09-24" },
  { id: 2, message: "Nuovo messaggio", date: "2025-09-23" },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifiche</Text>
      <FlatList
        data={dummyNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notifItem}>
            <Text style={styles.notifMessage}>{item.message}</Text>
            <Text style={styles.notifDate}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>Nessuna notifica</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", margin: 16 },
  notifItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notifMessage: { fontSize: 16 },
  notifDate: { fontSize: 12, color: "#666", marginTop: 4 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 },
});
