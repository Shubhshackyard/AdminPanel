import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onOpenRestock: (item: InventoryItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ inventory, onOpenRestock }) => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = inventory.filter((item) => {
    if (filterCat !== 'all' && item.category !== filterCat) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const criticalCount = inventory.filter(i => i.status === 'critical').length;
  const lowCount = inventory.filter(i => i.status === 'low').length;

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
            Kitchen Inventory & Stock Control
          </h1>
          <p className="font-body text-[13px] text-[#d1c5ac]">
            Monitor critical cooking ingredients, frying oil, fresh burger buns, and beverages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1f1f21] border border-[#4e4633] px-3 py-1.5 rounded-[2px] w-64 gap-2">
            <span className="text-[#d1c5ac] text-[14px]">🔍</span>
            <input
              type="text"
              placeholder="Search raw material or supply..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[#e4e2e4] placeholder:text-[#d1c5ac]/70 text-[13px] font-body focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-[#1f1f21] border border-[#ffb4ab]/40 p-4 rounded-[2px] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-headline uppercase font-bold text-[#ffb4ab]">
              Critical Stock Alerts
            </div>
            <div className="font-headline text-[28px] font-bold text-[#ffb4ab] tabular-nums leading-none mt-1">
              {criticalCount} items
            </div>
          </div>
          <span className="text-[26px]">⚠️</span>
        </div>

        <div className="bg-[#1f1f21] border border-[#f7c61e]/40 p-4 rounded-[2px] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-headline uppercase font-bold text-[#f7c61e]">
              Low Supply Items
            </div>
            <div className="font-headline text-[28px] font-bold text-[#f7c61e] tabular-nums leading-none mt-1">
              {lowCount} items
            </div>
          </div>
          <span className="text-[26px]">📦</span>
        </div>

        <div className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-headline uppercase font-bold text-[#d1c5ac]">
              Total Tracked SKUs
            </div>
            <div className="font-headline text-[28px] font-bold text-[#e4e2e4] tabular-nums leading-none mt-1">
              {inventory.length} items
            </div>
          </div>
          <span className="text-[26px]">🍗</span>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#4e4633] mb-4">
        {['all', 'Meat', 'Bakery', 'Beverages', 'Sauces & Spices', 'Packaging'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 text-[13px] font-headline uppercase font-bold rounded-[2px] transition-none cursor-pointer ${
              filterCat === cat
                ? 'bg-[#f7c61e] text-[#241a00]'
                : 'bg-[#1f1f21] text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4]'
            }`}
          >
            {cat === 'all' ? 'All Supplies' : cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1f1f21] border border-[#4e4633] rounded-[2px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0e0e10] border-b border-[#4e4633] font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider select-none font-semibold">
                <th className="py-3 px-3">Item Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Current In-Stock</th>
                <th className="py-3 px-3 text-right">Min Threshold</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4e4633] font-body text-[13px] text-[#e4e2e4]">
              {filtered.map((item) => {
                const isCritical = item.status === 'critical';
                const isLow = item.status === 'low';
                return (
                  <tr key={item.id} className="hover:bg-[#2a2a2c] transition-none">
                    <td className="py-3 px-3 font-semibold text-[#e4e2e4]">
                      {item.name}
                    </td>
                    <td className="py-3 px-3 text-[#d1c5ac] text-[12px]">
                      {item.category}
                    </td>
                    <td className="py-3 px-3 text-right font-headline text-[16px] font-bold tabular-nums">
                      <span className={isCritical ? 'text-[#ffb4ab]' : isLow ? 'text-[#f7c61e]' : 'text-[#e4e2e4]'}>
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-headline text-[14px] text-[#d1c5ac] tabular-nums">
                      {item.threshold} {item.unit.replace(' left', '')}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] font-headline text-[12px] uppercase font-bold tracking-wider ${
                        isCritical
                          ? 'border border-[#ffb4ab] text-[#ffb4ab] bg-[#93000a]/20'
                          : isLow
                          ? 'border border-[#f7c61e] text-[#f7c61e] bg-[#f7c61e]/10'
                          : 'border border-[#4e4633] text-[#d1c5ac]'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenRestock(item)}
                        className={`h-[28px] px-3 font-headline font-semibold text-[13px] uppercase rounded-[2px] border transition-none cursor-pointer ${
                          isCritical
                            ? 'bg-[#f7c61e] text-[#241a00] border-none font-bold hover:bg-[#ffe6a8]'
                            : 'bg-[#353437] text-[#e4e2e4] border-[#4e4633] hover:bg-[#f7c61e] hover:text-[#241a00]'
                        }`}
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
