import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('cravecart_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const login = (userData) => {
    const user = {
      id: 'u1',
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      phone: '',
      address: '',
      avatar: null,
      joinedAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('cravecart_user', JSON.stringify(user));
    setShowAuthModal(false);
  };

  const signup = (userData) => {
    const user = {
      id: 'u' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: '',
      address: '',
      avatar: null,
      joinedAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('cravecart_user', JSON.stringify(user));
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cravecart_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('cravecart_user', JSON.stringify(updated));
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        showAuthModal,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
