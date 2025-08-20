import React, { useState } from 'react';
import { Play, Edit, Trash2, Copy, Download, Calendar } from 'lucide-react';

interface SavedReport {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  lastRun: string;
  category: 'performance' | 'collection' | 'compliance' | 'custom';
  fields: string[];
  chartType: string;
}

const mockSavedReports: SavedReport[] = [
  {
    id: '1',
    name: 'Weekly Collector Performance',
    description: 'Performance metrics by collector for weekly review',
    createdBy: 'Sarah Manager',
    createdAt: '2024-01-15',
    lastRun: '2024-02-12',
    category: 'performance',
    fields: ['collector_name', 'total_collected', 'contact_rate', 'ptp_rate'],
    chartType: 'table'
  },
  {
    id: '2',
    name: 'Collections by Delinquency Band',
    description: 'Analysis of collection performance across delinquency bands',
    createdBy: 'Mike Johnson',
    createdAt: '2024-01-20',
    lastRun: '2024-02-14',
    category: 'collection',
    fields: ['delinquency_band', 'total_collected', 'account_count', 'avg_balance'],
    chartType: 'bar'
  },
  {
    id: '3',
    name: 'Monthly Compliance Summary',
    description: 'Comprehensive compliance metrics for monthly reporting',
    createdBy: 'David Wilson',
    createdAt: '2024-02-01',
    lastRun: '2024-02-15',
    category: 'compliance',
    fields: ['compliance_score', 'violations', 'call_time_compliance', 'documentation_score'],
    chartType: 'pie'
  },
  {
    id: '4',
    name: 'High-Value Account Analysis',
    description: 'Focus on accounts with balances over $10,000',
    createdBy: 'Lisa Chen',
    createdAt: '2024-02-05',
    lastRun: '2024-02-13',
    category: 'custom',
    fields: ['customer_name', 'current_balance', 'days_past_due', 'last_contact'],
    chartType: 'table'
  }
];

export function CustomReport() {
  const [reports, setReports] = useState<SavedReport[]>(mockSavedReports);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-blue-600 bg-blue-100';
      case 'collection': return 'text-green-600 bg-green-100';
      case 'compliance': return 'text-red-600 bg-red-100';
      case 'custom': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChartTypeIcon = (chartType: string) => {
    switch (chartType) {
      case 'bar': return '📊';
      case 'pie': return '🥧';
      case 'line': return '📈';
      default: return '📋';
    }
  };

  const handleRunReport = (reportId: string) => {
    console.log(`Running report: ${reportId}`);
    // Update last run date
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, lastRun: new Date().toISOString().split('T')[0] }
        : report
    ));
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(prev => prev.filter(report => report.id !== reportId));
    }
  };

  const handleDuplicateReport = (reportId: string) => {
    const reportToDuplicate = reports.find(r => r.id === reportId);
    if (reportToDuplicate) {
      const newReport: SavedReport = {
        ...reportToDuplicate,
        id: Date.now().toString(),
        name: `${reportToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString().split('T')[0],
        lastRun: 'Never'
      };
      setReports(prev => [newReport, ...prev]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Reports</h2>
          <p className="text-gray-600 mt-1">Manage and run your custom reports</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create New Report
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        <div className="flex space-x-2">
          {['all', 'performance', 'collection', 'compliance', 'custom'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance Reports</p>
              <p className="text-2xl font-bold text-blue-600">
                {reports.filter(r => r.category === 'performance').length}
              </p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Reports</p>
              <p className="text-2xl font-bold text-green-600">
                {reports.filter(r => r.category === 'collection').length}
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custom Reports</p>
              <p className="text-2xl font-bold text-purple-600">
                {reports.filter(r => r.category === 'custom').length}
              </p>
            </div>
            <div className="text-2xl">🔧</div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Reports' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Reports`}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{report.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                    <span className="text-lg">{getChartTypeIcon(report.chartType)}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{report.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>By: {report.createdBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Last run: {report.lastRun === 'Never' ? 'Never' : new Date(report.lastRun).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{report.fields.length} fields</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleRunReport(report.id)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Run
                  </button>
                  
                  <button className="text-gray-600 hover:text-gray-900 p-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDuplicateReport(report.id)}
                    className="text-gray-600 hover:text-gray-900 p-2"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  <button className="text-gray-600 hover:text-gray-900 p-2">
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="text-red-600 hover:text-red-900 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredReports.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? 'Create your first custom report to get started'
                : `No ${selectedCategory} reports found. Try a different category or create a new report.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}