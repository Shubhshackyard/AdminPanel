import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onOpenReceipt: (order: Order) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
  onOpenReceipt
}) => {
  if (!order) return null;

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);

  const statuses: { id: OrderStatus; label: string; color: string }[] = [
    { id: 'new', label: 'New', color: 'bg-[#f7c61e] text-[#241a00]' },
    { id: 'preparing', label: 'Preparing', color: 'border border-[#f7c61e] text-[#f7c61e]' },
    { id: 'ready', label: 'Ready', color: 'bg-[#e4e2e4] text-[#131315]' },
    { id: 'completed', label: 'Completed', color: 'border border-[#4e4633] text-[#d1c5ac]' },
    { id: 'cancelled', label: 'Cancelled', color: 'border border-[#ffb4ab] text-[#ffb4ab]' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4">
      <div className="w-full max-w-lg bg-[#1f1f21] border border-[#f7c61e] p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
          <div className="flex items-center gap-3">
            <span className="font-headline text-[22px] font-bold text-[#f7c61e]">
              Order {order.id}
            </span>
            <span className="font-body text-[13px] text-[#d1c5ac] px-2 py-0.5 bg-[#2a2a2c] rounded-[2px] uppercase">
              {order.type.replace('_', ' ')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-3 bg-[#1b1b1d] p-3 border border-[#4e4633] rounded-[2px]">
            <div>
              <div className="text-[11px] text-[#d1c5ac] uppercase font-body">Customer</div>
              <div className="text-[15px] font-semibold text-[#e4e2e4] font-body">{order.customerName}</div>
              <div className="text-[12px] text-[#9a9079] font-mono">{order.customerPhone || 'Walk-in'}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#d1c5ac] uppercase font-body">Timestamp & Station</div>
              <div className="text-[14px] text-[#e4e2e4] font-headline tabular-nums">{order.time}</div>
              <div className="text-[12px] text-[#d1c5ac]">
                {order.tableNumber ? `Table: ${order.tableNumber}` : order.deliveryPartner ? `Partner: ${order.deliveryPartner}` : 'Counter Pickup'}
              </div>
            </div>
          </div>

          {/* Status Changer */}
          <div>
            <label className="block text-[12px] text-[#d1c5ac] uppercase font-headline tracking-wider mb-2">
              Update Kitchen / Counter Status
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {statuses.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStatus(st.id);
                    onUpdateStatus(order.id, st.id);
                  }}
                  className={`py-1.5 px-1 text-center font-headline text-[13px] uppercase font-bold rounded-[2px] cursor-pointer transition-none ${
                    selectedStatus === st.id
                      ? `${st.color} ring-1 ring-[#f7c61e]`
                      : 'bg-[#2a2a2c] text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Items breakdown */}
          <div>
            <div className="text-[12px] text-[#d1c5ac] uppercase font-headline tracking-wider mb-2">
              Ordered Items Breakdown
            </div>
            <div className="border border-[#4e4633] rounded-[2px] divide-y divide-[#4e4633] bg-[#1b1b1d] max-h-48 overflow-y-auto">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 text-[14px]">
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-[#f7c61e] w-6">{it.quantity}x</span>
                    <span className="text-[#e4e2e4] font-body">{it.name}</span>
                  </div>
                  <div className="font-headline text-[#e4e2e4] tabular-nums font-semibold">
                    ₨ {(it.price * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Bar */}
          <div className="flex items-center justify-between p-3 bg-[#2a2a2c] border border-[#4e4633]">
            <span className="font-headline text-[14px] uppercase text-[#d1c5ac] tracking-wide">
              Grand Total
            </span>
            <span className="font-headline text-[22px] font-bold text-[#f7c61e] tabular-nums">
              ₨ {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-[#4e4633]">
          <button
            onClick={() => {
              onClose();
              onOpenReceipt(order);
            }}
            className="flex-1 h-10 bg-[#353437] border border-[#4e4633] text-[#e4e2e4] font-headline font-semibold uppercase tracking-wider text-[14px] rounded-[2px] hover:bg-[#4e4633] transition-none flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>🧾</span> View Thermal Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 h-10 bg-[#f7c61e] text-[#241a00] font-headline font-bold uppercase tracking-wider text-[14px] rounded-[2px] hover:bg-[#ffe6a8] transition-none cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
