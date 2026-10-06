import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  onSelectCustomerForOrder: (customer: Customer) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers, onSelectCustomerForOrder }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase()) ||
    c.favoriteItem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
            Customer Directory & Loyalty
          </h1>
          <p className="font-body text-[13px] text-[#d1c5ac]">
            View regular diners, historical ticket volume, and preferred broast recipes.
          </p>
        </div>

        <div className="flex items-center bg-[#1f1f21] border border-[#4e4633] px-3 py-1.5 rounded-[2px] w-72 gap-2">
          <span className="text-[#d1c5ac] text-[14px]">🔍</span>
          <input
            type="text"
            placeholder="Search customer name, phone, item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[#e4e2e4] placeholder:text-[#d1c5ac]/70 text-[13px] font-body focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="bg-[#1f1f21] border border-[#4e4633] rounded-[2px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0e0e10] border-b border-[#4e4633] font-body text-[11px] text-[#d1c5ac] uppercase tracking-wider select-none font-semibold">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3 text-center">Orders Placed</th>
                <th className="py-3 px-3 text-right">Lifetime Spend</th>
                <th className="py-3 px-3">Favorite Meal</th>
                <th className="py-3 px-3">Last Order</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4e4633] font-body text-[13px] text-[#e4e2e4]">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#2a2a2c] transition-none">
                  <td className="py-3 px-3 font-semibold text-[#e4e2e4]">
                    {cust.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-[12px] text-[#d1c5ac]">
                    {cust.phone}
                  </td>
                  <td className="py-3 px-3 text-center font-headline text-[15px] font-bold text-[#f7c61e] tabular-nums">
                    {cust.totalOrders}
                  </td>
                  <td className="py-3 px-3 text-right font-headline text-[16px] font-bold text-[#e4e2e4] tabular-nums">
                    ₨ {cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-[#d1c5ac]">
                    {cust.favoriteItem}
                  </td>
                  <td className="py-3 px-3 text-[#9a9079] text-[12px]">
                    {cust.lastOrderDate}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectCustomerForOrder(cust)}
                      className="h-[28px] px-2.5 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[12px] uppercase rounded-[2px] hover:bg-[#ffe6a8] cursor-pointer"
                    >
                      New Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
