import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/MockDatabase';
import ApiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Try to load from localStorage first, otherwise default to Student for initial testing
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('erp_currentUser');
    if (saved) return JSON.parse(saved);
    return INITIAL_USERS.find(u => u.role === 'student'); 
  });

  useEffect(() => {
    localStorage.setItem('erp_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (userOrRole, password) => {
    if (typeof userOrRole === 'object' && userOrRole !== null) {
      setCurrentUser(userOrRole);
    } else {
      try {
        const res = await ApiService.login({ email: userOrRole, username: userOrRole, password });
        if (res.token) {
          localStorage.setItem('erp_token', res.token);
          setCurrentUser(res.user);
          return res;
        }
      } catch (err) {
        console.warn('API login failed, using local context matching:', err.message);
      }
      const user = INITIAL_USERS.find(u => u.role === userOrRole || u.email === userOrRole);
      if (user) {
        setCurrentUser(user);
      }
    }
  };

  const logout = () => {
    ApiService.request('/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
