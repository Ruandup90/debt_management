import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StrategyBuilder } from './components/StrategyBuilder';
import { DataImport } from './components/DataImport';
import { CollectionQueue } from './components/CollectionQueue';
import { CaseManagement } from './components/CaseManagement';
import { Reports } from './components/Reports';
import { UserManagement } from './components/UserManagement';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginScreen } from './components/auth/LoginScreen';

type ActiveView = 'dashboard' | 'strategy-builder' | 'data-import' | 'collection-queue' | 'case-management' | 'reports' | 'user-management';

function AppContent() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'strategy-builder':
        return <StrategyBuilder />;
      case 'data-import':
        return <DataImport />;
      case 'collection-queue':
        return <CollectionQueue />;
      case 'case-management':
        return <CaseManagement />;
      case 'reports':
        return <Reports />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;