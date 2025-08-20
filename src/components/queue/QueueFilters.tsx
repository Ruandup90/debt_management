import React, { useState } from 'react';
import { Calendar, DollarSign, Phone, User } from 'lucide-react';

export function QueueFilters() {
  const [filters, setFilters] = useState({
    balanceMin: '',
    balanceMax: '',
    daysPastDueMin: '',
    daysPastDueMax: '',
    lastContactDays: '',
    assignedCollector: '',
    debtCategory: '',
    hasPhone: false,
    hasEmail: false,
    hasPTP: false
  });

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      balanceMin: '',
      balanceMax: '',
      daysPastDueMin: '',
      daysPastDueMax: '',
      lastContactDays: '',
      assignedCollector: '',
      debtCategory: '',
      hasPhone: false,
      hasEmail: false,
      hasPTP: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Advanced Filters</h4>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Range */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Balance Range</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.balanceMin}
              onChange={(e) => handleFilterChange('balanceMin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.balanceMax}
              onChange={(e) => handleFilterChange('balanceMax', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Days Past Due Range */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Days Past Due</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.daysPastDueMin}
              onChange={(e) => handleFilterChange('daysPastDueMin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.daysPastDueMax}
              onChange={(e) => handleFilterChange('daysPastDueMax', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Last Contact */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Last Contact</label>
          </div>
          <select
            value={filters.lastContactDays}
            onChange={(e) => handleFilterChange('lastContactDays', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Any time</option>
            <option value="1">Within 1 day</option>
            <option value="3">Within 3 days</option>
            <option value="7">Within 7 days</option>
            <option value="14">Within 14 days</option>
            <option value="30">Within 30 days</option>
          </select>
        </div>

        {/* Assigned Collector */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Assigned Collector</label>
          </div>
          <select
            value={filters.assignedCollector}
            onChange={(e) => handleFilterChange('assignedCollector', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Collectors</option>
            <option value="Mike Johnson">Mike Johnson</option>
            <option value="Lisa Chen">Lisa Chen</option>
            <option value="David Wilson">David Wilson</option>
            <option value="Alex Rodriguez">Alex Rodriguez</option>
            <option value="Jennifer Lee">Jennifer Lee</option>
          </select>
        </div>

        {/* Debt Category */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Debt Category</label>
          <select
            value={filters.debtCategory}
            onChange={(e) => handleFilterChange('debtCategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Categories</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Utility Bill">Utility Bill</option>
            <option value="Medical Bill">Medical Bill</option>
            <option value="Auto Loan">Auto Loan</option>
            <option value="Mortgage">Mortgage</option>
          </select>
        </div>
      </div>

      {/* Contact Information Filters */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Contact Information</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.hasPhone}
              onChange={(e) => handleFilterChange('hasPhone', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Has Phone Number</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.hasEmail}
              onChange={(e) => handleFilterChange('hasEmail', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Has Email Address</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.hasPTP}
              onChange={(e) => handleFilterChange('hasPTP', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Has Active PTP</span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}