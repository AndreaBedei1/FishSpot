import React, { useState, useEffect } from "react"; // 👈 aggiunto useEffect
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication"; // 👈 biometrico
import axios from "axios";
import { Colors } from "../constants/theme";

export default function LoginScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const saveItem = async (key: string, value: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  };

  const getItem = async (key: string) => {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  };

  // 👇 useEffect: se è attivo il login biometrico → chiedi subito accesso
  useEffect(() => {
    const tryBiometricLogin = async () => {
      const useBiometric = await getItem("useBiometric");
      if (useBiometric === "true") {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autenticati per accedere",
          });

          if (result.success) {
            const token = await getItem("token");
            if (token) {
              router.replace("/home");
            }
          }
        }
      }
    };
    tryBiometricLogin();
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Errore", "Inserisci email e password");
      return;
    }

    if (isRegister) {
      if (!nome || !cognome) {
        Alert.alert("Errore", "Inserisci nome e cognome");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Errore", "Le password non coincidono");
        return;
      }
    }

    setLoading(true);
    try {
      if (isRegister) {
        // Registrazione
        await axios.post("http://192.168.1.22:3000/auth/register", {
          nome,
          cognome,
          email,
          password,
        });
        Alert.alert("Successo", "Registrazione completata, ora effettua il login");
        setIsRegister(false);
        setNome("");
        setCognome("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Login
        const res = await axios.post("http://192.168.1.22:3000/auth/login", {
          email,
          password,
        });

        const token = res.data.access_token;
        await saveItem("token", token);

        // Popup per abilitare login biometrico
        Alert.alert("Login biometrico",
          "Vuoi attivare l’accesso con impronta digitale / FaceID?",
          [
            { text: "No", style: "cancel", onPress: () => router.replace("/home") },
            { text: "Sì", onPress: async () => {
                await saveItem("useBiometric", "true");
                router.replace("/home");
              }
            }
          ]
        );
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          Alert.alert("Errore", "Credenziali non valide");
        } else if (status === 400) {
          Alert.alert("Errore", err.response?.data?.message || "Richiesta non valida");
        } else {
          Alert.alert("Errore", "Problema di connessione al server");
        }
      } else {
        Alert.alert("Errore", "Operazione fallita");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {isRegister ? "Registrati" : "Login"}
      </Text>

      {isRegister && (
        <>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.tint }]}
            placeholder="Nome"
            placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.tint }]}
            placeholder="Cognome"
            placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
            value={cognome}
            onChangeText={setCognome}
          />
        </>
      )}

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.tint }]}
        placeholder="Email"
        placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.tint }]}
        placeholder="Password"
        placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      {isRegister && (
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.tint }]}
          placeholder="Conferma Password"
          placeholderTextColor={scheme === "dark" ? "#aaa" : "#666"}
          secureTextEntry
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      <View style={{ marginTop: 10 }}>
        <Button
          title={loading ? "Attendere..." : isRegister ? "Registrati" : "Accedi"}
          onPress={handleSubmit}
          color={colors.tint}
        />
      </View>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ paddingVertical: 12 }}>
        <Text style={{ textAlign: "center", color: colors.tint, fontSize: 16 }}>
          {isRegister ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
});
