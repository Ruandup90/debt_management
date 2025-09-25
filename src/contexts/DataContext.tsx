import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CollectionCase, ImportData, Activity, Note, Document } from '../types/data';
import { mockCollectionCases } from '../data/mockData';
import { applyStrategyToAllCases, applyCollectionStrategy } from '../utils/strategyEngine';

interface DataContextType {
  collectionCases: CollectionCase[];
  importData: (data: ImportData[]) => void;
  updateCase: (caseId: string, updates: Partial<CollectionCase>) => void;
  addActivity: (caseId: string, activity: Omit<Activity, 'id'>) => void;
  addNote: (caseId: string, note: Omit<Note, 'id'>) => void;
  addDocument: (caseId: string, document: Omit<Document, 'id'>) => void;
  getCaseById: (caseId: string) => CollectionCase | undefined;
  reapplyStrategy: () => void;
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
  const [collectionCases, setCollectionCases] = useState<CollectionCase[]>(
    applyStrategyToAllCases(mockCollectionCases)
  );

  const importData = (data: ImportData[]) => {
    setCollectionCases(prevCases => {
      const updatedCases = prevCases.map(collectionCase => {
        const importRecord = data.find(d => d.accountNumber === collectionCase.accountNumber);
        
        if (importRecord) {
          const updatedCase = {
            ...collectionCase,
            ...(importRecord.outstandingBalance !== undefined && { outstandingBalance: importRecord.outstandingBalance }),
            ...(importRecord.lastPaymentAmount !== undefined && { lastPaymentAmount: importRecord.lastPaymentAmount }),
            ...(importRecord.lastPaymentDate && { lastPaymentDate: importRecord.lastPaymentDate }),
            ...(importRecord.totalDaysInArrears !== undefined && { totalDaysInArrears: importRecord.totalDaysInArrears }),
          };
          
          // Apply strategy to updated case
          return applyCollectionStrategy(updatedCase);
        }
        
        return collectionCase;
      });
      
      return updatedCases;
    });
  };

  const updateCase = (caseId: string, updates: Partial<CollectionCase>) => {
    setCollectionCases(prevCases => 
      prevCases.map(collectionCase => 
        collectionCase.id === caseId 
          ? { ...collectionCase, ...updates }
          : collectionCase
      )
    );
  };

  const addActivity = (caseId: string, activity: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activity,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setCollectionCases(prevCases => 
      prevCases.map(collectionCase => 
        collectionCase.id === caseId 
          ? { 
              ...collectionCase, 
              activities: [...collectionCase.activities, newActivity],
              lastActionedDate: new Date().toISOString().split('T')[0]
            }
          : collectionCase
      )
    );
  };

  const addNote = (caseId: string, note: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...note,
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setCollectionCases(prevCases => 
      prevCases.map(collectionCase => 
        collectionCase.id === caseId 
          ? { ...collectionCase, notes: [...collectionCase.notes, newNote] }
          : collectionCase
      )
    );
  };

  const addDocument = (caseId: string, document: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...document,
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setCollectionCases(prevCases => 
      prevCases.map(collectionCase => 
        collectionCase.id === caseId 
          ? { ...collectionCase, documents: [...collectionCase.documents, newDocument] }
          : collectionCase
      )
    );
  };

  const getCaseById = (caseId: string) => {
    return collectionCases.find(collectionCase => collectionCase.id === caseId);
  };

  const reapplyStrategy = () => {
    setCollectionCases(prevCases => applyStrategyToAllCases(prevCases));
  };

  return (
    <DataContext.Provider value={{
      collectionCases,
      importData,
      updateCase,
      addActivity,
      addNote,
      addDocument,
      getCaseById,
      reapplyStrategy
    }}>
      {children}
    </DataContext.Provider>
  );
}