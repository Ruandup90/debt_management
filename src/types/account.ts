export interface Account {
  id: string;
  customerId: string;
  customerName: string;
  accountNumber: string;
  contactInfo: ContactInfo;
  originalDebtAmount: number;
  currentBalance: number;
  daysPastDue: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  status: 'active' | 'pending' | 'disputed' | 'closed' | 'legal';
  delinquencyBand: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  debtCategory: string;
  placementDate: string;
  priority: number;
  assignedCollector?: string;
  nextAction?: string;
  lastContactDate: string;
  lastContactMethod?: 'phone' | 'email' | 'sms' | 'whatsapp' | 'letter';
  contactAttempts: number;
  promisesToPay: PromiseToPay[];
  activities: Activity[];
  documents: Document[];
  notes: Note[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PromiseToPay {
  id: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'fulfilled' | 'broken';
  createdAt: string;
  createdBy: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'sms' | 'whatsapp' | 'letter' | 'payment' | 'dispute' | 'note';
  date: string;
  description: string;
  outcome?: string;
  duration?: number;
  createdBy: string;
  metadata?: Record<string, any>;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  category: 'agreement' | 'correspondence' | 'legal' | 'identity' | 'other';
  url: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'general' | 'payment' | 'contact' | 'dispute' | 'legal';
}