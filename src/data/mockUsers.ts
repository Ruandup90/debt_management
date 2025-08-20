import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@debtflow.com',
    name: 'John Administrator',
    role: 'admin',
    status: 'active',
    lastLogin: new Date('2024-02-15T09:30:00'),
    createdAt: new Date('2024-01-01T00:00:00'),
    permissions: ['all'],
    department: 'IT',
    phone: '+1-555-0001'
  },
  {
    id: '2',
    email: 'sarah.manager@debtflow.com',
    name: 'Sarah Manager',
    role: 'manager',
    status: 'active',
    lastLogin: new Date('2024-02-15T08:45:00'),
    createdAt: new Date('2024-01-02T00:00:00'),
    permissions: ['view_reports', 'manage_strategies', 'view_accounts'],
    department: 'Collections',
    phone: '+1-555-0002'
  },
  {
    id: '3',
    email: 'mike.collector@debtflow.com',
    name: 'Mike Johnson',
    role: 'collector',
    status: 'active',
    lastLogin: new Date('2024-02-15T10:15:00'),
    createdAt: new Date('2024-01-03T00:00:00'),
    permissions: ['view_accounts', 'update_accounts', 'create_activities'],
    department: 'Collections',
    phone: '+1-555-0003'
  },
  {
    id: '4',
    email: 'lisa.collector@debtflow.com',
    name: 'Lisa Chen',
    role: 'collector',
    status: 'active',
    lastLogin: new Date('2024-02-15T09:00:00'),
    createdAt: new Date('2024-01-04T00:00:00'),
    permissions: ['view_accounts', 'update_accounts', 'create_activities'],
    department: 'Collections',
    phone: '+1-555-0004'
  },
  {
    id: '5',
    email: 'david.supervisor@debtflow.com',
    name: 'David Wilson',
    role: 'supervisor',
    status: 'active',
    lastLogin: new Date('2024-02-14T16:30:00'),
    createdAt: new Date('2024-01-05T00:00:00'),
    permissions: ['view_reports', 'manage_team', 'view_accounts'],
    department: 'Collections',
    phone: '+1-555-0005'
  },
  {
    id: '6',
    email: 'alex.collector@debtflow.com',
    name: 'Alex Rodriguez',
    role: 'collector',
    status: 'active',
    lastLogin: new Date('2024-02-15T11:20:00'),
    createdAt: new Date('2024-01-06T00:00:00'),
    permissions: ['view_accounts', 'update_accounts', 'create_activities'],
    department: 'Collections',
    phone: '+1-555-0006'
  },
  {
    id: '7',
    email: 'jennifer.collector@debtflow.com',
    name: 'Jennifer Lee',
    role: 'collector',
    status: 'active',
    lastLogin: new Date('2024-02-15T08:30:00'),
    createdAt: new Date('2024-01-07T00:00:00'),
    permissions: ['view_accounts', 'update_accounts', 'create_activities'],
    department: 'Collections',
    phone: '+1-555-0007'
  },
  {
    id: '8',
    email: 'tom.collector@debtflow.com',
    name: 'Tom Anderson',
    role: 'collector',
    status: 'inactive',
    lastLogin: new Date('2024-02-10T15:45:00'),
    createdAt: new Date('2024-01-08T00:00:00'),
    permissions: ['view_accounts', 'update_accounts', 'create_activities'],
    department: 'Collections',
    phone: '+1-555-0008'
  }
];