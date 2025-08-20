import React from 'react';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

interface CollectionReportProps {
  dateRange: string;
}

export function CollectionReport({ dateRange }: CollectionReportProps) {
  // Mock collection data
  const collectionData = {
    totalCollected: 2847920,
    accountsResolved: 1247,
    averageResolution: 18.5,
    collectionsByChannel: [
      { channel: 'Phone', amount: 1423960, percentage: 50.0 },
      { channel: 'Email', amount: 569584, percentage: 20.0 },
      { channel: 'SMS', amount: 427188, percentage: 15.0 },
      { channel: 'WhatsApp', amount: 284792, percentage: 10.0 },
      { channel: 'Letter', amount: 142396, percentage: 5.0 }
    ],
    collectionsByBand: [
      { band: 'A (Current)', amount: 142396, accounts: 89, avgAmount: 1600 },
      { band: 'B (1-2 days)', amount: 284792, accounts: 156, avgAmount: 1825 },
      { band: 'C (3-7 days)', amount: 569584, accounts: 234, avgAmount: 2435 },
      { band: 'D (8-30 days)', amount: 854376, accounts: 312, avgAmount: 2738 },
      { band: 'E (31-60 days)', amount: 569584, accounts: 198, avgAmount: 2877 },
      { band: 'F (60+ days)', amount: 427188, accounts: 145, avgAmount: 2946 }
    ],
    dailyCollections: [
      { date: '2024-02-09', amount: 385000 },
      { date: '2024-02-10', amount: 420000 },
      { date: '2024-02-11', amount: 395000 },
      { date: '2024-02-12', amount: 445000 },
      { date: '2024-02-13', amount: 410000 },
      { date: '2024-02-14', amount: 465000 },
      { date: '2024-02-15', amount: 425000 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getChannelColor = (channel: string) => {
    const colors = {
      'Phone': 'bg-blue-500',
      'Email': 'bg-green-500',
      'SMS': 'bg-purple-500',
      'WhatsApp': 'bg-emerald-500',
      'Letter': 'bg-amber-500'
    };
    return colors[channel as keyof typeof colors] || 'bg-gray-500';
  };

  const getBandColor = (band: string) => {
    if (band.includes('A')) return 'bg-green-500';
    if (band.includes('B')) return 'bg-blue-500';
    if (band.includes('C')) return 'bg-yellow-500';
    if (band.includes('D')) return 'bg-orange-500';
    if (band.includes('E')) return 'bg-red-500';
    if (band.includes('F')) return 'bg-purple-500';
    return 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(collectionData.totalCollected)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accounts Resolved</p>
              <p className="text-2xl font-bold text-blue-600">{collectionData.accountsResolved.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-purple-600">{collectionData.averageResolution} days</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Average</p>
              <p className="text-2xl font-bold text-amber-600">
                {formatCurrency(collectionData.totalCollected / 7)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collections by Channel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collections by Channel</h3>
          <div className="space-y-4">
            {collectionData.collectionsByChannel.map((item) => (
              <div key={item.channel} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${getChannelColor(item.channel)}`}></div>
                  <span className="font-medium text-gray-900">{item.channel}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                  <p className="text-sm text-gray-600">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Channel Chart */}
          <div className="mt-6">
            <div className="flex rounded-lg overflow-hidden h-4">
              {collectionData.collectionsByChannel.map((item) => (
                <div
                  key={item.channel}
                  className={getChannelColor(item.channel)}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.channel}: ${item.percentage}%`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Collections Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Collections Trend</h3>
          <div className="space-y-3">
            {collectionData.dailyCollections.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(day.amount / 500000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-gray-900 w-20 text-right">
                    {formatCurrency(day.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections by Delinquency Band */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Collections by Delinquency Band</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delinquency Band
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Collected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accounts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg per Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collectionData.collectionsByBand.map((band) => (
                <tr key={band.band} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getBandColor(band.band)}`}></div>
                      <span className="font-medium text-gray-900">{band.band}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-gray-900">{formatCurrency(band.amount)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{band.accounts}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{formatCurrency(band.avgAmount)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-gray-900 mr-2">
                        {((band.amount / collectionData.totalCollected) * 100).toFixed(1)}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBandColor(band.band)}`}
                          style={{ width: `${(band.amount / collectionData.totalCollected) * 100}%` }}
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