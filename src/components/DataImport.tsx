import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download } from 'lucide-react';
import { ImportHistory } from './import/ImportHistory';
import { ImportValidation } from './import/ImportValidation';
import { ImportScheduler } from './import/ImportScheduler';
import { FieldMapping } from './import/FieldMapping';

interface ImportFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'validating' | 'processing' | 'completed' | 'error';
  records: number;
  errors: string[];
  timestamp: Date;
}

export function DataImport() {
  const [files, setFiles] = useState<ImportFile[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'schedule' | 'history'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [showFieldMapping, setShowFieldMapping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ImportFile | null>(null);

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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = useCallback((fileList: File[]) => {
    const newFiles: ImportFile[] = fileList.map(file => ({
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      records: 0,
      errors: [],
      timestamp: new Date()
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'validating' } : f
        ));
      }, 500);

      setTimeout(() => {
        const hasErrors = Math.random() > 0.7;
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { 
            ...f, 
            status: hasErrors ? 'error' : 'processing',
            records: Math.floor(Math.random() * 10000) + 1000,
            errors: hasErrors ? ['Invalid phone number format in row 145', 'Missing customer ID in row 267'] : []
          } : f
        ));
      }, 2000);

      if (Math.random() > 0.3) {
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'completed' } : f
          ));
        }, 4000);
      }
    });
  }, []);

  const getStatusIcon = (status: ImportFile['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'validating':
      case 'processing':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: ImportFile['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      case 'validating':
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Import</h1>
        <p className="text-gray-600 mt-2">Import and manage customer delinquency data</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'upload', label: 'Upload Files', icon: Upload },
            { id: 'schedule', label: 'Scheduled Imports', icon: Clock },
            { id: 'history', label: 'Import History', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          {/* Upload Area */}
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
              Drop files here or click to browse
            </h3>
            <p className="text-gray-600 mb-4">
              Supports CSV, Excel, XML, and fixed-width text files
            </p>
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.xml,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
            >
              Select Files
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Import Queue</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {files.map(file => (
                  <div key={file.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatFileSize(file.size)} • {file.records > 0 && `${file.records.toLocaleString()} records`}
                        </p>
                        {file.errors.length > 0 && (
                          <p className="text-sm text-red-600 mt-1">
                            {file.errors.length} validation error(s)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(file.status)}`}>
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </div>
                      {file.status === 'error' && (
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowFieldMapping(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Fix Issues
                        </button>
                      )}
                      {file.status === 'completed' && (
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Report
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Import Validation */}
          <ImportValidation />
        </div>
      )}

      {activeTab === 'schedule' && <ImportScheduler />}
      {activeTab === 'history' && <ImportHistory />}

      {/* Field Mapping Modal */}
      {showFieldMapping && selectedFile && (
        <FieldMapping
          file={selectedFile}
          onClose={() => {
            setShowFieldMapping(false);
            setSelectedFile(null);
          }}
          onSave={() => {
            setShowFieldMapping(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}