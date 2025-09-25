import React from 'react';
import { Phone, Mail, MessageSquare, DollarSign, FileText, Calendar } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface CaseTimelineProps {
  caseId: string;
}

export function CaseTimeline({ caseId }: CaseTimelineProps) {
  const { getCaseById } = useData();
  const caseData = getCaseById(caseId);

  if (!caseData) {
    return <div>Case not found</div>;
  }

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
      case 'note':
        return <FileText className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'call':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'email':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'sms':
        return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'note':
        return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'document':
        return 'text-amber-600 bg-amber-100 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Sort activities by date (newest first)
  const sortedActivities = [...caseData.activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        <p className="text-sm text-gray-600">{sortedActivities.length} activities</p>
      </div>

      {sortedActivities.length > 0 ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {sortedActivities.map((activity, index) => (
              <div key={activity.id} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                
                {/* Activity content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 capitalize">{activity.type}</h4>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                  
                  {activity.outcome && (
                    <p className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      Outcome: {activity.outcome}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">by {activity.createdBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Activities Yet</h4>
          <p className="text-gray-600">Activities will appear here as you interact with this case</p>
        </div>
      )}
    </div>
  );
}