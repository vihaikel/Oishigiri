import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('oishigiri_token'));
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('oishigiri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isLoggedIn = !!token;

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    sessionStorage.setItem('oishigiri_token', nextToken);
    sessionStorage.setItem('oishigiri_user', JSON.stringify(nextUser));
  };

  const login = async (usernameOrEmail, password) => {
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: { username: usernameOrEmail, password },
      });

      const result = res.data;
      persist(result.token, result.user);

      return { success: true, user: result.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

const register = async (name, email, password, role) => {
  try {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: { name, email, password, role },
    });

    if (res?.data?.token && res?.data?.user) {
      persist(res.data.token, res.data.user);
      return { success: true, user: res.data.user };
    }

    return { success: true, user: res.data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('oishigiri_token');
    sessionStorage.removeItem('oishigiri_user');
  };

  useEffect(() => {
    const loadMe = async () => {
      if (!token) return;
      try {
        const me = await apiFetch('/auth/me', { token });
        setUser(me);
        sessionStorage.setItem('oishigiri_user', JSON.stringify(me));
      } catch (err) {
        logout();
      }
    };
    loadMe();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};