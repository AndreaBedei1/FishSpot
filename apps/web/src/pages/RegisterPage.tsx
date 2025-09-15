import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3000/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      setSuccess('Registrazione completata con successo! Ora puoi accedere.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Errore durante la registrazione',
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-300 to-sky-200">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Logo e titolo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src="/logo.png"
            alt="Logo applicazione FishSpot"
            className="h-20 w-auto sm:h-28 lg:h-36 mb-4"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Registrati
          </h1>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
            Crea un nuovo account
          </p>
        </div>

        {/* Box registrazione */}
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-md">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cognome
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

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
                minLength={6}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {error && (
              <p role="alert" className="text-red-600 text-sm">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-green-600 text-sm">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Registrati
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-4 text-center">
            Hai già un account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-sky-600 underline hover:text-sky-800"
            >
              Accedi
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-gray-700 text-xs text-center">
        <p>
          © 2024 Copyright:{' '}
          <a
            href="https://isi-seawatch.csr.unibo.it"
            className="underline hover:text-blue-600"
          >
            isi-seawatch.csr.unibo.it
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
