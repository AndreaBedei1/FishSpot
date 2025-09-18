import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import SightingPage from "./pages/SightingPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/settings" element={token ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/sightings/:id" element={token ? <SightingPage /> : <Navigate to="/login" />} />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
