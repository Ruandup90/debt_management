import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface FieldMappingProps {
  file: any;
  onClose: () => void;
  onSave: () => void;
}

interface FieldMapping {
  sourceField: string;
  targetField: string;
  required: boolean;
  dataType: string;
  sample: string;
}

const requiredFields = [
  { field: 'customer_id', label: 'Customer ID', type: 'string', required: true },
  { field: 'customer_name', label: 'Customer Name', type: 'string', required: true },
  { field: 'account_number', label: 'Account Number', type: 'string', required: true },
  { field: 'current_balance', label: 'Current Balance', type: 'number', required: true },
  { field: 'days_past_due', label: 'Days Past Due', type: 'number', required: true },
  { field: 'phone', label: 'Phone Number', type: 'string', required: false },
  { field: 'email', label: 'Email Address', type: 'string', required: false },
  { field: 'address', label: 'Address', type: 'string', required: false },
  { field: 'debt_category', label: 'Debt Category', type: 'string', required: false },
  { field: 'placement_date', label: 'Placement Date', type: 'date', required: false }
];

const sampleSourceFields = [
  'CUST_ID', 'CUSTOMER_NAME', 'ACCT_NUM', 'BALANCE', 'DAYS_OVERDUE', 
  'PHONE_NUMBER', 'EMAIL_ADDR', 'MAILING_ADDRESS', 'DEBT_TYPE', 'PLACE_DATE'
];

export function FieldMapping({ file, onClose, onSave }: FieldMappingProps) {
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleMappingChange = (targetField: string, sourceField: string) => {
    setMappings(prev => ({
      ...prev,
      [targetField]: sourceField
    }));
  };

  const validateMappings = () => {
    const newErrors: string[] = [];
    
    requiredFields.forEach(field => {
      if (field.required && !mappings[field.field]) {
        newErrors.push(`${field.label} is required but not mapped`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (validateMappings()) {
      onSave();
    }
  };

  const getMappingStatus = (field: any) => {
    if (field.required && !mappings[field.field]) {
      return 'error';
    }
    if (mappings[field.field]) {
      return 'mapped';
    }
    return 'unmapped';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mapped':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Field Mapping</h2>
              <p className="text-sm text-gray-600 mt-1">Map source fields to target fields for {file.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Mapping Errors</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mapping Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
              <div className="col-span-4">Target Field</div>
              <div className="col-span-1"></div>
              <div className="col-span-4">Source Field</div>
              <div className="col-span-2">Data Type</div>
              <div className="col-span-1">Status</div>
            </div>

            {requiredFields.map((field) => {
              const status = getMappingStatus(field);
              return (
                <div key={field.field} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
                  <div className="col-span-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${field.required ? 'text-gray-900' : 'text-gray-600'}`}>
                        {field.label}
                      </span>
                      {field.required && (
                        <span className="text-red-500 text-xs">*</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{field.field}</div>
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="col-span-4">
                    <select
                      value={mappings[field.field] || ''}
                      onChange={(e) => handleMappingChange(field.field, e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        status === 'error' ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select source field...</option>
                      {sampleSourceFields.map((sourceField) => (
                        <option key={sourceField} value={sourceField}>
                          {sourceField}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">{field.type}</span>
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    {getStatusIcon(status)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Mapping Preview</h4>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Mapped Fields:</strong> {Object.keys(mappings).length} of {requiredFields.length}
              </p>
              <p>
                <strong>Required Fields Mapped:</strong> {
                  requiredFields.filter(f => f.required && mappings[f.field]).length
                } of {requiredFields.filter(f => f.required).length}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Mapping
          </button>
        </div>
      </div>
    </div>
  );
}