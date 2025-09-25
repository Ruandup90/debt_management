import { CollectionCase, Customer } from '../types/data';

export const mockCustomers: Customer[] = [
  {
    id: 'cust_001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: 'cust_002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0124',
    address: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: 'cust_003',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1-555-0125',
    address: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'cust_004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0126',
    address: '321 Elm St, Houston, TX 77001'
  },
  {
    id: 'cust_005',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '+1-555-0127',
    address: '654 Maple Dr, Phoenix, AZ 85001'
  }
];

export const mockCollectionCases: CollectionCase[] = [
  {
    id: 'case_001',
    customerId: 'cust_001',
    customerName: 'John Smith',
    accountNumber: 'ACC-2024-001',
    originalAmount: 25000,
    outstandingBalance: 18750,
    lastPaymentAmount: 6250,
    lastPaymentDate: '2024-01-15',
    totalDaysInArrears: 45,
    delinquencyState: 'moderate',
    priority: 2,
    nextAction: 'Phone Call - High Priority',
    lastActionedDate: '2024-02-10',
    durationInCollections: 45,
    status: 'active',
    activities: [
      {
        id: 'act_001',
        type: 'call',
        description: 'Called customer, arranged payment plan',
        date: '2024-02-10',
        outcome: 'PTP obtained',
        createdBy: 'Mike Johnson'
      }
    ],
    notes: [
      {
        id: 'note_001',
        content: 'Customer experiencing temporary financial hardship but willing to cooperate',
        createdAt: '2024-02-10',
        createdBy: 'Mike Johnson',
        category: 'contact'
      }
    ],
    documents: []
  },
  {
    id: 'case_002',
    customerId: 'cust_002',
    customerName: 'Sarah Johnson',
    accountNumber: 'ACC-2024-002',
    originalAmount: 15000,
    outstandingBalance: 12800,
    lastPaymentAmount: 2200,
    lastPaymentDate: '2024-01-20',
    totalDaysInArrears: 23,
    delinquencyState: 'early',
    priority: 3,
    nextAction: 'Email Follow-up',
    lastActionedDate: '2024-02-12',
    durationInCollections: 23,
    status: 'active',
    activities: [
      {
        id: 'act_002',
        type: 'email',
        description: 'Sent payment reminder email',
        date: '2024-02-12',
        outcome: 'No response',
        createdBy: 'Lisa Chen'
      }
    ],
    notes: [],
    documents: []
  },
  {
    id: 'case_003',
    customerId: 'cust_003',
    customerName: 'Michael Brown',
    accountNumber: 'ACC-2024-003',
    originalAmount: 8500,
    outstandingBalance: 8500,
    lastPaymentAmount: 0,
    lastPaymentDate: '2023-12-15',
    totalDaysInArrears: 62,
    delinquencyState: 'severe',
    priority: 1,
    nextAction: 'Urgent Phone Call',
    lastActionedDate: '2024-02-08',
    durationInCollections: 62,
    status: 'active',
    activities: [
      {
        id: 'act_003',
        type: 'sms',
        description: 'Sent SMS payment reminder',
        date: '2024-02-08',
        outcome: 'Delivered',
        createdBy: 'David Wilson'
      }
    ],
    notes: [],
    documents: []
  },
  {
    id: 'case_004',
    customerId: 'cust_004',
    customerName: 'Emily Davis',
    accountNumber: 'ACC-2024-004',
    originalAmount: 35000,
    outstandingBalance: 32500,
    lastPaymentAmount: 2500,
    lastPaymentDate: '2024-01-05',
    totalDaysInArrears: 67,
    delinquencyState: 'severe',
    priority: 1,
    nextAction: 'Legal Review',
    lastActionedDate: '2024-02-14',
    durationInCollections: 67,
    status: 'active',
    activities: [
      {
        id: 'act_004',
        type: 'note',
        description: 'Customer disputes debt validity',
        date: '2024-02-14',
        outcome: 'Dispute filed',
        createdBy: 'Alex Rodriguez'
      }
    ],
    notes: [
      {
        id: 'note_004',
        content: 'Customer claims insurance should have covered charges. Requires investigation.',
        createdAt: '2024-02-14',
        createdBy: 'Alex Rodriguez',
        category: 'legal'
      }
    ],
    documents: []
  },
  {
    id: 'case_005',
    customerId: 'cust_005',
    customerName: 'Robert Wilson',
    accountNumber: 'ACC-2024-005',
    originalAmount: 12000,
    outstandingBalance: 8400,
    lastPaymentAmount: 3600,
    lastPaymentDate: '2024-01-25',
    totalDaysInArrears: 34,
    delinquencyState: 'moderate',
    priority: 2,
    nextAction: 'Phone Call - Follow-up',
    lastActionedDate: '2024-02-11',
    durationInCollections: 34,
    status: 'active',
    activities: [
      {
        id: 'act_005',
        type: 'call',
        description: 'Discussed payment options with customer',
        date: '2024-02-11',
        outcome: 'PTP obtained',
        createdBy: 'Jennifer Lee'
      }
    ],
    notes: [],
    documents: []
  }
];

// Generate additional mock cases
for (let i = 6; i <= 20; i++) {
  const randomBalance = Math.floor(Math.random() * 50000) + 5000;
  const randomDaysPastDue = Math.floor(Math.random() * 120) + 1;
  
  const delinquencyStates = ['current', 'early', 'moderate', 'severe', 'critical'] as const;
  const statuses = ['active', 'resolved', 'legal'] as const;
  
  mockCollectionCases.push({
    id: `case_${i.toString().padStart(3, '0')}`,
    customerId: `cust_${i.toString().padStart(3, '0')}`,
    customerName: `Customer ${i}`,
    accountNumber: `ACC-2024-${i.toString().padStart(3, '0')}`,
    originalAmount: randomBalance + Math.floor(Math.random() * 10000),
    outstandingBalance: randomBalance,
    lastPaymentAmount: Math.floor(Math.random() * 5000),
    lastPaymentDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalDaysInArrears: randomDaysPastDue,
    delinquencyState: delinquencyStates[Math.floor(Math.random() * delinquencyStates.length)],
    priority: Math.floor(Math.random() * 5) + 1,
    nextAction: Math.random() > 0.5 ? 'Phone Call' : 'Email Follow-up',
    lastActionedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    durationInCollections: randomDaysPastDue,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    activities: [],
    notes: [],
    documents: []
  });
}