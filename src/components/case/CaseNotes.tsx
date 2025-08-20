import React, { useState } from 'react';
import { Account } from '../../types/account';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';

interface CaseNotesProps {
  account: Account;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'general' | 'payment' | 'contact' | 'dispute' | 'legal';
}

// Mock notes data - in a real app this would come from the account
const mockNotes: Note[] = [
  {
    id: '1',
    content: 'Customer experiencing temporary financial hardship due to job loss. Willing to cooperate and make payment arrangements. Discussed payment plan options.',
    createdAt: '2024-02-10T14:30:00',
    createdBy: 'Mike Johnson',
    type: 'contact'
  },
  {
    id: '2',
    content: 'Customer requested payment plan of $1,000 per month for 5 months. Awaiting approval from management.',
    createdAt: '2024-02-08T11:15:00',
    createdBy: 'Mike Johnson',
    type: 'payment'
  },
  {
    id: '3',
    content: 'Initial contact attempt - customer was polite and acknowledged the debt. Requested time to review financial situation.',
    createdAt: '2024-02-05T16:45:00',
    createdBy: 'Mike Johnson',
    type: 'contact'
  }
];

export function CaseNotes({ account }: CaseNotesProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ content: '', type: 'general' as Note['type'] });
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'contact':
        return 'text-blue-600 bg-blue-100';
      case 'dispute':
        return 'text-red-600 bg-red-100';
      case 'legal':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddNote = () => {
    if (newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.content,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User', // In a real app, this would be the logged-in user
        type: newNote.type
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({ content: '', type: 'general' });
      setShowAddForm(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({ content: note.content, type: note.type });
    setShowAddForm(true);
  };

  const handleUpdateNote = () => {
    if (editingNote && newNote.content.trim()) {
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id 
          ? { ...note, content: newNote.content, type: newNote.type }
          : note
      ));
      setEditingNote(null);
      setNewNote({ content: '', type: 'general' });
      setShowAddForm(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingNote(null);
    setNewNote({ content: '', type: 'general' });
  };

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
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

      {/* Add/Edit Note Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
              <select
                value={newNote.type}
                onChange={(e) => setNewNote(prev => ({ ...prev, type: e.target.value as Note['type'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="contact">Contact</option>
                <option value="payment">Payment</option>
                <option value="dispute">Dispute</option>
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
              onClick={editingNote ? handleUpdateNote : handleAddNote}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingNote ? 'Update Note' : 'Add Note'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-medium ${getNoteTypeColor(note.type)}`}>
                  {note.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditNote(note)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-600 hover:text-red-900"
                >
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
        
        {notes.length === 0 && (
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