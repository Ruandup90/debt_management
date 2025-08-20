export interface StrategyBlock {
  id: string;
  type: 'condition' | 'action' | 'timer' | 'escalation' | 'end';
  position: { x: number; y: number };
  data: Record<string, any>;
  connections: Connection[];
}

export interface Connection {
  targetId: string;
  label?: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  blocks: StrategyBlock[];
  status: 'draft' | 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  version: string;
  performance?: StrategyPerformance;
}

export interface StrategyPerformance {
  accountsProcessed: number;
  successRate: number;
  averageCollectionTime: number;
  totalCollected: number;
  contactRate: number;
  ptpRate: number;
}

export interface ConditionData {
  title: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'between' | 'contains' | 'is_empty' | 'is_not_empty' | 'in_list';
  value: string | number | string[];
}

export interface ActionData {
  title: string;
  actionType: 'phone' | 'email' | 'sms' | 'whatsapp' | 'letter';
  priority: 'low' | 'medium' | 'high';
  template?: string;
  scheduling?: {
    delay: number;
    unit: 'minutes' | 'hours' | 'days';
    businessHoursOnly: boolean;
  };
}

export interface TimerData {
  title: string;
  duration: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
  businessHoursOnly?: boolean;
}

export interface EscalationData {
  title: string;
  escalationType: 'manager' | 'supervisor' | 'legal' | 'external';
  threshold: number;
  reason: string;
}

export interface EndData {
  title: string;
  outcome: 'closed' | 'writeoff' | 'legal' | 'dispute' | 'completed';
  reason: string;
}