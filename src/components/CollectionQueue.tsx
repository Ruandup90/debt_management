import React, { useState } from 'react';
import { Search, Filter, Phone, Mail, MessageSquare, Calendar, User, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { QueueFilters } from './queue/QueueFilters';
import { AccountCard } from './queue/AccountCard';
import { BulkActions } from './queue/BulkActions';
import { Account } from '../types/account';
import { mockAccounts } from '../data/mockAccounts';

export function CollectionQueue() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('priority');
  const [filterBy, setFilterBy] = useState<string>('all');

  // Show accounts with strategy-applied actions first
  const filteredAccounts = accounts
    .filter(account => {
      const matchesSearch = 
        account.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountNumber.includes(searchQuery) ||
        account.customerId.includes(searchQuery);
      
      const matchesFilter = filterBy === 'all' || account.delinquencyBand === filterBy;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          // Prioritize accounts with next actions
          if (a.nextAction && !b.nextAction) return -1;
          if (!a.nextAction && b.nextAction) return 1;
          return b.priority - a.priority;
        case 'balance':
          return b.currentBalance - a.currentBalance;
        case 'daysPastDue':
          return b.daysPastDue - a.daysPastDue;
        case 'lastContact':
          return new Date(b.lastContactDate).getTime() - new Date(a.lastContactDate).getTime();
        default:
          return 0;
      }
    });

  const handleAccountSelect = (accountId: string, selected: boolean) => {
    if (selected) {
      setSelectedAccounts(prev => [...prev, accountId]);
    } else {
      setSelectedAccounts(prev => prev.filter(id => id !== accountId));
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(filteredAccounts.map(account => account.id));
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600 bg-red-100';
    if (priority >= 5) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return 'High';
    if (priority >= 5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collection Queue</h1>
          <p className="text-gray-600 mt-2">
            {filteredAccounts.length} accounts • {selectedAccounts.length} selected
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Campaign
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, account number, or customer ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="priority">Sort by Priority</option>
              <option value="balance">Sort by Balance</option>
              <option value="daysPastDue">Sort by Days Past Due</option>
              <option value="lastContact">Sort by Last Contact</option>
            </select>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Accounts</option>
              <option value="A">Current</option>
              <option value="B">1-2 Days</option>
              <option value="C">3-7 Days</option>
              <option value="D">8-30 Days</option>
              <option value="E">31-60 Days</option>
              <option value="F">60+ Days</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <QueueFilters />
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedAccounts.length > 0 && (
        <BulkActions
          selectedCount={selectedAccounts.length}
          onClearSelection={() => setSelectedAccounts([])}
        />
      )}

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Strategy Actions</p>
              <p className="text-2xl font-bold text-red-600">
                {filteredAccounts.filter(a => a.nextAction && a.nextAction !== 'No strategy defined').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredAccounts.reduce((sum, a) => sum + a.currentBalance, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Days Past Due</p>
              <p className="text-2xl font-bold text-amber-600">
                {Math.round(filteredAccounts.reduce((sum, a) => sum + a.daysPastDue, 0) / filteredAccounts.length)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Action</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredAccounts.filter(a => a.nextAction && !a.nextAction.includes('Wait')).length}
              </p>
            </div>
            <Phone className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Account List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Collection Queue 
              <span className="text-sm font-normal text-gray-600 ml-2">
                (Strategy-driven prioritization)
              </span>
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">Select All</label>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAccounts.map(account => (
            <AccountCard
              key={account.id}
              account={account}
              isSelected={selectedAccounts.includes(account.id)}
              onSelect={(selected) => handleAccountSelect(account.id, selected)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}