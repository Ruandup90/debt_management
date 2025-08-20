import React, { forwardRef, useState, useCallback } from 'react';
import { StrategyBlock } from '../../types/strategy';

interface StrategyCanvasProps {
  blocks: StrategyBlock[];
  selectedBlock: StrategyBlock | null;
  onSelectBlock: (block: StrategyBlock | null) => void;
  onUpdateBlock: (blockId: string, updates: Partial<StrategyBlock>) => void;
  onDeleteBlock: (blockId: string) => void;
  onConnectBlocks: (fromId: string, toId: string) => void;
  isTestMode: boolean;
}

interface ConnectionState {
  isConnecting: boolean;
  sourceBlockId: string | null;
  sourcePosition: { x: number; y: number } | null;
}

export const StrategyCanvas = forwardRef<HTMLDivElement, StrategyCanvasProps>(
  ({ blocks, selectedBlock, onSelectBlock, onUpdateBlock, onDeleteBlock, onConnectBlocks, isTestMode }, ref) => {
    const [connectionState, setConnectionState] = useState<ConnectionState>({
      isConnecting: false,
      sourceBlockId: null,
      sourcePosition: null
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const getBlockColor = (type: string) => {
      switch (type) {
        case 'condition':
          return 'bg-blue-100 border-blue-300 text-blue-800';
        case 'action':
          return 'bg-green-100 border-green-300 text-green-800';
        case 'timer':
          return 'bg-yellow-100 border-yellow-300 text-yellow-800';
        case 'escalation':
          return 'bg-red-100 border-red-300 text-red-800';
        case 'end':
          return 'bg-gray-100 border-gray-300 text-gray-800';
        default:
          return 'bg-gray-100 border-gray-300 text-gray-800';
      }
    };

    const handleBlockClick = (block: StrategyBlock) => {
      if (connectionState.isConnecting && connectionState.sourceBlockId !== block.id) {
        // Complete connection
        onConnectBlocks(connectionState.sourceBlockId!, block.id);
        setConnectionState({ isConnecting: false, sourceBlockId: null, sourcePosition: null });
      } else {
        onSelectBlock(selectedBlock?.id === block.id ? null : block);
      }
    };

    const handleConnectionStart = (blockId: string, position: { x: number; y: number }) => {
      setConnectionState({
        isConnecting: true,
        sourceBlockId: blockId,
        sourcePosition: position
      });
    };

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (connectionState.isConnecting) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }, [connectionState.isConnecting]);

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (connectionState.isConnecting && e.target === e.currentTarget) {
        // Cancel connection if clicking on empty canvas
        setConnectionState({ isConnecting: false, sourceBlockId: null, sourcePosition: null });
      }
    };

    const handleBlockDrag = (blockId: string, newPosition: { x: number; y: number }) => {
      onUpdateBlock(blockId, { position: newPosition });
    };

    return (
      <div
        ref={ref}
        className="w-full h-full bg-gray-50 relative overflow-auto cursor-crosshair"
        style={{ minHeight: '600px' }}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
      >
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Render Blocks */}
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`absolute w-48 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              getBlockColor(block.type)
            } ${
              selectedBlock?.id === block.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            } ${
              connectionState.isConnecting && connectionState.sourceBlockId === block.id ? 'ring-2 ring-green-500 ring-offset-2' : ''
            } ${
              isTestMode ? 'animate-pulse' : ''
            }`}
            style={{
              left: block.position.x,
              top: block.position.y,
              zIndex: selectedBlock?.id === block.id ? 10 : 1
            }}
            onClick={() => handleBlockClick(block)}
            onDoubleClick={() => handleConnectionStart(block.id, { 
              x: block.position.x + 96, 
              y: block.position.y + 32 
            })}
            onMouseDown={(e) => {
              if (connectionState.isConnecting) return;
              
              const startX = e.clientX - block.position.x;
              const startY = e.clientY - block.position.y;

              const handleMouseMove = (e: MouseEvent) => {
                const newX = e.clientX - startX;
                const newY = e.clientY - startY;
                handleBlockDrag(block.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div className="text-xs font-medium uppercase tracking-wide mb-2">
              {block.type}
            </div>
            <div className="font-semibold text-sm">
              {block.data.title || `New ${block.type}`}
            </div>
            {block.data.field && (
              <div className="text-xs mt-1 opacity-75">
                {block.data.field} {block.data.operator} {block.data.value}
              </div>
            )}
            {block.data.actionType && (
              <div className="text-xs mt-1 opacity-75">
                {block.data.actionType} - {block.data.priority}
              </div>
            )}
          </div>
        ))}

        {/* Render Connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Existing connections */}
          {blocks.map((block) =>
            block.connections.map((connection, index) => {
              const targetBlock = blocks.find(b => b.id === connection.targetId);
              if (!targetBlock) return null;

              const startX = block.position.x + 96; // Half of block width (192/2)
              const startY = block.position.y + 32; // Approximate center height
              const endX = targetBlock.position.x + 96;
              const endY = targetBlock.position.y + 32;

              return (
                <line
                  key={`${block.id}-${connection.targetId}-${index}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#6b7280"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })
          )}
          
          {/* Active connection line */}
          {connectionState.isConnecting && connectionState.sourcePosition && (
            <line
              x1={connectionState.sourcePosition.x}
              y1={connectionState.sourcePosition.y}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead-temp)"
            />
          )}
          
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#6b7280"
              />
            </marker>
            <marker
              id="arrowhead-temp"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#10b981"
              />
            </marker>
          </defs>
        </svg>

        {/* Empty State */}
        {blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-medium mb-2">Start Building Your Strategy</h3>
              <p className="text-sm">Drag blocks from the toolbox, then double-click to connect them</p>
              
              {/* Connection Points */}
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleConnectionStart(block.id, { 
                    x: block.position.x + 192, 
                    y: block.position.y + 32 
                  });
                }}
              />
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}
        
        {/* Connection Instructions */}
        {connectionState.isConnecting && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-green-800 text-sm font-medium">
            Click on another block to connect, or click empty space to cancel
          </div>
        )}
      </div>
    );
  }
);