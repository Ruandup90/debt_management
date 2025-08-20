import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Filter, FileText, PieChart, Activity } from 'lucide-react';
import { ReportBuilder } from './reports/ReportBuilder';
import { PerformanceReport } from './reports/PerformanceReport';
import { CollectionReport } from './reports/CollectionReport';
import { ComplianceReport } from './reports/ComplianceReport';
import { CustomReport } from './reports/CustomReport';

type ReportType = 'performance' | 'collection' | 'compliance' | 'custom' | 'builder';

export function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('performance');
  const [dateRange, setDateRange] = useState('7d');

  const exportReport = () => {
    // Generate CSV data based on active report
    let csvData = '';
    let filename = '';
    
    switch (activeReport) {
      case 'performance':
        csvData = generatePerformanceCSV();
        filename = 'performance_report.csv';
        break;
      case 'collection':
        csvData = generateCollectionCSV();
        filename = 'collection_report.csv';
        break;
      case 'compliance':
        csvData = generateComplianceCSV();
        filename = 'compliance_report.csv';
        break;
      default:
        csvData = 'Report Type,Date,Value\nSample,2024-02-15,100';
        filename = 'report.csv';
    }
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportTypes = [
    { id: 'performance', label: 'Performance', icon: TrendingUp, description: 'Collection KPIs and metrics' },
    { id: 'collection', label: 'Collection', icon: BarChart3, description: 'Recovery and activity analysis' },
    { id: 'compliance', label: 'Compliance', icon: FileText, description: 'Regulatory and audit reports' },
    { id: 'custom', label: 'Custom', icon: PieChart, description: 'Saved custom reports' },
    { id: 'builder', label: 'Report Builder', icon: Activity, description: 'Create custom reports' }
  ];

  const renderReport = () => {
    switch (activeReport) {
      case 'performance':
        return <PerformanceReport dateRange={dateRange} />;
      case 'collection':
        return <CollectionReport dateRange={dateRange} />;
      case 'compliance':
        return <ComplianceReport dateRange={dateRange} />;
      case 'custom':
        return <CustomReport />;
      case 'builder':
        return <ReportBuilder />;
      default:
        return <PerformanceReport dateRange={dateRange} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive performance and compliance reporting</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            <span onClick={exportReport}>Export</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {reportTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveReport(type.id as ReportType)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                activeReport === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <type.icon className={`w-8 h-8 mb-3 ${
                activeReport === type.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <h3 className={`font-semibold mb-1 ${
                activeReport === type.id ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {type.label}
              </h3>
              <p className={`text-sm ${
                activeReport === type.id ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collections</p>
              <p className="text-2xl font-bold text-green-600">$2,847,920</p>
              <p className="text-xs text-green-600 mt-1">+12.3% vs last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
              <p className="text-2xl font-bold text-blue-600">68.4%</p>
              <p className="text-xs text-blue-600 mt-1">+2.1% vs last period</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Accounts</p>
              <p className="text-2xl font-bold text-purple-600">8,247</p>
              <p className="text-xs text-purple-600 mt-1">+156 new accounts</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-amber-600">94.2%</p>
              <p className="text-xs text-amber-600 mt-1">3 open issues</p>
            </div>
            <FileText className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {renderReport()}
      </div>
    </div>
  );
}

function generatePerformanceCSV() {
  const headers = 'Metric,Current Value,Previous Value,Change\n';
  const data = [
    'Recovery Rate,68.4%,63.2%,+5.2%',
    'Contact Rate,42.1%,44.2%,-2.1%',
    'PTP Rate,74.8%,71.7%,+3.1%',
    'Avg Collection Time,18.5 days,19.7 days,-1.2 days',
    'Total Collected,$2847920,$2534180,+$313740',
    'Cost per Dollar,$0.18,$0.20,-$0.02'
  ].join('\n');
  
  return headers + data;
}

function generateCollectionCSV() {
  const headers = 'Channel,Amount Collected,Percentage\n';
  const data = [
    'Phone,$1423960,50.0%',
    'Email,$569584,20.0%',
    'SMS,$427188,15.0%',
    'WhatsApp,$284792,10.0%',
    'Letter,$142396,5.0%'
  ].join('\n');
  
  return headers + data;
}

function generateComplianceCSV() {
  const headers = 'Compliance Area,Score,Violations,Status\n';
  const data = [
    'Call Time Compliance,96.8%,2,Good',
    'Contact Frequency,98.2%,1,Excellent',
    'Documentation,92.5%,0,Good',
    'Dispute Resolution,88.9%,0,Acceptable'
  ].join('\n');
  
  return headers + data;
}