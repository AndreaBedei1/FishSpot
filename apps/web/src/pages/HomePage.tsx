import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [user, setUser] = useState<{ userId: number; email: string } | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Home</h2>
      {user ? (
        <>
          <p>Benvenuto {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}
