import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Calendar, User, Tag, X } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActions({ selectedCount, onClearSelection }: BulkActionsProps) {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const bulkActions = [
    {
      id: 'call',
      label: 'Schedule Calls',
      icon: Phone,
      description: 'Schedule phone calls for selected accounts',
      color: 'text-blue-600 hover:bg-blue-50'
    },
    {
      id: 'email',
      label: 'Send Emails',
      icon: Mail,
      description: 'Send bulk emails to selected accounts',
      color: 'text-green-600 hover:bg-green-50'
    },
    {
      id: 'sms',
      label: 'Send SMS',
      icon: MessageSquare,
      description: 'Send SMS messages to selected accounts',
      color: 'text-purple-600 hover:bg-purple-50'
    },
    {
      id: 'assign',
      label: 'Assign Collector',
      icon: User,
      description: 'Assign accounts to a specific collector',
      color: 'text-amber-600 hover:bg-amber-50'
    },
    {
      id: 'tag',
      label: 'Add Tags',
      icon: Tag,
      description: 'Add tags to selected accounts',
      color: 'text-indigo-600 hover:bg-indigo-50'
    },
    {
      id: 'schedule',
      label: 'Schedule Follow-up',
      icon: Calendar,
      description: 'Schedule follow-up activities',
      color: 'text-red-600 hover:bg-red-50'
    }
  ];

  const handleActionClick = (actionId: string) => {
    console.log(`Executing bulk action: ${actionId} on ${selectedCount} accounts`);
    setShowActionMenu(false);
    // In a real app, this would trigger the appropriate bulk action
  };

  return (
    <div className="bg-blue-600 text-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{selectedCount}</span>
            </div>
            <span className="font-medium">
              {selectedCount} account{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActionMenu(!showActionMenu)}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Bulk Actions
            </button>

            {showActionMenu && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Bulk Actions</h3>
                  <p className="text-sm text-gray-600">Apply actions to {selectedCount} selected accounts</p>
                </div>
                <div className="p-2">
                  {bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${action.color}`}
                    >
                      <action.icon className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{action.label}</p>
                        <p className="text-xs text-gray-600">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClearSelection}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}