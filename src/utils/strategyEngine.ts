import { CollectionCase } from '../types/data';

export interface StrategyRule {
  id: string;
  name: string;
  condition: (collectionCase: CollectionCase) => boolean;
  priority: number;
  nextAction: string;
}

// Define collection strategy rules
export const strategyRules: StrategyRule[] = [
  {
    id: 'rule_001',
    name: 'High Value Critical',
    condition: (c) => c.outstandingBalance > 500000 && c.totalDaysInArrears > 60,
    priority: 1,
    nextAction: 'Urgent Legal Review'
  },
  {
    id: 'rule_002',
    name: 'High Value Severe',
    condition: (c) => c.outstandingBalance > 500000 && c.totalDaysInArrears > 30,
    priority: 1,
    nextAction: 'Senior Collector Call'
  },
  {
    id: 'rule_003',
    name: 'High Value Early',
    condition: (c) => c.outstandingBalance > 500000,
    priority: 1,
    nextAction: 'Priority Phone Call'
  },
  {
    id: 'rule_004',
    name: 'Medium Value Critical',
    condition: (c) => c.outstandingBalance > 100000 && c.totalDaysInArrears > 90,
    priority: 1,
    nextAction: 'Legal Review'
  },
  {
    id: 'rule_005',
    name: 'Medium Value Severe',
    condition: (c) => c.outstandingBalance > 100000 && c.totalDaysInArrears > 60,
    priority: 2,
    nextAction: 'Urgent Phone Call'
  },
  {
    id: 'rule_006',
    name: 'Medium Value Moderate',
    condition: (c) => c.outstandingBalance > 100000 && c.totalDaysInArrears > 30,
    priority: 2,
    nextAction: 'Phone Call - High Priority'
  },
  {
    id: 'rule_007',
    name: 'Medium Value Early',
    condition: (c) => c.outstandingBalance > 100000,
    priority: 3,
    nextAction: 'Phone Call'
  },
  {
    id: 'rule_008',
    name: 'Low Value Critical',
    condition: (c) => c.outstandingBalance > 10000 && c.totalDaysInArrears > 120,
    priority: 2,
    nextAction: 'Final Notice Letter'
  },
  {
    id: 'rule_009',
    name: 'Low Value Severe',
    condition: (c) => c.outstandingBalance > 10000 && c.totalDaysInArrears > 90,
    priority: 3,
    nextAction: 'Phone Call'
  },
  {
    id: 'rule_010',
    name: 'Low Value Moderate',
    condition: (c) => c.outstandingBalance > 10000 && c.totalDaysInArrears > 60,
    priority: 3,
    nextAction: 'Email Follow-up'
  },
  {
    id: 'rule_011',
    name: 'Low Value Early',
    condition: (c) => c.outstandingBalance > 10000 && c.totalDaysInArrears > 30,
    priority: 4,
    nextAction: 'Email Reminder'
  },
  {
    id: 'rule_012',
    name: 'Very Low Value',
    condition: (c) => c.outstandingBalance <= 10000 && c.totalDaysInArrears > 90,
    priority: 4,
    nextAction: 'SMS Reminder'
  },
  {
    id: 'rule_013',
    name: 'Default Action',
    condition: () => true, // Catch-all rule
    priority: 5,
    nextAction: 'Review Required'
  }
];

export function applyCollectionStrategy(collectionCase: CollectionCase): CollectionCase {
  // Find the first matching rule
  const matchingRule = strategyRules.find(rule => rule.condition(collectionCase));
  
  if (matchingRule) {
    return {
      ...collectionCase,
      priority: matchingRule.priority,
      nextAction: matchingRule.nextAction,
      delinquencyState: getDelinquencyState(collectionCase.totalDaysInArrears)
    };
  }
  
  return collectionCase;
}

export function applyStrategyToAllCases(cases: CollectionCase[]): CollectionCase[] {
  return cases.map(applyCollectionStrategy);
}

function getDelinquencyState(daysInArrears: number): CollectionCase['delinquencyState'] {
  if (daysInArrears <= 0) return 'current';
  if (daysInArrears <= 30) return 'early';
  if (daysInArrears <= 60) return 'moderate';
  if (daysInArrears <= 90) return 'severe';
  return 'critical';
}