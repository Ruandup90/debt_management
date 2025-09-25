import React from 'react';
import { Users, DollarSign, Clock, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function Dashboard() {
  const { collectionCases } = useData();

  // Calculate summary statistics
  const totalCases = collectionCases.length;
  const activeCases = collectionCases.filter(c => c.status === 'active').length;
  const totalOutstanding = collectionCases.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const avgDaysInArrears = Math.round(collectionCases.reduce((sum, c) => sum + c.totalDaysInArrears, 0) / totalCases);

  // Breakdown by delinquency state
  const delinquencyBreakdown = collectionCases.reduce((acc, c) => {
    acc[c.delinquencyState] = (acc[c.delinquencyState] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Breakdown by priority
  const priorityBreakdown = collectionCases.reduce((acc, c) => {
    const priority = `Priority ${c.priority}`;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Cases by last actioned date
  const now = new Date();
  const lastActionedBreakdown = collectionCases.reduce((acc, c) => {
    const lastActioned = new Date(c.lastActionedDate);
    const daysDiff = Math.floor((now.getTime() - lastActioned.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) acc['Today'] = (acc['Today'] || 0) + 1;
    else if (daysDiff <= 7) acc['This Week'] = (acc['This Week'] || 0) + 1;
    else if (daysDiff <= 30) acc['This Month'] = (acc['This Month'] || 0) + 1;
    else acc['Over 30 Days'] = (acc['Over 30 Days'] || 0) + 1;
    
    return acc;
  }, {} as Record<string, number>);

  // Duration in collections breakdown
  const durationBreakdown = collectionCases.reduce((acc, c) => {
    if (c.durationInCollections <= 30) acc['0-30 Days'] = (acc['0-30 Days'] || 0) + 1;
    else if (c.durationInCollections <= 60) acc['31-60 Days'] = (acc['31-60 Days'] || 0) + 1;
    else if (c.durationInCollections <= 90) acc['61-90 Days'] = (acc['61-90 Days'] || 0) + 1;
    else acc['90+ Days'] = (acc['90+ Days'] || 0) + 1;
    
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Collection Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of collection cases and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">{totalCases}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-green-600">{activeCases}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Days in Arrears</p>
              <p className="text-2xl font-bold text-amber-600">{avgDaysInArrears}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delinquency State Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cases by Delinquency State</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(delinquencyBreakdown).map(([state, count]) => (
                <div key={state} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      state === 'current' ? 'bg-green-500' :
                      state === 'early' ? 'bg-blue-500' :
                      state === 'moderate' ? 'bg-yellow-500' :
                      state === 'severe' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-gray-900 capitalize">{state}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({((count / totalCases) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cases by Priority</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(priorityBreakdown).sort().map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-4 h-4 ${
                      priority === 'Priority 1' ? 'text-red-500' :
                      priority === 'Priority 2' ? 'text-orange-500' :
                      priority === 'Priority 3' ? 'text-yellow-500' :
                      'text-gray-500'
                    }`} />
                    <span className="font-medium text-gray-900">{priority}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({((count / totalCases) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Actioned Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cases by Last Action Date</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(lastActionedBreakdown).map(([period, count]) => (
                <div key={period} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-900">{period}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({((count / totalCases) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Duration in Collections Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cases by Duration in Collections</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(durationBreakdown).map(([duration, count]) => (
                <div key={duration} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-900">{duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({((count / totalCases) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}