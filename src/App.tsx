import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DataImport } from './components/DataImport';
import { CollectionQueue } from './components/CollectionQueue';
import { CaseDetails } from './components/CaseDetails';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginScreen } from './components/auth/LoginScreen';

type ActiveView = 'dashboard' | 'data-import' | 'collection-queue' | 'case-details';

function AppContent() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveView('case-details');
  };

  const handleBackFromCaseDetails = () => {
    setSelectedCaseId(null);
    setActiveView('collection-queue');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'data-import':
        return <DataImport />;
      case 'collection-queue':
        return <CollectionQueue onSelectCase={handleSelectCase} />;
      case 'case-details':
        return <CaseDetails caseId={selectedCaseId} onBack={handleBackFromCaseDetails} />;
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