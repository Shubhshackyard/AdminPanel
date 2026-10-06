import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onOpenReceipt: (order: Order) => void;
  onInspectOrder: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenReceipt,
  onInspectOrder
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'dine_in' | 'takeaway' | 'delivery' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    // Tab filtering
    if (activeTab === 'active' && !(o.status === 'new' || o.status === 'preparing' || o.status === 'ready')) return false;
    if (activeTab === 'dine_in' && o.type !== 'dine_in') return false;
    if (activeTab === 'takeaway' && o.type !== 'takeaway') return false;
    if (activeTab === 'delivery' && o.type !== 'delivery') return false;
    if (activeTab === 'completed' && o.status !== 'completed') return false;
    if (activeTab === 'cancelled' && o.status !== 'cancelled') return false;

    // Search query
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
        o.itemsSummary.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const activeCount = orders.filter(o => o.status === 'new' || o.status === 'preparing' || o.status === 'ready').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const dineInCount = orders.filter(o => o.type === 'dine_in').length;
  const takeawayCount = orders.filter(o => o.type === 'takeaway').length;
  const deliveryCount = orders.filter(o => o.type === 'delivery').length;

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
            Master Orders Queue
          </h1>
          <p className="font-body text-[13px] text-[#d1c5ac]">
            Track, update kitchen dispatch stages, and review customer tickets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1f1f21] border border-[#4e4633] px-3 py-1.5 rounded-[2px] w-72 gap-2">
            <span className="text-[#d1c5ac] text-[14px]">🔍</span>
            <input
              type="text"
              placeholder="Search by ticket #, customer, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-[#e4e2e4] placeholder:text-[#d1c5ac]/70 text-[13px] font-body focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#4e4633] mb-4">
        {[
          { id: 'all', label: 'All Orders', count: orders.length },
          { id: 'active', label: 'Active in Kitchen', count: activeCount, isHot: true },
          { id: 'dine_in', label: 'Dine-In', count: dineInCount },
          { id: 'takeaway', label: 'Takeaway', count: takeawayCount },
          { id: 'delivery', label: 'Delivery', count: deliveryCount },
          { id: 'completed', label: 'Completed', count: completedCount },
          { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-[13px] font-headline uppercase font-bold rounded-[2px] whitespace-nowrap transition-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#f7c61e] text-[#241a00]'
                : 'bg-[#1f1f21] text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[11px] px-1 rounded-[1px] tabular-nums ${
              activeTab === tab.id ? 'bg-[#241a00] text-[#f7c61e]' : 'bg-[#2a2a2c] text-[#d1c5ac]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="w-full bg-[#1f1f21] border border-[#4e4633] rounded-[2px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0e0e10] border-b border-[#4e4633] font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider select-none font-semibold">
                <th className="py-3 px-3">Ticket ID</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Type & Location</th>
                <th className="py-3 px-3">Items Ordered</th>
                <th className="py-3 px-3 text-right">Total</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4e4633] font-body text-[13px] text-[#e4e2e4]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#d1c5ac]">
                    No orders match your current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      onClick={() => onInspectOrder(order)}
                      className="bg-[#1f1f21] hover:bg-[#2a2a2c] transition-none cursor-pointer"
                    >
                      <td className="py-3 px-3 font-headline text-[15px] font-bold text-[#f7c61e] tabular-nums">
                        {order.id}
                      </td>
                      <td className="py-3 px-3 font-headline text-[13px] text-[#d1c5ac] tabular-nums whitespace-nowrap">
                        {order.time}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#e4e2e4]">{order.customerName}</div>
                        {order.customerPhone && (
                          <div className="text-[11px] text-[#d1c5ac] font-mono">{order.customerPhone}</div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-[#d1c5ac] whitespace-nowrap">
                        {order.type === 'dine_in' ? (
                          <span className="font-semibold text-[#e4e2e4]">
                            Dine-In • {order.tableNumber || 'T-01'}
                          </span>
                        ) : order.type === 'takeaway' ? (
                          <span>Takeaway Counter</span>
                        ) : (
                          <span>Delivery ({order.deliveryPartner || 'Store'})</span>
                        )}
                      </td>
                      <td className="py-3 px-3 max-w-[240px] truncate text-[#e4e2e4]" title={order.itemsSummary}>
                        {order.itemsSummary}
                      </td>
                      <td className="py-3 px-3 text-right font-headline text-[16px] text-[#e4e2e4] tabular-nums font-bold">
                        ₨ {order.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] font-headline text-[12px] uppercase tracking-wide font-semibold ${
                          order.status === 'new'
                            ? 'bg-[#f7c61e] text-[#241a00] font-bold'
                            : order.status === 'preparing'
                            ? 'border border-[#f7c61e] text-[#f7c61e]'
                            : order.status === 'ready'
                            ? 'bg-[#e4e2e4] text-[#131315] font-bold'
                            : order.status === 'completed'
                            ? 'border border-[#4e4633] text-[#d1c5ac]'
                            : 'border border-[#ffb4ab] text-[#ffb4ab]'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === 'new' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                              className="h-[28px] px-2.5 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[12px] rounded-[2px] hover:bg-[#ffe6a8] cursor-pointer"
                            >
                              Prep
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                              className="h-[28px] px-2.5 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline font-bold text-[12px] rounded-[2px] hover:bg-[#f7c61e] hover:text-[#241a00] cursor-pointer"
                            >
                              Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                              className="h-[28px] px-2.5 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline font-bold text-[12px] rounded-[2px] hover:bg-[#f7c61e] hover:text-[#241a00] cursor-pointer"
                            >
                              Handover
                            </button>
                          )}
                          <button
                            onClick={() => onOpenReceipt(order)}
                            className="h-[28px] px-2 bg-transparent text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4] hover:bg-[#2a2a2c] font-headline text-[12px] rounded-[2px] cursor-pointer"
                            title="Print thermal receipt"
                          >
                            Receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
