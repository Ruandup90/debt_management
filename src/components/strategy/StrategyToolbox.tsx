import React from 'react';
import { GitBranch, Phone, Clock, AlertTriangle, Square } from 'lucide-react';

interface StrategyToolboxProps {
  onAddBlock: (blockType: string, position: { x: number; y: number }) => void;
}

const blockTypes = [
  {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    description: 'Decision point based on account data',
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    type: 'action',
    label: 'Action',
    icon: Phone,
    description: 'Communication or collection action',
    color: 'bg-green-100 border-green-300 text-green-800'
  },
  {
    type: 'timer',
    label: 'Timer',
    icon: Clock,
    description: 'Wait period before next action',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
  },
  {
    type: 'escalation',
    label: 'Escalation',
    icon: AlertTriangle,
    description: 'Escalate to next level or team',
    color: 'bg-red-100 border-red-300 text-red-800'
  },
  {
    type: 'end',
    label: 'End',
    icon: Square,
    description: 'End the strategy workflow',
    color: 'bg-gray-100 border-gray-300 text-gray-800'
  }
];

export function StrategyToolbox({ onAddBlock }: StrategyToolboxProps) {
  const handleDragStart = (e: React.DragEvent, blockType: string) => {
    e.dataTransfer.setData('blockType', blockType);
  };

  const handleClick = (blockType: string) => {
    // Add block at a default position when clicked
    const position = {
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50
    };
    onAddBlock(blockType, position);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Blocks</h3>
      
      <div className="space-y-3">
        {blockTypes.map((blockType) => (
          <div
            key={blockType.type}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${blockType.color}`}
            draggable
            onDragStart={(e) => handleDragStart(e, blockType.type)}
            onClick={() => handleClick(blockType.type)}
          >
            <div className="flex items-center space-x-3">
              <blockType.icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium text-sm">{blockType.label}</div>
                <div className="text-xs opacity-75 mt-1">{blockType.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm text-gray-900 mb-2">How to Use</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click or drag blocks to canvas</li>
          <li>• Click blocks to configure</li>
          <li>• Drag to connect blocks</li>
          <li>• Test strategy before saving</li>
        </ul>
      </div>
    </div>
  );
}