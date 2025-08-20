import React from 'react';

export function PerformanceChart() {
  // Mock data for the chart
  const data = [
    { day: 'Mon', collections: 45000, contacts: 120, ptps: 35 },
    { day: 'Tue', collections: 52000, contacts: 135, ptps: 42 },
    { day: 'Wed', collections: 38000, contacts: 98, ptps: 28 },
    { day: 'Thu', collections: 61000, contacts: 156, ptps: 48 },
    { day: 'Fri', collections: 58000, contacts: 142, ptps: 45 },
    { day: 'Sat', collections: 32000, contacts: 89, ptps: 25 },
    { day: 'Sun', collections: 28000, contacts: 76, ptps: 22 }
  ];

  const maxCollections = Math.max(...data.map(d => d.collections));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Collections ($)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Contacts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">PTPs</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center space-y-1 mb-2">
              {/* Collections Bar */}
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(item.collections / maxCollections) * 120}px` }}
              ></div>
              {/* Contacts Bar */}
              <div 
                className="w-full bg-green-500"
                style={{ height: `${(item.contacts / 200) * 60}px` }}
              ></div>
              {/* PTPs Bar */}
              <div 
                className="w-full bg-purple-500 rounded-b"
                style={{ height: `${(item.ptps / 60) * 40}px` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold text-blue-600">
            ${data.reduce((sum, d) => sum + d.collections, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Total Collections</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-600">
            {data.reduce((sum, d) => sum + d.contacts, 0)}
          </p>
          <p className="text-xs text-gray-600">Total Contacts</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-600">
            {data.reduce((sum, d) => sum + d.ptps, 0)}
          </p>
          <p className="text-xs text-gray-600">Total PTPs</p>
        </div>
      </div>
    </div>
  );
}