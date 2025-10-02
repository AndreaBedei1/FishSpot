import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  img?: string;
};

type MessageType = "success" | "warning" | "error";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("/profile.webp");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("success");

  const showMessage = (text: string, type: MessageType = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000); // sparisce dopo 3s
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get<User>("http://isi-seawatch.csr.unibo.it:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.firstName || "");
        setLastName(res.data.lastName || "");
        setProfileImg(res.data.img || "/default-avatar.png");
      })
      .catch(() => showMessage("Errore nel caricamento dei dati utente", "error"));
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://isi-seawatch.csr.unibo.it:3000/users/me",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Dati aggiornati con successo", "success");
    } catch {
      showMessage("Errore nell’aggiornamento dei dati", "error");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showMessage("Le password non coincidono", "warning");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://isi-seawatch.csr.unibo.it:3000/users/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showMessage("Password aggiornata con successo", "success");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      showMessage("Errore nel cambio password", "error");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://isi-seawatch.csr.unibo.it:3000/users/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImg(`${res.data.imgUrl}?t=${Date.now()}`);
      showMessage("Immagine aggiornata", "success");
    } catch {
      showMessage("Errore nell'upload dell'immagine", "error");
    }
  };

  // colori dinamici
  const bannerColors = {
    success: "bg-green-600",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
          Impostazioni account
        </h1>

        {message && (
          <div
            role="alert"
            className={`fixed top-20 left-1/2 -translate-x-1/2 ${bannerColors[messageType]} text-white text-sm lg:text-lg font-medium px-4 lg:px-6 py-2 lg:py-3 rounded-lg shadow-lg z-50`}
          >
            {message}
          </div>
        )}

        {/* Foto profilo */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Foto profilo</h2>
          <div className="flex items-center space-x-4">
            <img
              src={profileImg}
              alt="Foto profilo"
              className="w-20 h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-cover border"
            />
            <label className="cursor-pointer bg-sky-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition text-sm lg:text-base">
              Cambia foto
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </section>

        {/* Dati utente */}
        <form
          onSubmit={handleProfileUpdate}
          className="bg-white shadow rounded-lg p-6 mb-6 space-y-4"
        >
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Informazioni personali</h2>
          <div>
            <label className="block text-sm lg:text-base font-medium mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm lg:text-base font-medium mb-1">Nome</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg"
              />
            </div>
            <div>
              <label className="block text-sm lg:text-base font-medium mb-1">Cognome</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 lg:py-3 text-base lg:text-lg rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
          >
            Salva modifiche
          </button>
        </form>

        {/* Cambio password */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Cambio password</h2>
          <div>
            <label className="block text-sm lg:text-base font-medium mb-1">
              Password attuale
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg"
            />
          </div>
          <div>
            <label className="block text-sm lg:text-base font-medium mb-1">
              Nuova password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg"
            />
          </div>
          <div>
            <label className="block text-sm lg:text-base font-medium mb-1">
              Conferma nuova password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 lg:py-3 text-base lg:text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 lg:py-3 text-base lg:text-lg rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
          >
            Aggiorna password
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
