import { Account } from '../types/account';

export const mockAccounts: Account[] = [
  {
    id: 'acc_001',
    customerId: 'CUST_12345',
    customerName: 'John Smith',
    accountNumber: 'ACC-2024-001',
    contactInfo: {
      phone: '+1-555-0123',
      email: 'john.smith@email.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    originalDebtAmount: 25000,
    currentBalance: 18750,
    daysPastDue: 45,
    lastPaymentDate: '2024-01-15',
    lastPaymentAmount: 6250,
    status: 'active',
    delinquencyBand: 'D',
    debtCategory: 'Credit Card',
    placementDate: '2024-01-01',
    priority: 8,
    assignedCollector: 'Mike Johnson',
    nextAction: 'Phone Call - High Priority',
    lastContactDate: '2024-02-10',
    lastContactMethod: 'phone',
    contactAttempts: 3,
    promisesToPay: [
      {
        id: 'ptp_001',
        amount: 5000,
        dueDate: '2024-03-01',
        status: 'pending',
        createdAt: '2024-02-15',
        createdBy: 'Mike Johnson'
      }
    ],
    activities: [
      {
        id: 'act_001',
        type: 'call',
        date: '2024-02-10',
        description: 'Called customer, arranged payment plan',
        outcome: 'PTP obtained',
        duration: 8,
        createdBy: 'Mike Johnson'
      }
    ],
    documents: [],
    notes: [
      {
        id: 'note_001',
        content: 'Customer experiencing temporary financial hardship but willing to cooperate',
        createdAt: '2024-02-10',
        createdBy: 'Mike Johnson',
        type: 'contact'
      }
    ]
  },
  {
    id: 'acc_002',
    customerId: 'CUST_12346',
    customerName: 'Sarah Johnson',
    accountNumber: 'ACC-2024-002',
    contactInfo: {
      phone: '+1-555-0124',
      email: 'sarah.johnson@email.com',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      }
    },
    originalDebtAmount: 15000,
    currentBalance: 12800,
    daysPastDue: 23,
    lastPaymentDate: '2024-01-20',
    lastPaymentAmount: 2200,
    status: 'active',
    delinquencyBand: 'C',
    debtCategory: 'Personal Loan',
    placementDate: '2024-01-05',
    priority: 6,
    assignedCollector: 'Lisa Chen',
    nextAction: 'Email Follow-up',
    lastContactDate: '2024-02-12',
    lastContactMethod: 'email',
    contactAttempts: 2,
    promisesToPay: [],
    activities: [
      {
        id: 'act_002',
        type: 'email',
        date: '2024-02-12',
        description: 'Sent payment reminder email',
        outcome: 'No response',
        createdBy: 'Lisa Chen'
      }
    ],
    documents: [],
    notes: []
  },
  {
    id: 'acc_003',
    customerId: 'CUST_12347',
    customerName: 'Michael Brown',
    accountNumber: 'ACC-2024-003',
    contactInfo: {
      phone: '+1-555-0125',
      email: 'michael.brown@email.com',
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      }
    },
    originalDebtAmount: 8500,
    currentBalance: 8500,
    daysPastDue: 12,
    lastPaymentDate: '2023-12-15',
    lastPaymentAmount: 0,
    status: 'active',
    delinquencyBand: 'C',
    debtCategory: 'Utility Bill',
    placementDate: '2024-01-10',
    priority: 4,
    assignedCollector: 'David Wilson',
    nextAction: 'SMS Reminder',
    lastContactDate: '2024-02-08',
    lastContactMethod: 'sms',
    contactAttempts: 1,
    promisesToPay: [],
    activities: [
      {
        id: 'act_003',
        type: 'sms',
        date: '2024-02-08',
        description: 'Sent SMS payment reminder',
        outcome: 'Delivered',
        createdBy: 'David Wilson'
      }
    ],
    documents: [],
    notes: []
  },
  {
    id: 'acc_004',
    customerId: 'CUST_12348',
    customerName: 'Emily Davis',
    accountNumber: 'ACC-2024-004',
    contactInfo: {
      phone: '+1-555-0126',
      email: 'emily.davis@email.com',
      address: {
        street: '321 Elm St',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001',
        country: 'USA'
      }
    },
    originalDebtAmount: 35000,
    currentBalance: 32500,
    daysPastDue: 67,
    lastPaymentDate: '2024-01-05',
    lastPaymentAmount: 2500,
    status: 'disputed',
    delinquencyBand: 'E',
    debtCategory: 'Medical Bill',
    placementDate: '2023-12-20',
    priority: 9,
    assignedCollector: 'Alex Rodriguez',
    nextAction: 'Legal Review',
    lastContactDate: '2024-02-14',
    lastContactMethod: 'phone',
    contactAttempts: 5,
    promisesToPay: [],
    activities: [
      {
        id: 'act_004',
        type: 'dispute',
        date: '2024-02-14',
        description: 'Customer disputes debt validity',
        outcome: 'Dispute filed',
        createdBy: 'Alex Rodriguez'
      }
    ],
    documents: [],
    notes: [
      {
        id: 'note_004',
        content: 'Customer claims insurance should have covered charges. Requires investigation.',
        createdAt: '2024-02-14',
        createdBy: 'Alex Rodriguez',
        type: 'dispute'
      }
    ]
  },
  {
    id: 'acc_005',
    customerId: 'CUST_12349',
    customerName: 'Robert Wilson',
    accountNumber: 'ACC-2024-005',
    contactInfo: {
      phone: '+1-555-0127',
      email: 'robert.wilson@email.com',
      address: {
        street: '654 Maple Dr',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001',
        country: 'USA'
      }
    },
    originalDebtAmount: 12000,
    currentBalance: 8400,
    daysPastDue: 34,
    lastPaymentDate: '2024-01-25',
    lastPaymentAmount: 3600,
    status: 'active',
    delinquencyBand: 'D',
    debtCategory: 'Auto Loan',
    placementDate: '2024-01-08',
    priority: 7,
    assignedCollector: 'Jennifer Lee',
    nextAction: 'Phone Call - Follow-up',
    lastContactDate: '2024-02-11',
    lastContactMethod: 'phone',
    contactAttempts: 2,
    promisesToPay: [
      {
        id: 'ptp_005',
        amount: 2000,
        dueDate: '2024-02-28',
        status: 'pending',
        createdAt: '2024-02-11',
        createdBy: 'Jennifer Lee'
      }
    ],
    activities: [
      {
        id: 'act_005',
        type: 'call',
        date: '2024-02-11',
        description: 'Discussed payment options with customer',
        outcome: 'PTP obtained',
        duration: 12,
        createdBy: 'Jennifer Lee'
      }
    ],
    documents: [],
    notes: []
  }
];

// Generate additional mock accounts
for (let i = 6; i <= 50; i++) {
  const randomBalance = Math.floor(Math.random() * 50000) + 5000;
  const randomDaysPastDue = Math.floor(Math.random() * 120) + 1;
  const randomPriority = Math.floor(Math.random() * 10) + 1;
  
  const bands = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
  const statuses = ['active', 'pending', 'disputed', 'closed'] as const;
  const categories = ['Credit Card', 'Personal Loan', 'Utility Bill', 'Medical Bill', 'Auto Loan', 'Mortgage'];
  const collectors = ['Mike Johnson', 'Lisa Chen', 'David Wilson', 'Alex Rodriguez', 'Jennifer Lee', 'Tom Anderson'];

  mockAccounts.push({
    id: `acc_${i.toString().padStart(3, '0')}`,
    customerId: `CUST_${12344 + i}`,
    customerName: `Customer ${i}`,
    accountNumber: `ACC-2024-${i.toString().padStart(3, '0')}`,
    contactInfo: {
      phone: `+1-555-${(100 + i).toString().padStart(4, '0')}`,
      email: `customer${i}@email.com`,
      address: {
        street: `${i} Test St`,
        city: 'Test City',
        state: 'TX',
        zipCode: '12345',
        country: 'USA'
      }
    },
    originalDebtAmount: randomBalance + Math.floor(Math.random() * 10000),
    currentBalance: randomBalance,
    daysPastDue: randomDaysPastDue,
    lastPaymentDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastPaymentAmount: Math.floor(Math.random() * 5000),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    delinquencyBand: bands[Math.floor(Math.random() * bands.length)],
    debtCategory: categories[Math.floor(Math.random() * categories.length)],
    placementDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: randomPriority,
    assignedCollector: collectors[Math.floor(Math.random() * collectors.length)],
    nextAction: Math.random() > 0.5 ? 'Phone Call' : 'Email Follow-up',
    lastContactDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastContactMethod: ['phone', 'email', 'sms'][Math.floor(Math.random() * 3)] as any,
    contactAttempts: Math.floor(Math.random() * 5) + 1,
    promisesToPay: [],
    activities: [],
    documents: [],
    notes: []
  });
}