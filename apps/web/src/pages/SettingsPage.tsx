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

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("/profile.webp");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get<User>("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.firstName || "");
        setLastName(res.data.lastName || "");
        setProfileImg(res.data.img || "/default-avatar.png");
      })
      .catch(() => setMessage("Errore nel caricamento dei dati utente"));
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/users/me",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Dati aggiornati con successo");
    } catch {
      setMessage("Errore nell’aggiornamento dei dati");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Le password non coincidono");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/users/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Password aggiornata con successo");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Errore nel cambio password");
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
        "http://localhost:3000/users/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImg(res.data.imgUrl);
      setMessage("Immagine aggiornata");
    } catch {
      setMessage("Errore nell'upload dell'immagine");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Impostazioni account
        </h1>

        {message && (
          <p
            role="alert"
            className="mb-4 text-sm text-center font-medium text-blue-600"
          >
            {message}
          </p>
        )}

        {/* Foto profilo */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Foto profilo</h2>
          <div className="flex items-center space-x-4">
            <img
              src={profileImg}
              alt="Foto profilo"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <label className="cursor-pointer bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition">
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
          <h2 className="text-lg font-semibold mb-4">Informazioni personali</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cognome</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
          >
            Salva modifiche
          </button>
        </form>

        {/* Cambio password */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold mb-4">Cambio password</h2>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password attuale
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nuova password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Conferma nuova password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
          >
            Aggiorna password
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
