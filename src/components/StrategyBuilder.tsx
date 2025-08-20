import React, { useState, useRef, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StrategyCanvas } from './strategy/StrategyCanvas';
import { StrategyToolbox } from './strategy/StrategyToolbox';
import { StrategyProperties } from './strategy/StrategyProperties';
import { StrategyHeader } from './strategy/StrategyHeader';
import { StrategyBlock } from '../types/strategy';
import { useData } from '../contexts/DataContext';

export function StrategyBuilder() {
  const [blocks, setBlocks] = useState<StrategyBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<StrategyBlock | null>(null);
  const [strategyName, setStrategyName] = useState('Untitled Strategy');
  const [isTestMode, setIsTestMode] = useState(false);
  const [savedStrategies, setSavedStrategies] = useState<any[]>([]);
  const [activeStrategyId, setActiveStrategyId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { accounts, setAccounts } = useData();

  const addBlock = useCallback((blockType: string, position: { x: number; y: number }) => {
    const newBlock: StrategyBlock = {
      id: `block_${Date.now()}`,
      type: blockType as StrategyBlock['type'],
      position,
      data: getDefaultBlockData(blockType),
      connections: []
    };
    
    setBlocks(prev => [...prev, newBlock]);
  }, []);

  const updateBlock = useCallback((blockId: string, updates: Partial<StrategyBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  }, []);

  const deleteBlock = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  }, [selectedBlock]);

  const connectBlocks = useCallback((fromId: string, toId: string) => {
    setBlocks(prev => prev.map(block => {
      if (block.id === fromId) {
        return {
          ...block,
          connections: [...block.connections.filter(conn => conn.targetId !== toId), { targetId: toId }]
        };
      }
      return block;
    }));
  }, []);

  const testStrategy = useCallback(() => {
    setIsTestMode(!isTestMode);
  }, [isTestMode]);

  const saveStrategy = useCallback(() => {
    const strategy = {
      id: activeStrategyId || `strategy_${Date.now()}`,
      name: strategyName,
      blocks,
      createdAt: new Date(),
      version: '1.0',
      isActive: true
    };
    
    setSavedStrategies(prev => {
      const existing = prev.find(s => s.id === strategy.id);
      if (existing) {
        return prev.map(s => s.id === strategy.id ? strategy : s);
      }
      return [...prev, strategy];
    });
    
    setActiveStrategyId(strategy.id);
    alert(`Strategy "${strategyName}" saved successfully!`);
  }, [strategyName, blocks, activeStrategyId]);

  const loadStrategy = useCallback((strategy: any) => {
    setStrategyName(strategy.name);
    setBlocks(strategy.blocks);
    setActiveStrategyId(strategy.id);
    setSelectedBlock(null);
  }, []);

  const executeStrategy = useCallback(() => {
    if (blocks.length === 0) {
      alert('Please create a strategy first');
      return;
    }

    // Apply strategy to accounts
    const updatedAccounts = accounts.map(account => {
      const recommendation = evaluateAccountAgainstStrategy(account, blocks);
      return {
        ...account,
        nextAction: recommendation.action,
        priority: recommendation.priority
      };
    });

    setAccounts(updatedAccounts);
    alert(`Strategy applied to ${accounts.length} accounts!`);
  }, [blocks, accounts, setAccounts]);

  const newStrategy = useCallback(() => {
    setBlocks([]);
    setSelectedBlock(null);
    setStrategyName('Untitled Strategy');
    setActiveStrategyId(null);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <StrategyHeader
          strategyName={strategyName}
          onStrategyNameChange={setStrategyName}
          onTest={testStrategy}
          onSave={saveStrategy}
          isTestMode={isTestMode}
          onExecute={executeStrategy}
          onNew={newStrategy}
          savedStrategies={savedStrategies}
          onLoadStrategy={loadStrategy}
          activeStrategyId={activeStrategyId}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <StrategyToolbox onAddBlock={addBlock} />
          
          <div className="flex-1 relative">
            <StrategyCanvas
              ref={canvasRef}
              blocks={blocks}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
              onConnectBlocks={connectBlocks}
              isTestMode={isTestMode}
            />
          </div>
          
          {selectedBlock && (
            <StrategyProperties
              block={selectedBlock}
              onUpdateBlock={updateBlock}
              onClose={() => setSelectedBlock(null)}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
}

function getDefaultBlockData(blockType: string) {
  switch (blockType) {
    case 'condition':
      return {
        title: 'New Condition',
        field: 'delinquency_band',
        operator: 'equals',
        value: ''
      };
    case 'action':
      return {
        title: 'New Action',
        actionType: 'phone',
        priority: 'medium',
        template: ''
      };
    case 'timer':
      return {
        title: 'Wait Timer',
        duration: 1,
        unit: 'days'
      };
    case 'escalation':
      return {
        title: 'Escalate',
        escalationType: 'manager',
        threshold: 3
      };
    case 'end':
      return {
        title: 'End Process',
        outcome: 'closed',
        reason: ''
      };
    default:
      return {};
  }
}

function evaluateAccountAgainstStrategy(account: any, blocks: StrategyBlock[]) {
  // Find the starting block (first condition or action)
  const startBlock = blocks.find(block => 
    block.connections.length === 0 || 
    !blocks.some(b => b.connections.some(c => c.targetId === block.id))
  );

  if (!startBlock) {
    return { action: 'No strategy defined', priority: 1 };
  }

  return evaluateBlock(account, startBlock, blocks);
}

function evaluateBlock(account: any, block: StrategyBlock, allBlocks: StrategyBlock[]): any {
  switch (block.type) {
    case 'condition':
      const conditionMet = evaluateCondition(account, block.data);
      const nextBlockId = block.connections[conditionMet ? 0 : 1]?.targetId;
      if (nextBlockId) {
        const nextBlock = allBlocks.find(b => b.id === nextBlockId);
        if (nextBlock) {
          return evaluateBlock(account, nextBlock, allBlocks);
        }
      }
      return { action: 'No next action', priority: 1 };

    case 'action':
      return {
        action: `${block.data.actionType} - ${block.data.title}`,
        priority: block.data.priority === 'high' ? 8 : block.data.priority === 'medium' ? 5 : 2
      };

    case 'timer':
      return {
        action: `Wait ${block.data.duration} ${block.data.unit}`,
        priority: 3
      };

    case 'escalation':
      return {
        action: `Escalate to ${block.data.escalationType}`,
        priority: 9
      };

    case 'end':
      return {
        action: `End: ${block.data.outcome}`,
        priority: 1
      };

    default:
      return { action: 'Unknown action', priority: 1 };
  }
}

function evaluateCondition(account: any, conditionData: any): boolean {
  const { field, operator, value } = conditionData;
  
  let accountValue;
  switch (field) {
    case 'delinquency_band':
      accountValue = account.delinquencyBand;
      break;
    case 'current_balance':
      accountValue = account.currentBalance;
      break;
    case 'days_past_due':
      accountValue = account.daysPastDue;
      break;
    case 'debt_category':
      accountValue = account.debtCategory;
      break;
    default:
      return false;
  }

  switch (operator) {
    case 'equals':
      return accountValue == value;
    case 'not_equals':
      return accountValue != value;
    case 'greater_than':
      return Number(accountValue) > Number(value);
    case 'less_than':
      return Number(accountValue) < Number(value);
    case 'contains':
      return String(accountValue).toLowerCase().includes(String(value).toLowerCase());
    default:
      return false;
  }
}