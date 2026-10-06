import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface RestockModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onConfirmRestock: (itemId: string, addQuantity: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  item,
  onClose,
  onConfirmRestock
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState<number>(item.threshold * 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      onConfirmRestock(item.id, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4">
      <div className="w-full max-w-sm bg-[#1f1f21] border border-[#f7c61e] p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ffb4ab] inline-block rounded-[1px]"></span>
            <span className="font-headline uppercase text-[16px] font-bold text-[#f7c61e]">
              Restock Item
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="text-[16px] font-headline font-bold text-[#e4e2e4] mb-1">
              {item.name}
            </div>
            <div className="text-[13px] text-[#d1c5ac] font-body flex items-center gap-2">
              <span>Current: <strong className="text-[#ffb4ab] font-headline">{item.currentStock} {item.unit}</strong></span>
              <span>•</span>
              <span>Min Threshold: <strong className="text-[#e4e2e4] font-headline">{item.threshold}</strong></span>
            </div>
          </div>

          <div>
            <label className="block text-[12px] uppercase font-headline tracking-wider text-[#d1c5ac] mb-2">
              Units to Add into Stock
            </label>
            <div className="flex items-center gap-2 mb-2">
              {[10, 25, 50, 100].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setQuantity(num)}
                  className={`flex-1 py-1.5 font-headline text-[13px] font-bold rounded-[2px] border transition-none cursor-pointer ${
                    quantity === num
                      ? 'bg-[#f7c61e] text-[#241a00] border-[#f7c61e]'
                      : 'bg-[#2a2a2c] text-[#d1c5ac] border-[#4e4633] hover:text-[#e4e2e4]'
                  }`}
                >
                  +{num}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full h-10 bg-[#303033] border border-[#4e4633] px-3 font-headline text-[16px] text-[#e4e2e4] focus:outline-none focus:border-[#f7c61e] rounded-[2px]"
            />
          </div>

          <div className="bg-[#1b1b1d] p-3 border border-[#4e4633] rounded-[2px] text-[13px] font-body text-[#d1c5ac]">
            New stock level will be:{' '}
            <strong className="text-[#f7c61e] font-headline text-[15px]">
              {item.currentStock + quantity} {item.unit}
            </strong>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 h-10 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[14px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] transition-none cursor-pointer"
            >
              Confirm Restock
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-10 bg-[#2a2a2c] text-[#d1c5ac] border border-[#4e4633] font-headline font-semibold text-[13px] uppercase rounded-[2px] hover:text-[#e4e2e4] transition-none cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
