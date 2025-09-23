import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export default function Index() {
  const [route, setRoute] = useState<"/login" | "/home">("/login");

  useEffect(() => {
    const checkBiometric = async () => {
      let useBiometric = false;

      if (Platform.OS === "web") {
        useBiometric = localStorage.getItem("useBiometric") === "true";
      } else {
        useBiometric = (await SecureStore.getItemAsync("useBiometric")) === "true";
      }

      if (useBiometric) {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autenticati per accedere",
          });

          if (result.success) {
            // 👇 recupera anche il token
            let token: string | null = null;
            if (Platform.OS === "web") {
              token = localStorage.getItem("token");
            } else {
              token = await SecureStore.getItemAsync("token");
            }

            if (token) {
              setRoute("/home");
              return;
            }
          }
        }
      }

      // se non va, manda a login
      setRoute("/login");
    };

    checkBiometric();
  }, []);

  return <Redirect href={route} />;
}
