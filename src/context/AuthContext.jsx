import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// --- DUMMY USERS ---
// Ganti ini nanti dengan API call ke backend
const DUMMY_USERS = [
  { id: 1, username: 'admin', password: '1234', role: 'admin', name: 'Admin Kasir' },
  { id: 2, username: 'kasir', password: '1234', role: 'admin', name: 'Kasir 2' },
  { id: 3, username: 'user',  password: '1234', role: 'user',  name: 'Customer' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Cek apakah sudah login sebelumnya (simpan di sessionStorage)
    const saved = sessionStorage.getItem('oishigiri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    const found = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const { password: _, ...safeUser } = found; // jangan simpan password
      setUser(safeUser);
      sessionStorage.setItem('oishigiri_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Username atau password salah.' };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('oishigiri_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
