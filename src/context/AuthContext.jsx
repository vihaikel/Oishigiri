import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const DUMMY_USERS = [
  { id: 1, username: 'kasir', password: '1234', role: 'admin', name: 'Kasir' },
  { id: 2, username: 'user',  password: '1234', role: 'user',  name: 'Customer' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('oishigiri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (usernameOrEmail, password) => {
    const found = DUMMY_USERS.find(
      (u) => u.username === usernameOrEmail && u.password === password
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      sessionStorage.setItem('oishigiri_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Username atau password salah.' };
  };

  const register = (name, username, email, password) => {
    const newUser = { id: Date.now(), username, email, name, role: 'user' };
    setUser(newUser);
    sessionStorage.setItem('oishigiri_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('oishigiri_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};