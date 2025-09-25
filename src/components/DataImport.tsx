import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ImportData } from '../types/data';

export function DataImport() {
  const [dragActive, setDragActive] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importResults, setImportResults] = useState<{ updated: number; errors: string[] }>({ updated: 0, errors: [] });
  const { importData } = useData();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, []);

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setImportStatus('error');
      setImportResults({ updated: 0, errors: ['Only CSV files are supported'] });
      return;
    }

    setImportStatus('processing');
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const data: ImportData[] = [];
      const errors: string[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        
        // Map CSV columns to our data structure
        const importRecord: ImportData = {
          accountNumber: row['account_number'] || row['accountnumber'] || '',
        };
        
        if (row['outstanding_balance'] || row['outstandingbalance']) {
          importRecord.outstandingBalance = parseFloat(row['outstanding_balance'] || row['outstandingbalance']);
        }
        
        if (row['last_payment_amount'] || row['lastpaymentamount']) {
          importRecord.lastPaymentAmount = parseFloat(row['last_payment_amount'] || row['lastpaymentamount']);
        }
        
        if (row['last_payment_date'] || row['lastpaymentdate']) {
          importRecord.lastPaymentDate = row['last_payment_date'] || row['lastpaymentdate'];
        }
        
        if (row['total_days_in_arrears'] || row['totaldaysinarrears'] || row['days_in_arrears']) {
          importRecord.totalDaysInArrears = parseInt(row['total_days_in_arrears'] || row['totaldaysinarrears'] || row['days_in_arrears']);
        }
        
        if (importRecord.accountNumber) {
          data.push(importRecord);
        } else {
          errors.push(`Row ${i + 1}: Missing account number`);
        }
      }
      
      // Import the data
      importData(data);
      
      setImportStatus('success');
      setImportResults({ updated: data.length, errors });
      
    } catch (error) {
      setImportStatus('error');
      setImportResults({ updated: 0, errors: ['Failed to process file'] });
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      'account_number,outstanding_balance,last_payment_amount,last_payment_date,total_days_in_arrears',
      'ACC-2024-001,15000.00,2500.00,2024-01-15,45',
      'ACC-2024-002,8500.00,1000.00,2024-01-20,30',
      'ACC-2024-003,25000.00,0.00,2023-12-01,75'
    ].join('\n');
    
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_import.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Import</h1>
          <p className="text-gray-600 mt-2">Import CSV files to update collection case data</p>
        </div>
        <button
          onClick={downloadSampleCSV}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Sample CSV
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop CSV file here or click to browse
          </h3>
          <p className="text-gray-600 mb-4">
            Upload a CSV file with collection case updates
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
          >
            Select CSV File
          </label>
        </div>

        {/* Expected Format */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Expected CSV Format:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Required:</strong> account_number</p>
            <p><strong>Optional:</strong> outstanding_balance, last_payment_amount, last_payment_date, total_days_in_arrears</p>
            <p className="text-xs text-gray-500 mt-2">
              Note: Column names are case-insensitive and underscores are optional
            </p>
          </div>
        </div>
      </div>

      {/* Import Status */}
      {importStatus !== 'idle' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            {importStatus === 'processing' && (
              <>
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium text-gray-900">Processing import...</span>
              </>
            )}
            {importStatus === 'success' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Import completed successfully!</span>
              </>
            )}
            {importStatus === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-900">Import failed</span>
              </>
            )}
          </div>

          {importStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                Successfully updated {importResults.updated} collection cases.
                Collection strategies have been reapplied automatically.
              </p>
              {importResults.errors.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-amber-800">Warnings:</p>
                  <ul className="text-sm text-amber-700 mt-1 space-y-1">
                    {importResults.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {importStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="text-sm text-red-700 space-y-1">
                {importResults.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}