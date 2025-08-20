export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'supervisor' | 'collector';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  createdAt: Date;
  permissions: string[];
  department?: string;
  phone?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'accounts' | 'strategies' | 'reports' | 'users' | 'system';
}