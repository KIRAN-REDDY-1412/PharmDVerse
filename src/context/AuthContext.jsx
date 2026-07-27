import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('erp_currentUser');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Error loading erp_currentUser:', e);
    }
    return null; 
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('erp_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('erp_currentUser');
    }
  }, [currentUser]);

  const login = async (userOrRole, password) => {
    if (typeof userOrRole === 'object' && userOrRole !== null) {
      setCurrentUser(userOrRole);
      return { success: true, user: userOrRole };
    }

    try {
      const res = await ApiService.login({ email: userOrRole, username: userOrRole, password });
      if (res && res.token) {
        localStorage.setItem('erp_token', res.token);
        setCurrentUser(res.user);
        return res;
      }
    } catch (err) {
      console.warn('API login error:', err.message);
      throw err;
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
