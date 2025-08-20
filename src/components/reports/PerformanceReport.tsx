import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Phone, Target, Clock } from 'lucide-react';

interface PerformanceReportProps {
  dateRange: string;
}

export function PerformanceReport({ dateRange }: PerformanceReportProps) {
  // Mock performance data
  const performanceData = {
    recoveryRate: { current: 68.4, previous: 63.2, trend: 'up' },
    contactRate: { current: 42.1, previous: 44.2, trend: 'down' },
    ptpRate: { current: 74.8, previous: 71.7, trend: 'up' },
    avgCollectionTime: { current: 18.5, previous: 19.7, trend: 'up' },
    totalCollected: { current: 2847920, previous: 2534180, trend: 'up' },
    costPerDollar: { current: 0.18, previous: 0.20, trend: 'up' }
  };

  const collectorPerformance = [
    { name: 'Mike Johnson', collected: 485000, contacts: 156, ptps: 42, recovery: 72.3 },
    { name: 'Lisa Chen', collected: 398000, contacts: 134, ptps: 38, recovery: 68.9 },
    { name: 'David Wilson', collected: 367000, contacts: 128, ptps: 35, recovery: 65.4 },
    { name: 'Alex Rodriguez', collected: 342000, contacts: 119, ptps: 31, recovery: 63.8 },
    { name: 'Jennifer Lee', collected: 298000, contacts: 102, ptps: 28, recovery: 61.2 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.recoveryRate.trend)}
          </div>
          <h3 className="text-sm font-medium text-blue-700 mb-1">Recovery Rate</h3>
          <p className="text-3xl font-bold text-blue-900">{formatPercentage(performanceData.recoveryRate.current)}</p>
          <p className={`text-sm ${getTrendColor(performanceData.recoveryRate.trend)}`}>
            {performanceData.recoveryRate.trend === 'up' ? '+' : ''}{(performanceData.recoveryRate.current - performanceData.recoveryRate.previous).toFixed(1)}% vs previous period
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.totalCollected.trend)}
          </div>
          <h3 className="text-sm font-medium text-green-700 mb-1">Total Collected</h3>
          <p className="text-3xl font-bold text-green-900">{formatCurrency(performanceData.totalCollected.current)}</p>
          <p className={`text-sm ${getTrendColor(performanceData.totalCollected.trend)}`}>
            {formatCurrency(performanceData.totalCollected.current - performanceData.totalCollected.previous)} vs previous period
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.contactRate.trend)}
          </div>
          <h3 className="text-sm font-medium text-purple-700 mb-1">Contact Rate</h3>
          <p className="text-3xl font-bold text-purple-900">{formatPercentage(performanceData.contactRate.current)}</p>
          <p className={`text-sm ${getTrendColor(performanceData.contactRate.trend)}`}>
            {(performanceData.contactRate.current - performanceData.contactRate.previous).toFixed(1)}% vs previous period
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.ptpRate.trend)}
          </div>
          <h3 className="text-sm font-medium text-amber-700 mb-1">PTP Rate</h3>
          <p className="text-3xl font-bold text-amber-900">{formatPercentage(performanceData.ptpRate.current)}</p>
          <p className={`text-sm ${getTrendColor(performanceData.ptpRate.trend)}`}>
            {performanceData.ptpRate.trend === 'up' ? '+' : ''}{(performanceData.ptpRate.current - performanceData.ptpRate.previous).toFixed(1)}% vs previous period
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.avgCollectionTime.trend)}
          </div>
          <h3 className="text-sm font-medium text-indigo-700 mb-1">Avg Collection Time</h3>
          <p className="text-3xl font-bold text-indigo-900">{performanceData.avgCollectionTime.current} days</p>
          <p className={`text-sm ${getTrendColor(performanceData.avgCollectionTime.trend)}`}>
            {performanceData.avgCollectionTime.trend === 'up' ? '-' : '+'}{Math.abs(performanceData.avgCollectionTime.current - performanceData.avgCollectionTime.previous).toFixed(1)} days vs previous
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            {getTrendIcon(performanceData.costPerDollar.trend)}
          </div>
          <h3 className="text-sm font-medium text-red-700 mb-1">Cost per Dollar</h3>
          <p className="text-3xl font-bold text-red-900">${performanceData.costPerDollar.current.toFixed(2)}</p>
          <p className={`text-sm ${getTrendColor(performanceData.costPerDollar.trend)}`}>
            {performanceData.costPerDollar.trend === 'up' ? '-' : '+'}${Math.abs(performanceData.costPerDollar.current - performanceData.costPerDollar.previous).toFixed(2)} vs previous
          </p>
        </div>
      </div>

      {/* Collector Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Collector Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Collected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacts Made
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PTPs Obtained
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recovery Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collectorPerformance.map((collector, index) => (
                <tr key={collector.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-white">
                          {collector.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900">{collector.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{formatCurrency(collector.collected)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{collector.contacts}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{collector.ptps}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{formatPercentage(collector.recovery)}</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(collector.recovery, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}