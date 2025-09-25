import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { CaseTimeline } from './case/CaseTimeline';
import { CaseNotes } from './case/CaseNotes';
import { CaseDocuments } from './case/CaseDocuments';

interface CaseDetailsProps {
  caseId: string | null;
  onBack: () => void;
}

export function CaseDetails({ caseId, onBack }: CaseDetailsProps) {
  const { getCaseById } = useData();
  const [activeTab, setActiveTab] = useState<'timeline' | 'notes' | 'documents'>('timeline');
  
  if (!caseId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Case Selected</h3>
          <p className="text-gray-600">Select a case from the Collection Queue to view details</p>
        </div>
      </div>
    );
  }

  const caseData = getCaseById(caseId);
  
  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Case Not Found</h3>
          <p className="text-gray-600">The selected case could not be found</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'text-red-600 bg-red-100';
      case 2: return 'text-orange-600 bg-orange-100';
      case 3: return 'text-yellow-600 bg-yellow-100';
      case 4: return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDelinquencyColor = (state: string) => {
    switch (state) {
      case 'current': return 'text-green-600 bg-green-100';
      case 'early': return 'text-blue-600 bg-blue-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{caseData.customerName}</h1>
          <p className="text-gray-600 mt-1">Account: {caseData.accountNumber}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            SMS
          </button>
        </div>
      </div>

      {/* Case Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          <div>
            <p className="text-sm text-gray-600">Outstanding Balance</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(caseData.outstandingBalance)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Original Amount</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(caseData.originalAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Days in Arrears</p>
            <p className="text-lg font-bold text-amber-600">{caseData.totalDaysInArrears}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Payment</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(caseData.lastPaymentAmount)}</p>
            <p className="text-xs text-gray-500">{new Date(caseData.lastPaymentDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Priority</p>
            <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getPriorityColor(caseData.priority)}`}>
              Priority {caseData.priority}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delinquency State</p>
            <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getDelinquencyColor(caseData.delinquencyState)}`}>
              {caseData.delinquencyState}
            </span>
          </div>
        </div>

        {/* Next Action */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Recommended Next Action:</span>
            <span className="text-blue-800">{caseData.nextAction}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'timeline', label: 'Timeline', count: caseData.activities.length },
              { id: 'notes', label: 'Notes', count: caseData.notes.length },
              { id: 'documents', label: 'Documents', count: caseData.documents.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'timeline' && <CaseTimeline caseId={caseData.id} />}
          {activeTab === 'notes' && <CaseNotes caseId={caseData.id} />}
          {activeTab === 'documents' && <CaseDocuments caseId={caseData.id} />}
        </div>
      </div>
    </div>
  );
}