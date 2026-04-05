import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../utils/mockData';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => 
    loadFromLocalStorage('transactions', initialTransactions)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    saveToLocalStorage('transactions', transactions);
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [{
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    }, ...prev]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    ));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const filteredAndSortedTransactions = () => {
    let filtered = [...transactions];
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount-asc':
        filtered.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        break;
      case 'amount-desc':
        filtered.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    filteredTransactions: filteredAndSortedTransactions(),
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};