import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Account } from '../types/account';
import { mockAccounts } from '../data/mockAccounts';

interface DataContextType {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  updateAccount: (accountId: string, updates: Partial<Account>) => void;
  getAccountById: (accountId: string) => Account | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  const updateAccount = (accountId: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId ? { ...account, ...updates } : account
    ));
  };

  const getAccountById = (accountId: string) => {
    return accounts.find(account => account.id === accountId);
  };

  return (
    <DataContext.Provider value={{ 
      accounts, 
      setAccounts, 
      updateAccount, 
      getAccountById 
    }}>
      {children}
    </DataContext.Provider>
  );
}