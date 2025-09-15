import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-300 to-sky-200">
      {/* Contenuto centrale */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Logo e titolo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src="/logo.png"
            alt="Logo applicazione FishSpot"
            className="h-20 w-auto sm:h-28 lg:h-36 mb-4"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Accedi
          </h1>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
            Inserisci le tue credenziali
          </p>
        </div>

        {/* Box login */}
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {error && (
              <p role="alert" className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Accedi
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-gray-700 hover:text-sky-600 underline"
            >
              Non ho un account
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-sky-600 underline"
            >
              Recupera password
            </button>
          </div>

          <button
            type="button"
            className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Scarica l’APP
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-gray-700 text-xs text-center bg-transparent">
        <p>
          © 2024 Copyright:{' '}
          <a
            href="https://isi-finSpot.csr.unibo.it"
            className="underline hover:text-blue-600"
          >
            isi-finSpot.csr.unibo.it
          </a>
        </p>
        <a
          onClick={() => navigate('/privacy')}
          className="underline hover:text-blue-600 cursor-pointer"
        >
          Informativa privacy
        </a>
      </footer>
    </div>
  );
}
