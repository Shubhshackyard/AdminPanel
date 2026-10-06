import React from 'react';
import { Order } from '../types';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const subtotal = order.total / 1.05;
  const tax = order.total - subtotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4 backdrop-blur-none">
      <div className="relative w-full max-w-sm bg-[#1f1f21] border border-[#f7c61e] p-4 flex flex-col">
        {/* Top action bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
          <div className="flex items-center gap-2">
            <span className="font-headline uppercase text-[15px] font-bold text-[#f7c61e]">
              Thermal Print Preview
            </span>
            <span className="text-[#d1c5ac] font-body text-[12px]">{order.id}</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>

        {/* Paper receipt representation (#F4F1EA paper) */}
        <div className="bg-[#f4f1ea] text-[#1c1c1e] p-6 font-mono text-[12px] border border-[#d1c5ac] shadow-md select-text max-h-[70vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center border-b border-dashed border-[#1c1c1e] pb-3 mb-3">
            <div className="text-[18px] font-bold tracking-tight">ARABIAN BROAST</div>
            <div className="text-[11px] uppercase tracking-wide">Authentic Crispy & Spiced Broast</div>
            <div className="text-[10px] text-neutral-600 mt-1">Branch 01 • Main Commercial Market</div>
            <div className="text-[10px] text-neutral-600">Tel: +91 (51) 844-BROAST • NTN: 8923401-2</div>
          </div>

          {/* Metadata */}
          <div className="text-[11px] mb-3 space-y-0.5 border-b border-dashed border-[#1c1c1e] pb-2">
            <div className="flex justify-between font-bold text-[13px]">
              <span>TICKET: {order.id}</span>
              <span className="uppercase">{order.type.replace('_', ' ')}</span>
            </div>
            {order.tableNumber && (
              <div className="flex justify-between">
                <span>TABLE:</span>
                <span className="font-bold">{order.tableNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>CUSTOMER:</span>
              <span className="font-semibold">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>CASHIER:</span>
              <span>Tariq (T-01)</span>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{order.time}, 24-Oct-2024</span>
            </div>
          </div>

          {/* Line items table */}
          <div className="border-b border-dashed border-[#1c1c1e] pb-3 mb-3">
            <div className="flex justify-between font-bold pb-1 text-[11px] border-b border-neutral-300">
              <span className="w-8">QTY</span>
              <span className="flex-1 text-left">ITEM</span>
              <span className="w-16 text-right">TOTAL</span>
            </div>
            <div className="divide-y divide-neutral-200 mt-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 text-[11px]">
                  <span className="w-8 font-bold">{item.quantity}x</span>
                  <span className="flex-1 pr-1 truncate">{item.name}</span>
                  <span className="w-16 text-right tabular-nums">
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="space-y-1 text-[11px] mb-3 border-b border-dashed border-[#1c1c1e] pb-2">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span className="tabular-nums">₨ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST TAX (5%):</span>
              <span className="tabular-nums">₨ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[14px] pt-1 border-t border-neutral-300">
              <span>NET TOTAL:</span>
              <span className="tabular-nums">₨ {order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1">
              <span>PAYMENT:</span>
              <span className="uppercase font-bold">{order.paymentMethod || 'Cash'} (PAID)</span>
            </div>
          </div>

          {/* Barcode & Footer note */}
          <div className="text-center pt-2">
            <div className="font-barcode tracking-widest text-[18px] select-none py-1 border-y border-neutral-300 my-1 font-mono">
              ||| | ||||| || |||| ||||| ||| ||||
            </div>
            <div className="text-[10px] text-neutral-600 mt-1">
              Thank you for ordering at Arabian Broast!
            </div>
            <div className="text-[9px] text-neutral-500">
              Hotline: 0800-BROAST • www.arabianbroast.com
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handlePrint}
            className="flex-1 h-10 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[15px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] transition-none flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>🖨</span> Print Receipt
          </button>
          <button
            onClick={onClose}
            className="px-4 h-10 bg-[#2a2a2c] text-[#e4e2e4] border border-[#4e4633] font-headline font-semibold text-[14px] uppercase tracking-wider rounded-[2px] hover:bg-[#353437] transition-none cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
