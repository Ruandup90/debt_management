import React from 'react';
import { Phone, Mail, MessageSquare, Calendar, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { Account } from '../../types/account';

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export function AccountCard({ account, isSelected, onSelect }: AccountCardProps) {
  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600 bg-red-100';
    if (priority >= 5) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return 'High';
    if (priority >= 5) return 'Medium';
    return 'Low';
  };

  const getDelinquencyColor = (band: string) => {
    switch (band) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'E': return 'text-red-600 bg-red-100';
      case 'F': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'disputed': return 'text-red-600 bg-red-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`p-6 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {account.customerName}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(account.priority)}`}>
                  {getPriorityLabel(account.priority)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDelinquencyColor(account.delinquencyBand)}`}>
                  Band {account.delinquencyBand}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(account.status)}`}>
                  {account.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="font-medium text-gray-900">{account.accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Balance</p>
                <p className="font-bold text-lg text-gray-900">${account.currentBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Days Past Due</p>
                <p className="font-medium text-red-600">{account.daysPastDue} days</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Payment</p>
                <p className="font-medium text-gray-900">${account.lastPaymentAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{new Date(account.lastPaymentDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{account.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span className="truncate max-w-32">{account.contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Last contact: {new Date(account.lastContactDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {account.nextAction && (
                  <div className="flex items-center space-x-1 text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{account.nextAction}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {account.promisesToPay.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Active PTP: ${account.promisesToPay[0].amount.toLocaleString()} due {new Date(account.promisesToPay[0].dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
            
            {!account.nextAction && (
              <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                <span>No strategy applied</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}