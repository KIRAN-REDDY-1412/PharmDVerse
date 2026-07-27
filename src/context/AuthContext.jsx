import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/MockDatabase';

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

  const login = (userOrRole) => {
    if (typeof userOrRole === 'object' && userOrRole !== null) {
      setCurrentUser(userOrRole);
    } else {
      const user = INITIAL_USERS.find(u => u.role === userOrRole);
      if (user) {
        setCurrentUser(user);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('erp_currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
