import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <View style={styles.content}>
        <Text>Qui mostrerai i dati dell’utente (nome, email, foto, ecc.)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", margin: 16 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
});
