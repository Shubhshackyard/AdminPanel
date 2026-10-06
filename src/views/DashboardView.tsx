import React, { useState } from 'react';
import { Order, OrderStatus, InventoryItem } from '../types';

interface DashboardViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onOpenReceipt: (order: Order) => void;
  onInspectOrder: (order: Order) => void;
  onOpenRestock: (item: InventoryItem) => void;
  inventory: InventoryItem[];
  searchQuery: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenReceipt,
  onInspectOrder,
  onOpenRestock,
  inventory,
  searchQuery
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string | null>('Sun');

  // Filter orders based on search query
  const filteredOrders = orders.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.itemsSummary.toLowerCase().includes(q) ||
      o.type.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const displayedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const activeOrdersCount = orders.filter((o) => o.status === 'new' || o.status === 'preparing' || o.status === 'ready').length;
  const pendingInKitchen = orders.filter((o) => o.status === 'preparing').length;
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  const lowStockItems = inventory.filter((i) => i.status === 'critical' || i.status === 'low').slice(0, 3);

  // Sales data
  const weeklySales = [
    { day: 'Mon', amount: '34.8k', value: 34800, height: '56%' },
    { day: 'Tue', amount: '38.2k', value: 38200, height: '62%' },
    { day: 'Wed', amount: '36.0k', value: 36000, height: '58%' },
    { day: 'Thu', amount: '41.5k', value: 41500, height: '67%' },
    { day: 'Fri', amount: '48.9k', value: 48900, height: '79%' },
    { day: 'Sat', amount: '51.8k', value: 51800, height: '84%' },
    { day: 'Sun', amount: '61.2k', value: 61200, height: '100%', isPeak: true }
  ];

  const topSellers = [
    { rank: '01', name: 'Chicken Crispy', orders: '84 orders dispatched', revenue: '₨ 8,820', isPrimary: true },
    { rank: '02', name: 'Combo Meal', orders: '68 orders dispatched', revenue: '₨ 13,600', isPrimary: true },
    { rank: '03', name: 'Chicken Wings', orders: '52 orders dispatched', revenue: '₨ 5,200', isPrimary: false },
    { rank: '04', name: 'Chicken Burger', orders: '46 orders dispatched', revenue: '₨ 2,760', isPrimary: false },
    { rank: '05', name: 'French Fries', orders: '42 orders dispatched', revenue: '₨ 1,260', isPrimary: false }
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Section: Metric Bar (Single continuous planar frame divided by 1px hairlines) */}
      <section className="w-full bg-[#1f1f21] border border-[#4e4633] rounded-[2px] mt-3 mb-4 flex flex-col md:flex-row">
        {/* Metric 1: Orders Today */}
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-[#4e4633] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider font-semibold">
              Orders today
            </span>
            <span className="w-2 h-2 rounded-[1px] bg-[#f7c61e] inline-block"></span>
          </div>
          <div>
            <div className="font-headline text-[40px] text-[#f7c61e] leading-none tabular-nums font-bold">
              148
            </div>
            <p className="font-body text-[12px] text-[#d1c5ac] mt-1">
              Dine-in 64, Takeaway 52, Delivery 32
            </p>
          </div>
        </div>

        {/* Metric 2: Revenue */}
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-[#4e4633] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider font-semibold">
              Revenue (PKR)
            </span>
            <span className="font-headline text-[13px] text-[#f7c61e] font-semibold tracking-wider tabular-nums">
              85.7%
            </span>
          </div>
          <div>
            <div className="font-headline text-[40px] text-[#f7c61e] leading-none tabular-nums font-bold">
              ₨ 42,850
            </div>
            <p className="font-body text-[12px] text-[#d1c5ac] mt-1">
              Target ₨ 50,000, 85.7% reached
            </p>
          </div>
        </div>

        {/* Metric 3: Pending */}
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-[#4e4633] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider font-semibold">
              Pending
            </span>
            <span className="w-2 h-2 rounded-[1px] bg-[#e4e2e4] inline-block"></span>
          </div>
          <div>
            <div className="font-headline text-[40px] text-[#e4e2e4] leading-none tabular-nums font-bold">
              {activeOrdersCount} orders
            </div>
            <p className="font-body text-[12px] text-[#d1c5ac] mt-1">
              {newOrdersCount} New, {pendingInKitchen} In kitchen
            </p>
          </div>
        </div>

        {/* Metric 4: Average Order Value */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider font-semibold">
              Average order value
            </span>
            <span className="font-headline text-[13px] text-[#d1c5ac] font-semibold">
              POS / WEB
            </span>
          </div>
          <div>
            <div className="font-headline text-[40px] text-[#e4e2e4] leading-none tabular-nums font-bold">
              ₨ 289.50
            </div>
            <p className="font-body text-[12px] text-[#d1c5ac] mt-1">
              Highest combo ticket: ₨ 1,420
            </p>
          </div>
        </div>
      </section>

      {/* Main Body Grid: 68% Left Dominant / 32% Right Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (Dominant: 8 of 12 columns) */}
        <div className="lg:col-span-8 flex flex-col bg-[#1f1f21] border border-[#4e4633] rounded-[2px] overflow-hidden">
          {/* Section Header */}
          <div className="h-14 px-4 border-b border-[#4e4633] flex items-center justify-between bg-[#1b1b1d]">
            <div className="flex items-center gap-3">
              <h2 className="font-headline text-[20px] font-bold text-[#e4e2e4] tracking-wide">
                Live orders
              </h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-[#f7c61e] bg-[#2a2a2c] rounded-[2px]">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#f7c61e]"></span>
                <span className="font-headline text-[12px] text-[#f7c61e] font-semibold uppercase tracking-wider">
                  {activeOrdersCount} active
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#d1c5ac] font-body text-[11px] uppercase tracking-wider">
              <span>Auto-refresh: 10s</span>
              <span className="text-[#4e4633]">/</span>
              <span>Station 01</span>
            </div>
          </div>

          {/* Live Orders Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0e0e10] border-b border-[#4e4633] font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider select-none font-semibold">
                  <th className="py-3 px-3 font-semibold">Order ID</th>
                  <th className="py-3 px-3 font-semibold">Time</th>
                  <th className="py-3 px-3 font-semibold">Customer</th>
                  <th className="py-3 px-3 font-semibold">Items summary</th>
                  <th className="py-3 px-3 font-semibold">Type</th>
                  <th className="py-3 px-3 font-semibold text-right">Total</th>
                  <th className="py-3 px-3 font-semibold text-center">Status</th>
                  <th className="py-3 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4e4633] font-body text-[12px] text-[#e4e2e4]">
                {displayedOrders.map((order) => {
                  const isNew = order.status === 'new';
                  const isPreparing = order.status === 'preparing';
                  const isReady = order.status === 'ready';
                  const isCompleted = order.status === 'completed';
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <tr
                      key={order.id}
                      onClick={() => onInspectOrder(order)}
                      className="bg-[#1f1f21] hover:bg-[#2a2a2c] transition-none cursor-pointer"
                    >
                      {/* Order ID */}
                      <td className={`py-3 px-3 font-headline text-[15px] font-bold tabular-nums ${
                        isCancelled ? 'text-[#ffb4ab]' : isCompleted ? 'text-[#c7c6ca]' : 'text-[#f7c61e]'
                      }`}>
                        {order.id}
                      </td>

                      {/* Time */}
                      <td className="py-3 px-3 font-headline text-[13px] text-[#d1c5ac] tabular-nums whitespace-nowrap">
                        {order.time}
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-3 font-semibold text-[#e4e2e4] whitespace-nowrap">
                        {order.customerName}
                      </td>

                      {/* Items Summary */}
                      <td className={`py-3 px-3 max-w-[200px] truncate ${isCompleted || isCancelled ? 'text-[#d1c5ac]' : 'text-[#e4e2e4]'}`} title={order.itemsSummary}>
                        {order.itemsSummary}
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 font-medium text-[#d1c5ac] whitespace-nowrap">
                        {order.type === 'dine_in' ? (
                          <>Dine-in <span className="text-[#e4e2e4] font-headline font-semibold">({order.tableNumber || 'T-01'})</span></>
                        ) : order.type === 'takeaway' ? (
                          'Takeaway'
                        ) : (
                          <>Delivery {order.deliveryPartner && <span className="text-[#d1c5ac] text-[11px]">({order.deliveryPartner})</span>}</>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-3 px-3 font-headline text-[15px] text-right text-[#e4e2e4] tabular-nums whitespace-nowrap font-semibold">
                        ₨ {order.total.toFixed(2)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        {isNew && (
                          <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] bg-[#f7c61e] text-[#241a00] font-headline text-[12px] uppercase tracking-wide font-bold">
                            New
                          </span>
                        )}
                        {isPreparing && (
                          <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] border border-[#f7c61e] text-[#f7c61e] font-headline text-[12px] uppercase tracking-wide font-semibold">
                            Preparing
                          </span>
                        )}
                        {isReady && (
                          <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] bg-[#e4e2e4] text-[#131315] font-headline text-[12px] uppercase tracking-wide font-bold">
                            Ready
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] border border-[#4e4633] text-[#d1c5ac] font-headline text-[12px] uppercase tracking-wide">
                            Completed
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] border border-[#ffb4ab] text-[#ffb4ab] font-headline text-[12px] uppercase tracking-wide">
                            Cancelled
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        {isNew && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                            className="h-[28px] px-2.5 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[13px] rounded-[2px] border-none hover:bg-[#ffe6a8] transition-none cursor-pointer"
                          >
                            Start prep
                          </button>
                        )}
                        {isPreparing && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                            className="h-[28px] px-2.5 bg-[#353437] text-[#e4e2e4] font-headline font-semibold text-[13px] rounded-[2px] border border-[#4e4633] hover:bg-[#f7c61e] hover:text-[#241a00] transition-none cursor-pointer"
                          >
                            Mark ready
                          </button>
                        )}
                        {isReady && (
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                            className="h-[28px] px-2.5 bg-[#353437] text-[#e4e2e4] font-headline font-semibold text-[13px] rounded-[2px] border border-[#4e4633] hover:bg-[#f7c61e] hover:text-[#241a00] transition-none cursor-pointer"
                          >
                            Handover
                          </button>
                        )}
                        {isCompleted && (
                          <button
                            onClick={() => onOpenReceipt(order)}
                            className="h-[28px] px-2.5 bg-transparent text-[#d1c5ac] font-headline font-semibold text-[13px] rounded-[2px] border border-[#4e4633] hover:bg-[#2a2a2c] hover:text-[#e4e2e4] transition-none cursor-pointer"
                          >
                            Receipt
                          </button>
                        )}
                        {isCancelled && (
                          <button
                            onClick={() => onInspectOrder(order)}
                            className="h-[28px] px-2.5 bg-transparent text-[#d1c5ac] font-headline font-semibold text-[13px] rounded-[2px] border border-[#4e4633] hover:bg-[#2a2a2c] hover:text-[#e4e2e4] transition-none cursor-pointer"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Status Summary */}
          <div className="h-10 px-4 bg-[#0e0e10] border-t border-[#4e4633] flex items-center justify-between text-[#d1c5ac] font-body text-[11px]">
            <div className="flex items-center gap-3">
              <span>Showing {displayedOrders.length} of {orders.length} orders</span>
              <span className="text-[#4e4633]">•</span>
              <span className="text-[#e4e2e4]">Average Kitchen Prep: 8.4 mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-2 py-0.5 border border-[#4e4633] rounded-[2px] hover:bg-[#1f1f21] text-[#e4e2e4] font-headline text-[12px] font-semibold disabled:opacity-40 cursor-pointer"
              >
                PREV
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-2 py-0.5 border rounded-[2px] font-headline text-[12px] font-bold cursor-pointer ${
                    currentPage === pg
                      ? 'border-[#4e4633] bg-[#2a2a2c] text-[#f7c61e]'
                      : 'border-[#4e4633] hover:bg-[#1f1f21] text-[#e4e2e4]'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-2 py-0.5 border border-[#4e4633] rounded-[2px] hover:bg-[#1f1f21] text-[#e4e2e4] font-headline text-[12px] font-semibold disabled:opacity-40 cursor-pointer"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 of 12 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Sales, last 7 days */}
          <div className="bg-[#1f1f21] border border-[#4e4633] rounded-[2px] p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3 pb-2 border-b border-[#4e4633]">
              <div>
                <h3 className="font-headline text-[16px] text-[#e4e2e4] uppercase tracking-wider font-bold">
                  Sales: last 7 days
                </h3>
                <span className="font-body text-[11px] text-[#d1c5ac]">
                  Rolling weekly throughput
                </span>
              </div>
              <div className="text-right">
                <span className="font-headline text-[24px] text-[#f7c61e] font-bold tabular-nums leading-none block">
                  ₨ 312,400
                </span>
                <span className="font-headline text-[12px] text-[#d1c5ac] uppercase tracking-wider">
                  Gross Total
                </span>
              </div>
            </div>

            {/* Flat CSS Bar Chart (Zero shadow, zero gradient, gold fill) */}
            <div className="w-full flex items-end justify-between gap-2 h-44 pt-6 px-1">
              {weeklySales.map((s) => {
                const isSelected = selectedDay === s.day;
                return (
                  <div
                    key={s.day}
                    onClick={() => setSelectedDay(s.day)}
                    className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                    title={`${s.day}: ₨ ${s.value.toLocaleString()}`}
                  >
                    <span className={`font-headline text-[10px] mb-1 tabular-nums transition-none ${
                      s.isPeak || isSelected ? 'text-[#f7c61e] font-bold' : 'text-[#d1c5ac]'
                    }`}>
                      {s.amount}
                    </span>
                    <div
                      className={`w-full rounded-[1px] transition-colors ${
                        isSelected
                          ? 'bg-[#f7c61e] ring-1 ring-[#ffe6a8]'
                          : s.isPeak
                          ? 'bg-[#f7c61e]'
                          : 'bg-[#f7c61e]/90 group-hover:bg-[#f7c61e]'
                      }`}
                      style={{ height: s.height }}
                    />
                    <span className={`font-headline text-[12px] mt-2 uppercase transition-none ${
                      s.isPeak || isSelected ? 'text-[#f7c61e] font-bold' : 'text-[#d1c5ac]'
                    }`}>
                      {s.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Top sellers today */}
          <div className="bg-[#1f1f21] border border-[#4e4633] rounded-[2px] p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#4e4633]">
              <h3 className="font-headline text-[16px] text-[#e4e2e4] uppercase tracking-wider font-bold">
                Top sellers today
              </h3>
              <span className="font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider">
                By volume
              </span>
            </div>
            <div className="flex flex-col divide-y divide-[#4e4633]">
              {topSellers.map((item) => (
                <div key={item.rank} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`font-headline text-[13px] font-bold w-4 ${
                      item.isPrimary ? 'text-[#f7c61e]' : 'text-[#d1c5ac]'
                    }`}>
                      {item.rank}
                    </span>
                    <div className="flex flex-col truncate">
                      <span className="font-body text-[14px] text-[#e4e2e4] truncate font-semibold">
                        {item.name}
                      </span>
                      <span className="font-body text-[11px] text-[#d1c5ac]">
                        {item.orders}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`font-headline text-[16px] tabular-nums font-bold ${
                      item.isPrimary ? 'text-[#f7c61e]' : 'text-[#e4e2e4]'
                    }`}>
                      {item.revenue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Low stock alerts */}
          <div className="bg-[#1f1f21] border border-[#4e4633] rounded-[2px] p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#4e4633]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffb4ab] inline-block rounded-[1px]"></span>
                <h3 className="font-headline text-[16px] text-[#e4e2e4] uppercase tracking-wider font-bold">
                  Low stock items ({lowStockItems.length})
                </h3>
              </div>
              <span className="font-body text-[11px] text-[#ffb4ab] font-bold uppercase tracking-wider">
                Critical
              </span>
            </div>
            <div className="flex flex-col divide-y divide-[#4e4633]">
              {lowStockItems.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex flex-col min-w-0">
                    <span className="font-body text-[14px] text-[#e4e2e4] font-semibold truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-headline text-[13px] text-[#ffb4ab] font-bold">
                        {item.currentStock} {item.unit}
                      </span>
                      <span className="text-[#4e4633] font-body text-[11px]">/</span>
                      <span className="font-body text-[11px] text-[#d1c5ac]">
                        Threshold {item.threshold} {item.unit.replace(' left', '')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenRestock(item)}
                    className="h-[28px] px-2.5 bg-[#353437] text-[#e4e2e4] font-headline font-semibold text-[13px] rounded-[2px] border border-[#4e4633] hover:bg-[#f7c61e] hover:text-[#241a00] transition-none flex-shrink-0 cursor-pointer"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
