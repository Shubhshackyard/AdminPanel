import { useState } from 'react';
import {
  initialOrders,
  initialMenuItems,
  initialCategories,
  initialCombos,
  initialInventory,
  initialCustomers,
  initialStaff
} from './mockData';
import {
  Order,
  OrderStatus,
  MenuItem,
  Category,
  ComboItem,
  InventoryItem,
  Customer,
  StaffMember,
  ViewScreen
} from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ReceiptModal } from './components/ReceiptModal';
import { OrderDetailsModal } from './components/OrderDetailsModal';
import { RestockModal } from './components/RestockModal';
import { LegalModal } from './components/LegalModals';

import { DashboardView } from './views/DashboardView';
import { OrdersView } from './views/OrdersView';
import { PosView } from './views/PosView';
import { MenuItemsView } from './views/MenuItemsView';
import { CategoriesView } from './views/CategoriesView';
import { CombosView } from './views/CombosView';
import { CustomersView } from './views/CustomersView';
import { ReportsView } from './views/ReportsView';
import { InventoryView } from './views/InventoryView';
import { StaffView } from './views/StaffView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('dashboard');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [combos] = useState<ComboItem[]>(initialCombos);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [customers] = useState<Customer[]>(initialCustomers);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [shopStatus, setShopStatus] = useState<'open' | 'busy' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms'
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'Critical Stock: Chicken Leg reached 6 pcs (Threshold 20)',
      time: '7:40 PM',
      type: 'alert' as const,
      read: false
    },
    {
      id: 'n-2',
      title: 'New Online Order #1048 received for Rehan K.',
      time: '7:42 PM',
      type: 'order' as const,
      read: false
    },
    {
      id: 'n-3',
      title: 'Kitchen Dispatch: Average prep time within SLA at 8.4 mins',
      time: '7:30 PM',
      type: 'kds' as const,
      read: false
    }
  ]);

  // Order status transition
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (inspectedOrder && inspectedOrder.id === orderId) {
      setInspectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Place order from POS
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Add notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: `New Ticket ${newOrder.id} (${newOrder.customerName}) placed at Terminal 01`,
        time: 'Just now',
        type: 'order',
        read: false
      },
      ...prev
    ]);
  };

  // Restock inventory item
  const handleConfirmRestock = (itemId: string, addQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = item.currentStock + addQuantity;
          const newStatus =
            newQty <= item.threshold ? 'critical' : newQty <= item.threshold * 1.5 ? 'low' : 'normal';
          return {
            ...item,
            currentStock: newQty,
            status: newStatus
          };
        }
        return item;
      })
    );
  };

  // Menu items actions
  const handleToggleInStock = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const handleSaveMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [item, ...prev];
    });
  };

  // Categories action
  const handleAddCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
  };

  // Staff status toggle
  const handleToggleStaffStatus = (staffId: string) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          const next = s.status === 'active' ? 'break' : 'active';
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  // Notification mark read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Toggle store operating state
  const handleToggleShopStatus = () => {
    setShopStatus((prev) => (prev === 'open' ? 'busy' : prev === 'busy' ? 'closed' : 'open'));
  };

  const pendingCount = orders.filter(
    (o) => o.status === 'new' || o.status === 'preparing' || o.status === 'ready'
  ).length;
  const lowStockCount = inventory.filter((i) => i.status === 'critical').length;

  return (
    <>  
    <div className="bg-[#131315] text-[#e4e2e4] min-h-screen font-body selection:bg-[#f7c61e] selection:text-[#241a00]">
      {/* 1. Fixed Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setSearchQuery('');
        }}
        pendingCount={pendingCount}
        lowStockCount={lowStockCount}
        onOpenTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
        onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
      />

      {/* 2. Content wrapper offset by 232px */}
      <div className="pl-[232px]">
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          shopStatus={shopStatus}
          onToggleShopStatus={handleToggleShopStatus}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />

        {/* Main Content Area */}
        <main className="w-full pt-14 px-4 bg-[#131315] min-h-[calc(100vh-56px)]">
          {currentScreen === 'dashboard' && (
            <DashboardView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenReceipt={(o) => setReceiptOrder(o)}
              onInspectOrder={(o) => setInspectedOrder(o)}
              onOpenRestock={(i) => setRestockItem(i)}
              inventory={inventory}
              searchQuery={searchQuery}
            />
          )}

          {currentScreen === 'orders' && (
            <OrdersView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenReceipt={(o) => setReceiptOrder(o)}
              onInspectOrder={(o) => setInspectedOrder(o)}
            />
          )}

          {currentScreen === 'new-order' && (
            <PosView
              menuItems={menuItems}
              categories={categories}
              onPlaceOrder={handlePlaceOrder}
              onOpenReceipt={(o) => setReceiptOrder(o)}
            />
          )}

          {currentScreen === 'menu-items' && (
            <MenuItemsView
              menuItems={menuItems}
              categories={categories}
              onToggleInStock={handleToggleInStock}
              onSaveItem={handleSaveMenuItem}
            />
          )}

          {currentScreen === 'categories' && (
            <CategoriesView
              categories={categories}
              onAddCategory={handleAddCategory}
            />
          )}

          {currentScreen === 'combos' && (
            <CombosView
              combos={combos}
              onOrderCombo={(combo) => {
                // Switch to POS screen
                setCurrentScreen('new-order');
              }}
            />
          )}

          {currentScreen === 'customers' && (
            <CustomersView
              customers={customers}
              onSelectCustomerForOrder={(customer) => {
                setCurrentScreen('new-order');
              }}
            />
          )}

          {currentScreen === 'reports' && <ReportsView />}

          {currentScreen === 'inventory' && (
            <InventoryView
              inventory={inventory}
              onOpenRestock={(item) => setRestockItem(item)}
            />
          )}

          {currentScreen === 'staff' && (
            <StaffView
              staff={staff}
              onToggleStatus={handleToggleStaffStatus}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              shopStatus={shopStatus}
              onChangeShopStatus={setShopStatus}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ReceiptModal
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />

      <OrderDetailsModal
        order={inspectedOrder}
        onClose={() => setInspectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        onOpenReceipt={(order) => {
          setInspectedOrder(null);
          setReceiptOrder(order);
        }}
      />

      <RestockModal
        item={restockItem}
        onClose={() => setRestockItem(null)}
        onConfirmRestock={handleConfirmRestock}
      />

      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ isOpen: false, type: 'terms' })}
      />
    </div>
    </>
  );
}
