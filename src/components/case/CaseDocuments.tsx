import React, { useState } from 'react';
import { Account } from '../../types/account';
import { Upload, FileText, Download, Eye, Trash2, Plus } from 'lucide-react';

interface CaseDocumentsProps {
  account: Account;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  category: 'agreement' | 'correspondence' | 'legal' | 'identity' | 'other';
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Original_Credit_Agreement.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2024-01-15T10:30:00',
    uploadedBy: 'System',
    category: 'agreement'
  },
  {
    id: '2',
    name: 'Customer_ID_Copy.jpg',
    type: 'Image',
    size: '1.2 MB',
    uploadDate: '2024-02-05T14:20:00',
    uploadedBy: 'Mike Johnson',
    category: 'identity'
  },
  {
    id: '3',
    name: 'Payment_Plan_Agreement.pdf',
    type: 'PDF',
    size: '890 KB',
    uploadDate: '2024-02-10T16:45:00',
    uploadedBy: 'Mike Johnson',
    category: 'agreement'
  }
];

export function CaseDocuments({ account }: CaseDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agreement':
        return 'text-blue-600 bg-blue-100';
      case 'correspondence':
        return 'text-green-600 bg-green-100';
      case 'legal':
        return 'text-red-600 bg-red-100';
      case 'identity':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

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
      const newDocument: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Current User',
        category: 'other'
      };
      setDocuments(prev => [newDocument, ...prev]);
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

  const handleDeleteDocument = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
  };

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['agreement', 'correspondence', 'legal', 'identity', 'other'].map(category => (
          <div key={category} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {documents.filter(doc => doc.category === category).length}
            </div>
            <div className="text-sm text-gray-600 capitalize">{category}</div>
          </div>
        ))}
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">All Documents</h4>
        </div>
        
        {documents.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {documents.map((document) => (
              <div key={document.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  {getFileIcon(document.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{document.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{document.type}</span>
                      <span>{document.size}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(document.category)}`}>
                        {document.category}
                      </span>
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
                  <button
                    onClick={() => handleDeleteDocument(document.id)}
                    className="text-red-600 hover:text-red-900 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Documents</h4>
            <p className="text-gray-600">Upload documents to start building the case file</p>
          </div>
        )}
      </div>
    </div>
  );
}