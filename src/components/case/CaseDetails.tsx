import React from 'react';
import { Account } from '../../types/account';
import { Phone, Mail, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

interface CaseDetailsProps {
  account: Account;
}

export function CaseDetails({ account }: CaseDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <p className="text-gray-900">{account.customerName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
            <p className="text-gray-900">{account.customerId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{account.contactInfo.phone}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{account.contactInfo.email}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-900">{account.contactInfo.address.street}</p>
                <p className="text-gray-900">
                  {account.contactInfo.address.city}, {account.contactInfo.address.state} {account.contactInfo.address.zipCode}
                </p>
                <p className="text-gray-900">{account.contactInfo.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <p className="text-gray-900">{account.accountNumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Category</label>
            <p className="text-gray-900">{account.debtCategory}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Debt Amount</label>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">${account.originalDebtAmount.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <p className="text-xl font-bold text-red-600">${account.currentBalance.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placement Date</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{new Date(account.placementDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days Past Due</label>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-xl font-bold text-red-600">{account.daysPastDue} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Payment Date</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{new Date(account.lastPaymentDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Payment Amount</label>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">${account.lastPaymentAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Collector</label>
            <p className="text-gray-900">{account.assignedCollector || 'Unassigned'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
            <p className="text-gray-900">{account.priority}/10</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delinquency Band</label>
            <p className="text-gray-900">Band {account.delinquencyBand}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Attempts</label>
            <p className="text-gray-900">{account.contactAttempts}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact Date</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-gray-900">{new Date(account.lastContactDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact Method</label>
            <p className="text-gray-900 capitalize">{account.lastContactMethod || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}