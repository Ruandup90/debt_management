import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface CaseNotesProps {
  caseId: string;
}

export function CaseNotes({ caseId }: CaseNotesProps) {
  const { getCaseById, addNote } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ content: '', category: 'general' as const });

  const caseData = getCaseById(caseId);

  if (!caseData) {
    return <div>Case not found</div>;
  }

  const handleAddNote = () => {
    if (newNote.content.trim()) {
      addNote(caseId, {
        content: newNote.content,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User', // In a real app, this would be the logged-in user
        category: newNote.category
      });
      setNewNote({ content: '', category: 'general' });
      setShowAddForm(false);
    }
  };

  const getNoteTypeColor = (category: string) => {
    switch (category) {
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'contact':
        return 'text-blue-600 bg-blue-100';
      case 'legal':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Sort notes by date (newest first)
  const sortedNotes = [...caseData.notes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Case Notes</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Add New Note</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newNote.category}
                onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="contact">Contact</option>
                <option value="payment">Payment</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your note here..."
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddNote}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Note
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewNote({ content: '', category: 'general' });
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {sortedNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-medium ${getNoteTypeColor(note.category)}`}>
                  {note.category}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-900 mb-3">{note.content}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>by {note.createdBy}</span>
              <span>{new Date(note.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
        
        {sortedNotes.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Notes Yet</h4>
            <p className="text-gray-600">Add your first note to start documenting case activities</p>
          </div>
        )}
      </div>
    </div>
  );
}