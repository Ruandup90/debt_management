import React from 'react';
import { Phone, Mail, MessageSquare, DollarSign, AlertTriangle, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'sms' | 'payment' | 'dispute' | 'system';
  description: string;
  time: string;
  user: string;
  status: 'success' | 'pending' | 'failed';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'payment',
    description: 'Payment received from John Smith - $2,500',
    time: '2 minutes ago',
    user: 'System',
    status: 'success'
  },
  {
    id: '2',
    type: 'call',
    description: 'Successful contact with Sarah Johnson - PTP obtained',
    time: '15 minutes ago',
    user: 'Mike Johnson',
    status: 'success'
  },
  {
    id: '3',
    type: 'email',
    description: 'Payment reminder sent to Michael Brown',
    time: '32 minutes ago',
    user: 'Lisa Chen',
    status: 'success'
  },
  {
    id: '4',
    type: 'dispute',
    description: 'Dispute raised by Emily Davis - Under review',
    time: '1 hour ago',
    user: 'Alex Rodriguez',
    status: 'pending'
  },
  {
    id: '5',
    type: 'sms',
    description: 'SMS delivery failed to Robert Wilson',
    time: '2 hours ago',
    user: 'Jennifer Lee',
    status: 'failed'
  }
];

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
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
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string, status: string) => {
    if (status === 'failed') return 'text-red-600 bg-red-100';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-100';
    
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'call':
        return 'text-blue-600 bg-blue-100';
      case 'email':
        return 'text-purple-600 bg-purple-100';
      case 'sms':
        return 'text-indigo-600 bg-indigo-100';
      case 'dispute':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`rounded-full p-2 ${getActivityColor(activity.type, activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className="text-xs text-gray-300">•</span>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}