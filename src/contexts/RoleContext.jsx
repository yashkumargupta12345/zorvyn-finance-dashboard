import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => 
    loadFromLocalStorage('userRole', 'viewer')
  );

  useEffect(() => {
    saveToLocalStorage('userRole', role);
  }, [role]);

  const isAdmin = role === 'admin';
  const isViewer = role === 'viewer';

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin, isViewer }}>
      {children}
    </RoleContext.Provider>
  );
};