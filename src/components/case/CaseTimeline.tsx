import React from 'react';
import { Account } from '../../types/account';
import { Phone, Mail, MessageSquare, DollarSign, AlertTriangle, FileText, Calendar } from 'lucide-react';

interface CaseTimelineProps {
  account: Account;
}

// Mock timeline data - in a real app this would come from the account activities
const mockTimelineEvents = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment of $2,500 received via online portal',
    date: '2024-02-14T10:30:00',
    user: 'System',
    amount: 2500
  },
  {
    id: '2',
    type: 'call',
    title: 'Outbound Call',
    description: 'Successful contact with customer. Discussed payment options and obtained PTP for $5,000 by March 1st.',
    date: '2024-02-10T14:15:00',
    user: 'Mike Johnson',
    duration: 8
  },
  {
    id: '3',
    type: 'email',
    title: 'Email Sent',
    description: 'Payment reminder email sent to customer',
    date: '2024-02-08T09:00:00',
    user: 'System'
  },
  {
    id: '4',
    type: 'note',
    title: 'Case Note Added',
    description: 'Customer experiencing temporary financial hardship but willing to cooperate',
    date: '2024-02-05T16:45:00',
    user: 'Mike Johnson'
  },
  {
    id: '5',
    type: 'call',
    title: 'Outbound Call',
    description: 'No answer - left voicemail message',
    date: '2024-02-03T11:20:00',
    user: 'Mike Johnson',
    duration: 0
  },
  {
    id: '6',
    type: 'placement',
    title: 'Account Placed',
    description: 'Account placed for collection',
    date: '2024-01-01T00:00:00',
    user: 'System'
  }
];

export function CaseTimeline({ account }: CaseTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'dispute':
        return <AlertTriangle className="w-4 h-4" />;
      case 'note':
        return <FileText className="w-4 h-4" />;
      case 'placement':
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'call':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'email':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'sms':
        return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'dispute':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'note':
        return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'placement':
        return 'text-amber-600 bg-amber-100 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Case Timeline</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {mockTimelineEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4">
              {/* Timeline dot */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">by {event.user}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {event.amount && (
                      <span className="text-green-600 font-medium">
                        ${event.amount.toLocaleString()}
                      </span>
                    )}
                    {event.duration !== undefined && (
                      <span>
                        {event.duration > 0 ? `${event.duration} min` : 'No answer'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}