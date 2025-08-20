import React, { useState } from 'react';
import { Play, Save, Edit2, Plus, FolderOpen, Zap } from 'lucide-react';

interface StrategyHeaderProps {
  strategyName: string;
  onStrategyNameChange: (name: string) => void;
  onTest: () => void;
  onSave: () => void;
  isTestMode: boolean;
  onExecute: () => void;
  onNew: () => void;
  savedStrategies: any[];
  onLoadStrategy: (strategy: any) => void;
  activeStrategyId: string | null;
}

export function StrategyHeader({ 
  strategyName, 
  onStrategyNameChange, 
  onTest, 
  onSave, 
  isTestMode,
  onExecute,
  onNew,
  savedStrategies,
  onLoadStrategy,
  activeStrategyId
}: StrategyHeaderProps) {
  const [showStrategyMenu, setShowStrategyMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={strategyName}
              onChange={(e) => onStrategyNameChange(e.target.value)}
              className="text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              placeholder="Strategy Name"
            />
          </div>
          {isTestMode && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Test Mode Active
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowStrategyMenu(!showStrategyMenu)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Strategies ({savedStrategies.length})
            </button>
            
            {showStrategyMenu && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Saved Strategies</h3>
                    <button
                      onClick={() => {
                        onNew();
                        setShowStrategyMenu(false);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      New
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {savedStrategies.length > 0 ? (
                    savedStrategies.map((strategy) => (
                      <div
                        key={strategy.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          activeStrategyId === strategy.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => {
                          onLoadStrategy(strategy);
                          setShowStrategyMenu(false);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{strategy.name}</p>
                            <p className="text-xs text-gray-500">
                              {strategy.blocks.length} blocks • {new Date(strategy.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {activeStrategyId === strategy.id && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>No saved strategies</p>
                      <p className="text-xs">Create and save your first strategy</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onTest}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              isTestMode
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            <Play className="w-4 h-4 mr-2" />
            {isTestMode ? 'Stop Test' : 'Test Strategy'}
          </button>
          
          <button
            onClick={onExecute}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Apply to Queue
          </button>
          
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Strategy
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
          💡 Double-click blocks to connect them
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Condition</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Action</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Timer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Escalation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}