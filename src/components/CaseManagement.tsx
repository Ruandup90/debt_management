import React, { useState } from 'react';
import { Search, Filter, FileText, Calendar, Phone, Mail, MessageSquare, DollarSign, User, Clock, AlertTriangle } from 'lucide-react';
import { CaseDetails } from './case/CaseDetails';
import { CaseTimeline } from './case/CaseTimeline';
import { CaseNotes } from './case/CaseNotes';
import { CaseDocuments } from './case/CaseDocuments';
import { Account } from '../types/account';
import { mockAccounts } from '../data/mockAccounts';

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<Account | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'notes' | 'documents'>('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const accounts = mockAccounts;
  
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.accountNumber.includes(searchQuery) ||
      account.customerId.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'disputed': return 'text-red-600 bg-red-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex h-full">
      {/* Case List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Management</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="disputed">Disputed</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Case List */}
        <div className="overflow-y-auto h-full">
          {filteredAccounts.map(account => (
            <div
              key={account.id}
              onClick={() => setSelectedCase(account)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedCase?.id === account.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 truncate">{account.customerName}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(account.status)}`}>
                  {account.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Account: {account.accountNumber}</p>
              <p className="text-sm text-gray-900 font-medium">${account.currentBalance.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {account.daysPastDue} days past due • Last contact: {new Date(account.lastContactDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Details */}
      <div className="flex-1 flex flex-col">
        {selectedCase ? (
          <>
            {/* Case Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedCase.customerName}</h1>
                  <p className="text-gray-600">Account: {selectedCase.accountNumber} • Customer ID: {selectedCase.customerId}</p>
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

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-xl font-bold text-gray-900">${selectedCase.currentBalance.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Days Past Due</p>
                  <p className="text-xl font-bold text-red-600">{selectedCase.daysPastDue}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Last Payment</p>
                  <p className="text-xl font-bold text-green-600">${selectedCase.lastPaymentAmount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="text-xl font-bold text-amber-600">{selectedCase.priority}/10</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'details', label: 'Details', icon: User },
                  { id: 'timeline', label: 'Timeline', icon: Clock },
                  { id: 'notes', label: 'Notes', icon: FileText },
                  { id: 'documents', label: 'Documents', icon: FileText }
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
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {activeTab === 'details' && <CaseDetails account={selectedCase} />}
              {activeTab === 'timeline' && <CaseTimeline account={selectedCase} />}
              {activeTab === 'notes' && <CaseNotes account={selectedCase} />}
              {activeTab === 'documents' && <CaseDocuments account={selectedCase} />}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Case</h3>
              <p className="text-gray-600">Choose a case from the list to view details and manage activities</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}