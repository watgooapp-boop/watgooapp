export interface Student {
  no: number;
  id: string;
  prefix: string;
  name: string;
  surname: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'individual' | 'group';
}

export interface StudentOrder {
  studentId: string;
  selectedItems: string[]; // Array of OrderItem IDs
  totalAmount: number;
  isPaid: boolean;
  timestamp: string;
}

export type OrderMap = Record<string, StudentOrder>;