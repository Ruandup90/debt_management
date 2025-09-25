export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CollectionCase {
  id: string;
  customerId: string;
  customerName: string;
  accountNumber: string;
  originalAmount: number;
  outstandingBalance: number;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  totalDaysInArrears: number;
  delinquencyState: 'current' | 'early' | 'moderate' | 'severe' | 'critical';
  priority: number; // 1 = highest, 5 = lowest
  nextAction: string;
  lastActionedDate: string;
  durationInCollections: number; // days
  status: 'active' | 'resolved' | 'legal' | 'written-off';
  activities: Activity[];
  notes: Note[];
  documents: Document[];
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'sms' | 'payment' | 'note' | 'document';
  description: string;
  date: string;
  outcome?: string;
  createdBy: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  category: 'general' | 'payment' | 'contact' | 'legal';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  url: string;
}

export interface ImportData {
  accountNumber: string;
  outstandingBalance?: number;
  lastPaymentAmount?: number;
  lastPaymentDate?: string;
  totalDaysInArrears?: number;
}