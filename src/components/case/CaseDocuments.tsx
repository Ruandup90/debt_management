import React, { useState } from 'react';
import { Upload, FileText, Download, Eye, Trash2, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface CaseDocumentsProps {
  caseId: string;
}

export function CaseDocuments({ caseId }: CaseDocumentsProps) {
  const { getCaseById, addDocument } = useData();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const caseData = getCaseById(caseId);

  if (!caseData) {
    return <div>Case not found</div>;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    files.forEach(file => {
      addDocument(caseId, {
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
        size: file.size,
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Current User',
        url: URL.createObjectURL(file) // In a real app, this would be uploaded to a server
      });
    });
    setShowUploadForm(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  // Sort documents by upload date (newest first)
  const sortedDocuments = [...caseData.documents].sort((a, b) => 
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Case Documents</h3>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Upload New Document</h4>
          
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
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Drop files here or click to browse
            </h4>
            <p className="text-gray-600 mb-4">
              Supports PDF, images, and document files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
            >
              Select Files
            </label>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setShowUploadForm(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="space-y-4">
        {sortedDocuments.length > 0 ? (
          sortedDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                {getFileIcon(document.type)}
                <div>
                  <h4 className="font-medium text-gray-900">{document.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{document.type}</span>
                    <span>{formatFileSize(document.size)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded by {document.uploadedBy} on {new Date(document.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 p-2">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900 p-2">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Documents</h4>
            <p className="text-gray-600">Upload documents to start building the case file</p>
          </div>
        )}
      </div>
    </div>
  );
}