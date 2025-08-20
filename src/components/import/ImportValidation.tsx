import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'warning' | 'failed' | 'info';
  details?: string;
}

const validationRules: ValidationRule[] = [
  {
    id: '1',
    name: 'Required Fields',
    description: 'All mandatory fields are present',
    status: 'passed',
    details: 'Customer ID, Account Number, Current Balance validated'
  },
  {
    id: '2',
    name: 'Data Format',
    description: 'Phone numbers and email addresses are properly formatted',
    status: 'warning',
    details: '12 phone numbers need formatting correction'
  },
  {
    id: '3',
    name: 'Duplicate Detection',
    description: 'Check for duplicate account numbers',
    status: 'passed',
    details: 'No duplicates found in current import'
  },
  {
    id: '4',
    name: 'Date Validation',
    description: 'All date fields are valid and within expected ranges',
    status: 'failed',
    details: '3 records have invalid placement dates'
  },
  {
    id: '5',
    name: 'Balance Validation',
    description: 'Current balance is positive and reasonable',
    status: 'passed',
    details: 'All balance amounts are within expected range'
  },
  {
    id: '6',
    name: 'Reference Data',
    description: 'Debt categories and status codes are valid',
    status: 'info',
    details: '2 new debt categories detected, review recommended'
  }
];

export function ImportValidation() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const passedCount = validationRules.filter(rule => rule.status === 'passed').length;
  const warningCount = validationRules.filter(rule => rule.status === 'warning').length;
  const failedCount = validationRules.filter(rule => rule.status === 'failed').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Data Validation Rules</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600">{passedCount} Passed</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-600">{warningCount} Warnings</span>
            </div>
            <div className="flex items-center space-x-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-600">{failedCount} Failed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {validationRules.map((rule) => (
            <div key={rule.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
              <div className="flex-shrink-0">
                {getStatusIcon(rule.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                    {rule.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                {rule.details && (
                  <p className="text-xs text-gray-500 mt-2">{rule.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Validation Summary</h4>
          <p className="text-sm text-gray-600">
            {failedCount > 0 
              ? `${failedCount} critical issues must be resolved before import can proceed.`
              : warningCount > 0
              ? `Import can proceed with ${warningCount} warnings. Review recommended.`
              : 'All validation rules passed. Import ready to proceed.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}