import React from 'react';

interface PipelineStage {
  name: string;
  count: number;
  value: number;
  color: string;
}

const pipelineData: PipelineStage[] = [
  { name: 'New Accounts', count: 1247, value: 2840000, color: 'bg-gray-400' },
  { name: 'First Contact', count: 892, value: 2150000, color: 'bg-blue-500' },
  { name: 'In Negotiation', count: 456, value: 1680000, color: 'bg-yellow-500' },
  { name: 'PTP Obtained', count: 234, value: 980000, color: 'bg-orange-500' },
  { name: 'Payment Received', count: 156, value: 650000, color: 'bg-green-500' }
];

export function CollectionPipeline() {
  const maxValue = Math.max(...pipelineData.map(stage => stage.value));

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4 flex-1">
        {pipelineData.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{stage.name}</span>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{stage.count}</p>
                <p className="text-xs text-gray-600">${(stage.value / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${stage.color} transition-all duration-500`}
                style={{ width: `${(stage.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {pipelineData.reduce((sum, stage) => sum + stage.count, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-600">Total Accounts</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">
              ${(pipelineData.reduce((sum, stage) => sum + stage.value, 0) / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-600">Pipeline Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}