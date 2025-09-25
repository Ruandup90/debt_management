import React, { useState } from 'react';
import { Search, Filter, Phone, Mail, MessageSquare } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { CollectionCase } from '../types/data';

interface CollectionQueueProps {
  onSelectCase: (caseId: string) => void;
}

export function CollectionQueue({ onSelectCase }: CollectionQueueProps) {
  const { collectionCases, addActivity } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter and sort cases
  const filteredCases = collectionCases
    .filter(c => {
      const matchesSearch = 
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || c.priority.toString() === priorityFilter;
      
      return matchesSearch && matchesPriority && c.status === 'active';
    })
    .sort((a, b) => a.priority - b.priority); // Sort by priority (1 = highest)

  const handleQuickAction = (caseItem: CollectionCase, actionType: 'call' | 'email' | 'sms') => {
    const actionDescriptions = {
      call: 'Made phone call to customer',
      email: 'Sent email to customer',
      sms: 'Sent SMS to customer'
    };

    addActivity(caseItem.id, {
      type: actionType,
      description: actionDescriptions[actionType],
      date: new Date().toISOString(),
      createdBy: 'Current User'
    });
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collection Queue</h1>
          <p className="text-gray-600 mt-2">
            {filteredCases.length} cases • Sorted by priority (highest first)
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name or account number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="1">Priority 1 (Highest)</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
              <option value="5">Priority 5 (Lowest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Collection Cases</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredCases.map(caseItem => (
            <div key={caseItem.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => onSelectCase(caseItem.id)}
                    >
                      {caseItem.customerName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                        Priority {caseItem.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDelinquencyColor(caseItem.delinquencyState)}`}>
                        {caseItem.delinquencyState}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="font-medium text-gray-900">{caseItem.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Outstanding Balance</p>
                      <p className="font-bold text-lg text-red-600">{formatCurrency(caseItem.outstandingBalance)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Days in Arrears</p>
                      <p className="font-medium text-gray-900">{caseItem.totalDaysInArrears} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Payment</p>
                      <p className="font-medium text-gray-900">{formatCurrency(caseItem.lastPaymentAmount)}</p>
                      <p className="text-xs text-gray-500">{new Date(caseItem.lastPaymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Last actioned: {new Date(caseItem.lastActionedDate).toLocaleDateString()}</span>
                      <span>Duration: {caseItem.durationInCollections} days</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Next Action */}
                      <div className="flex items-center space-x-1 text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        <span className="font-medium">Next: {caseItem.nextAction}</span>
                      </div>
                      
                      {/* Quick Actions */}
                      <button
                        onClick={() => handleQuickAction(caseItem, 'call')}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Make Call"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleQuickAction(caseItem, 'email')}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleQuickAction(caseItem, 'sms')}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Send SMS"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCases.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Found</h3>
            <p className="text-gray-600">
              {searchQuery || priorityFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'All collection cases have been resolved'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}