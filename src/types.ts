export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type OrderType = 'dine_in' | 'takeaway' | 'delivery';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string; // e.g. "1048"
  numericId: number;
  time: string; // e.g. "7:42 pm"
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  itemsSummary: string;
  type: OrderType;
  tableNumber?: string;
  deliveryPartner?: string;
  total: number;
  status: OrderStatus;
  paymentMethod?: 'Cash' | 'Card' | 'Online' | 'UPI';
  paid: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
  isPopular?: boolean;
  code: string;
  prepTimeMinutes: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  iconName: string;
  description: string;
}

export interface ComboItem {
  id: string;
  name: string;
  originalPrice: number;
  comboPrice: number;
  itemsIncluded: string[];
  description: string;
  badge?: string;
  inStock: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  threshold: number;
  category: 'Meat' | 'Bakery' | 'Beverages' | 'Sauces & Spices' | 'Packaging';
  status: 'normal' | 'low' | 'critical';
  costPerUnit: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  favoriteItem: string;
  address?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  terminalAssigned: string;
  status: 'active' | 'break' | 'off_duty';
  clockInTime: string;
}

export type ViewScreen = 
  | 'dashboard' 
  | 'orders' 
  | 'new-order' 
  | 'menu-items' 
  | 'categories' 
  | 'combos' 
  | 'customers' 
  | 'reports' 
  | 'inventory' 
  | 'staff' 
  | 'settings';
