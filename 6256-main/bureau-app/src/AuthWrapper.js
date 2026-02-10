import React, { useState, useEffect } from 'react';
import { api, getToken } from './api';
import Login from './pages/Login';
import App from './App';

export default function AuthWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api.getMe(token)
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (token, u) => {
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem('bureau_token');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        Загрузка...
      </div>
    );
  }
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  return <App user={user} onLogout={handleLogout} />;
}
