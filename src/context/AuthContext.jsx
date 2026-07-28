import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';
import { supabase } from '../services/supabaseClient';

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

    // Attempt backend login first
    try {
      const res = await ApiService.login({ email: userOrRole, username: userOrRole, password });
      if (res && res.token) {
        localStorage.setItem('erp_token', res.token);
        setCurrentUser(res.user);
        return res;
      }
    } catch (backendError) {
      console.warn('Backend login failed:', backendError.message);
      // fallback to Supabase auth for deployed environments using Supabase
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userOrRole,
        password
      });

      if (error || !data?.user) {
        throw new Error(error?.message || 'Invalid email or password');
      }

      const supabaseUser = {
        id: data.user.id,
        role: data.user.user_metadata?.role || 'student',
        name: data.user.user_metadata?.name || data.user.email,
        email: data.user.email,
        collegeId: data.user.user_metadata?.collegeId || null
      };

      localStorage.setItem('erp_token', data.session?.access_token || '');
      setCurrentUser(supabaseUser);
      return { success: true, user: supabaseUser, token: data.session?.access_token };
    } catch (supabaseError) {
      console.warn('Supabase login failed:', supabaseError.message);
      throw new Error(supabaseError.message || 'Authentication failed');
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
