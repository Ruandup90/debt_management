import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Phone } from 'lucide-react';

interface ComplianceReportProps {
  dateRange: string;
}

export function ComplianceReport({ dateRange }: ComplianceReportProps) {
  // Mock compliance data
  const complianceData = {
    overallScore: 94.2,
    totalViolations: 3,
    resolvedViolations: 15,
    pendingReviews: 2,
    callTimeViolations: [
      { date: '2024-02-14', collector: 'Alex Rodriguez', time: '20:45', account: 'ACC-2024-156', status: 'resolved' },
      { date: '2024-02-12', collector: 'Jennifer Lee', time: '21:15', account: 'ACC-2024-089', status: 'pending' }
    ],
    contactFrequencyViolations: [
      { date: '2024-02-13', collector: 'David Wilson', account: 'ACC-2024-234', attempts: 8, status: 'resolved' }
    ],
    disputeHandling: {
      totalDisputes: 12,
      resolvedWithin30Days: 10,
      pendingDisputes: 2,
      averageResolutionTime: 18.5
    },
    ceaseAndDesist: {
      totalRequests: 5,
      processed: 5,
      averageProcessingTime: 2.1
    }
  };

  const complianceMetrics = [
    {
      title: 'Call Time Compliance',
      score: 96.8,
      violations: 2,
      description: 'Calls made within permitted hours (8 AM - 9 PM)',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Contact Frequency',
      score: 98.2,
      violations: 1,
      description: 'Maximum contact attempts per day not exceeded',
      icon: Phone,
      color: 'green'
    },
    {
      title: 'Documentation',
      score: 92.5,
      violations: 0,
      description: 'All required documentation properly maintained',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Dispute Resolution',
      score: 88.9,
      violations: 0,
      description: 'Disputes handled within regulatory timeframes',
      icon: AlertTriangle,
      color: 'amber'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 95) return 'bg-green-100';
    if (score >= 85) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Overall Compliance Score */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Overall Compliance Score</h2>
            <p className="text-blue-700">Regulatory compliance across all collection activities</p>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-blue-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - complianceData.overallScore / 100)}`}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-900">{complianceData.overallScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getScoreBgColor(metric.score)}`}>
                <metric.icon className={`w-6 h-6 ${getScoreColor(metric.score)}`} />
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score.toFixed(1)}%
                </p>
                {metric.violations > 0 && (
                  <p className="text-sm text-red-600">{metric.violations} violations</p>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Violations</p>
              <p className="text-2xl font-bold text-red-600">{complianceData.totalViolations}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved This Period</p>
              <p className="text-2xl font-bold text-green-600">{complianceData.resolvedViolations}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-amber-600">{complianceData.pendingReviews}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(complianceData.overallScore)}`}>
                {complianceData.overallScore}%
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Violations Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Time Violations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Call Time Violations</h3>
          </div>
          <div className="p-6">
            {complianceData.callTimeViolations.length > 0 ? (
              <div className="space-y-4">
                {complianceData.callTimeViolations.map((violation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{violation.collector}</p>
                      <p className="text-sm text-gray-600">
                        {violation.account} • {new Date(violation.date).toLocaleDateString()} at {violation.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(violation.status)}`}>
                      {violation.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p>No call time violations</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Frequency Violations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Contact Frequency Violations</h3>
          </div>
          <div className="p-6">
            {complianceData.contactFrequencyViolations.length > 0 ? (
              <div className="space-y-4">
                {complianceData.contactFrequencyViolations.map((violation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{violation.collector}</p>
                      <p className="text-sm text-gray-600">
                        {violation.account} • {violation.attempts} attempts on {new Date(violation.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(violation.status)}`}>
                      {violation.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p>No contact frequency violations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dispute and Cease & Desist Handling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispute Handling</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Disputes</span>
              <span className="font-bold text-gray-900">{complianceData.disputeHandling.totalDisputes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Resolved Within 30 Days</span>
              <span className="font-bold text-green-600">{complianceData.disputeHandling.resolvedWithin30Days}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Disputes</span>
              <span className="font-bold text-amber-600">{complianceData.disputeHandling.pendingDisputes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Resolution Time</span>
              <span className="font-bold text-blue-600">{complianceData.disputeHandling.averageResolutionTime} days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cease & Desist Requests</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Requests</span>
              <span className="font-bold text-gray-900">{complianceData.ceaseAndDesist.totalRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Processed</span>
              <span className="font-bold text-green-600">{complianceData.ceaseAndDesist.processed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Processing Time</span>
              <span className="font-bold text-blue-600">{complianceData.ceaseAndDesist.averageProcessingTime} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Compliance Rate</span>
              <span className="font-bold text-green-600">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}