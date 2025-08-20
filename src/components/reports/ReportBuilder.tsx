import React, { useState } from 'react';
import { Plus, Save, Play, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ReportField {
  id: string;
  name: string;
  type: 'dimension' | 'measure';
  category: string;
}

const availableFields: ReportField[] = [
  { id: 'customer_name', name: 'Customer Name', type: 'dimension', category: 'Customer' },
  { id: 'account_number', name: 'Account Number', type: 'dimension', category: 'Account' },
  { id: 'current_balance', name: 'Current Balance', type: 'measure', category: 'Financial' },
  { id: 'days_past_due', name: 'Days Past Due', type: 'measure', category: 'Collection' },
  { id: 'delinquency_band', name: 'Delinquency Band', type: 'dimension', category: 'Collection' },
  { id: 'debt_category', name: 'Debt Category', type: 'dimension', category: 'Account' },
  { id: 'assigned_collector', name: 'Assigned Collector', type: 'dimension', category: 'Collection' },
  { id: 'last_payment_amount', name: 'Last Payment Amount', type: 'measure', category: 'Financial' },
  { id: 'contact_attempts', name: 'Contact Attempts', type: 'measure', category: 'Collection' },
  { id: 'placement_date', name: 'Placement Date', type: 'dimension', category: 'Account' }
];

export function ReportBuilder() {
  const [reportName, setReportName] = useState('');
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([]);
  const [chartType, setChartType] = useState<'table' | 'bar' | 'pie' | 'line'>('table');
  const [filters, setFilters] = useState<any[]>([]);

  const addField = (field: ReportField) => {
    if (!selectedFields.find(f => f.id === field.id)) {
      setSelectedFields(prev => [...prev, field]);
    }
  };

  const removeField = (fieldId: string) => {
    setSelectedFields(prev => prev.filter(f => f.id !== fieldId));
  };

  const addFilter = () => {
    setFilters(prev => [...prev, { field: '', operator: 'equals', value: '' }]);
  };

  const updateFilter = (index: number, updates: any) => {
    setFilters(prev => prev.map((filter, i) => i === index ? { ...filter, ...updates } : filter));
  };

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar': return <BarChart3 className="w-5 h-5" />;
      case 'pie': return <PieChart className="w-5 h-5" />;
      case 'line': return <TrendingUp className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Report Builder</h2>
            <p className="text-gray-600 mt-1">Create custom reports and analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Report Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter report name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: 'table', label: 'Table' },
                      { type: 'bar', label: 'Bar Chart' },
                      { type: 'pie', label: 'Pie Chart' },
                      { type: 'line', label: 'Line Chart' }
                    ].map(chart => (
                      <button
                        key={chart.type}
                        onClick={() => setChartType(chart.type as any)}
                        className={`p-3 rounded-lg border-2 transition-colors flex flex-col items-center ${
                          chartType === chart.type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {getChartIcon(chart.type)}
                        <span className="text-xs mt-1">{chart.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Available Fields */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Fields</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(
                  availableFields.reduce((acc, field) => {
                    if (!acc[field.category]) acc[field.category] = [];
                    acc[field.category].push(field);
                    return acc;
                  }, {} as Record<string, ReportField[]>)
                ).map(([category, fields]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-1">
                      {fields.map(field => (
                        <button
                          key={field.id}
                          onClick={() => addField(field)}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                        >
                          <span>{field.name}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            field.type === 'measure' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {field.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Design Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Fields */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Fields</h3>
              {selectedFields.length > 0 ? (
                <div className="space-y-2">
                  {selectedFields.map(field => (
                    <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{field.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          field.type === 'measure' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {field.type}
                        </span>
                      </div>
                      <button
                        onClick={() => removeField(field.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No fields selected. Choose fields from the left panel to build your report.</p>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={addFilter}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Filter
                </button>
              </div>

              {filters.length > 0 ? (
                <div className="space-y-3">
                  {filters.map((filter, index) => (
                    <div key={index} className="grid grid-cols-4 gap-3 items-center">
                      <select
                        value={filter.field}
                        onChange={(e) => updateFilter(index, { field: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select field...</option>
                        {availableFields.map(field => (
                          <option key={field.id} value={field.id}>{field.name}</option>
                        ))}
                      </select>
                      
                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(index, { operator: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                        <option value="contains">Contains</option>
                      </select>
                      
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => updateFilter(index, { value: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Value"
                      />
                      
                      <button
                        onClick={() => removeFilter(index)}
                        className="text-red-600 hover:text-red-900 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No filters applied. Add filters to refine your report data.</p>
                </div>
              )}
            </div>

            {/* Preview Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  {getChartIcon(chartType)}
                </div>
                <p className="text-gray-500">
                  {selectedFields.length > 0 
                    ? `Preview will show ${chartType} with ${selectedFields.length} field(s)`
                    : 'Select fields to see report preview'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}