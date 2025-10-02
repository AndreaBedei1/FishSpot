import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, User, BarChart2, Bell } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function BottomNav() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Home size={28} color="#0ea5e9" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <User size={28} color="#0ea5e9" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/stats")}>
        <BarChart2 size={28} color="#0ea5e9" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/notifications")}>
        <Bell size={28} color="#0ea5e9" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
});
