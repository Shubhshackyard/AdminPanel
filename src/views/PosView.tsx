import React, { useState } from 'react';
import { MenuItem, Category, Order, OrderType } from '../types';

interface PosViewProps {
  menuItems: MenuItem[];
  categories: Category[];
  onPlaceOrder: (order: Order) => void;
  onOpenReceipt: (order: Order) => void;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export const PosView: React.FC<PosViewProps> = ({
  menuItems,
  categories,
  onPlaceOrder,
  onOpenReceipt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('T-04');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Online'>('Cash');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchFilter || 
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.code.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  };

  const rawSubtotal = cart.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const taxableAmount = rawSubtotal - discountAmount;
  const gstTax = taxableAmount * 0.05;
  const grandTotal = taxableAmount + gstTax;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newId = `#${1049 + Math.floor(Math.random() * 50)}`;
    const itemsSummary = cart
      .map((ci) => `${ci.quantity}x ${ci.menuItem.name}`)
      .join(', ');

    const newOrder: Order = {
      id: newId,
      numericId: parseInt(newId.replace('#', '')),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
      customerName: customerName.trim() || 'Walk-in Guest',
      customerPhone: customerPhone.trim() || undefined,
      items: cart.map((ci) => ({
        id: ci.menuItem.id,
        name: ci.menuItem.name,
        quantity: ci.quantity,
        price: ci.menuItem.price
      })),
      itemsSummary,
      type: orderType,
      tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
      deliveryPartner: orderType === 'delivery' ? 'Store Rider' : undefined,
      total: grandTotal,
      status: 'new',
      paymentMethod,
      paid: true,
      createdAt: new Date().toISOString()
    };

    onPlaceOrder(newOrder);
    onOpenReceipt(newOrder);
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <div className="flex w-full h-[calc(100vh-56px)] overflow-hidden">
      {/* 1. Left Sub-column: Categories (200px fixed) */}
      <div className="w-[200px] border-r border-[#4e4633] bg-[#0e0e10] flex flex-col justify-between p-2 flex-shrink-0">
        <div>
          <div className="px-2 py-1.5 text-[11px] font-headline uppercase font-bold text-[#d1c5ac] tracking-wider border-b border-[#4e4633] mb-1">
            Menu Categories
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 text-[14px] rounded-[2px] transition-none cursor-pointer flex items-center justify-between ${
                selectedCategory === 'all'
                  ? 'bg-[#f7c61e] text-[#241a00] font-headline font-bold'
                  : 'text-[#d1c5ac] hover:bg-[#2a2a2c] hover:text-[#e4e2e4] font-body'
              }`}
            >
              <span>All Dishes</span>
              <span className="font-headline text-[11px] font-bold tabular-nums">
                {menuItems.length}
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left px-3 py-2 text-[14px] rounded-[2px] transition-none cursor-pointer flex items-center justify-between ${
                  selectedCategory === cat.name
                    ? 'bg-[#f7c61e] text-[#241a00] font-headline font-bold'
                    : 'text-[#d1c5ac] hover:bg-[#2a2a2c] hover:text-[#e4e2e4] font-body'
                }`}
              >
                <span className="truncate pr-1">{cat.name}</span>
                <span className="font-headline text-[11px] font-bold tabular-nums opacity-80">
                  {cat.itemCount}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 border border-[#4e4633] bg-[#1b1b1d] rounded-[2px] text-[11px] text-[#d1c5ac]">
          <div className="font-headline font-bold uppercase text-[#f7c61e] mb-0.5">Counter Terminal</div>
          <div>Cash Drawer: Connected</div>
          <div>Thermal Printer: Ready</div>
        </div>
      </div>

      {/* 2. Center Column: Responsive Product Tiles (flexible 1fr) */}
      <div className="flex-1 flex flex-col bg-[#131315] overflow-y-auto p-4">
        {/* Search & Stats Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-[22px] font-bold text-[#e4e2e4] uppercase tracking-wide">
              {selectedCategory === 'all' ? 'All Dishes' : selectedCategory}
            </h1>
            <span className="text-[12px] text-[#d1c5ac] font-body">
              ({filteredItems.length} items available)
            </span>
          </div>

          <div className="flex items-center bg-[#1f1f21] border border-[#4e4633] px-3 py-1 rounded-[2px] w-64 gap-2">
            <span className="text-[#d1c5ac] text-[13px]">🔍</span>
            <input
              type="text"
              placeholder="Search product code or name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent text-[#e4e2e4] placeholder:text-[#d1c5ac]/70 text-[13px] font-body focus:outline-none w-full border-none p-0"
            />
          </div>
        </div>

        {/* Product Tile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-[#1f1f21] border border-[#4e4633] hover:border-[#f7c61e] active:bg-[#303033] p-3 rounded-[2px] cursor-pointer flex flex-col justify-between transition-none group select-none min-h-[120px]"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#d1c5ac] mb-1">
                  <span className="font-headline tracking-wider uppercase font-semibold text-[#9a9079]">
                    {item.code}
                  </span>
                  {item.isPopular && (
                    <span className="font-headline text-[10px] uppercase font-bold text-[#f7c61e] bg-[#f7c61e]/10 px-1 rounded-[1px]">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="font-body text-[15px] font-semibold text-[#e4e2e4] group-hover:text-[#f7c61e] transition-none leading-snug line-clamp-2">
                  {item.name}
                </h3>
              </div>

              <div className="flex items-end justify-between mt-3 pt-2 border-t border-[#4e4633]">
                <span className="font-body text-[11px] text-[#d1c5ac]">
                  Prep: {item.prepTimeMinutes}m
                </span>
                <span className="font-headline text-[20px] font-bold text-[#f7c61e] tabular-nums leading-none">
                  ₨ {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Right Column: Active Receipt / Ticket Stack (380px fixed) */}
      <div className="w-[380px] border-l border-[#4e4633] bg-[#1f1f21] flex flex-col justify-between flex-shrink-0 select-none">
        {/* Top: Order Type & Customer Details */}
        <div className="p-3 border-b border-[#4e4633] bg-[#1b1b1d] space-y-2.5">
          {/* Order Type Toggle */}
          <div className="grid grid-cols-3 gap-1 bg-[#0e0e10] p-1 border border-[#4e4633] rounded-[2px]">
            {(['dine_in', 'takeaway', 'delivery'] as OrderType[]).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`py-1.5 font-headline text-[13px] font-bold uppercase rounded-[2px] transition-none cursor-pointer ${
                  orderType === t
                    ? 'bg-[#f7c61e] text-[#241a00]'
                    : 'text-[#d1c5ac] hover:text-[#e4e2e4]'
                }`}
              >
                {t === 'dine_in' ? 'Dine-In' : t === 'takeaway' ? 'Takeaway' : 'Delivery'}
              </button>
            ))}
          </div>

          {/* Table / Details Selector */}
          {orderType === 'dine_in' && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] uppercase font-headline font-bold text-[#d1c5ac]">
                Table:
              </span>
              <div className="flex gap-1 overflow-x-auto pb-0.5">
                {['T-01', 'T-02', 'T-03', 'T-04', 'T-05', 'T-06'].map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setTableNumber(tbl)}
                    className={`px-2 py-0.5 font-headline text-[12px] font-bold rounded-[2px] border cursor-pointer ${
                      tableNumber === tbl
                        ? 'bg-[#f7c61e] text-[#241a00] border-[#f7c61e]'
                        : 'bg-[#2a2a2c] text-[#d1c5ac] border-[#4e4633]'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-8 bg-[#303033] border border-[#4e4633] px-2 text-[12px] text-[#e4e2e4] placeholder:text-[#d1c5ac]/60 font-body rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
            />
            <input
              type="text"
              placeholder="Phone (Optional)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="h-8 bg-[#303033] border border-[#4e4633] px-2 text-[12px] text-[#e4e2e4] placeholder:text-[#d1c5ac]/60 font-body rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
            />
          </div>
        </div>

        {/* Center: Cart Items List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-[#4e4633]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#d1c5ac]/60 space-y-2">
              <span className="text-[32px]">🛒</span>
              <div className="font-headline uppercase text-[15px] font-bold tracking-wider">
                Cart is Empty
              </div>
              <p className="font-body text-[12px] text-center max-w-[200px]">
                Click any dish from the center menu grid to add to this order ticket.
              </p>
            </div>
          ) : (
            cart.map((ci) => (
              <div key={ci.menuItem.id} className="py-2 flex items-center justify-between text-[13px]">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="font-body text-[#e4e2e4] font-semibold truncate leading-tight">
                    {ci.menuItem.name}
                  </div>
                  <div className="font-headline text-[12px] text-[#f7c61e] tabular-nums">
                    ₨ {ci.menuItem.price.toFixed(2)} each
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(ci.menuItem.id, -1)}
                    className="w-6 h-6 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline font-bold text-[14px] flex items-center justify-center rounded-[2px] hover:bg-[#4e4633] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-headline text-[14px] font-bold text-[#e4e2e4] w-6 text-center tabular-nums">
                    {ci.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(ci.menuItem.id, 1)}
                    className="w-6 h-6 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline font-bold text-[14px] flex items-center justify-center rounded-[2px] hover:bg-[#4e4633] cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(ci.menuItem.id)}
                    className="w-6 h-6 text-[#ffb4ab] hover:text-[#e4e2e4] ml-1 text-[12px] cursor-pointer flex items-center justify-center"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom: Calculations & Action Buttons */}
        <div className="p-3 bg-[#1b1b1d] border-t border-[#4e4633] space-y-2">
          {/* Subtotal & GST breakdown */}
          <div className="space-y-1 text-[12px] font-body text-[#d1c5ac]">
            <div className="flex justify-between">
              <span>Subtotal ({cart.reduce((s, c) => s + c.quantity, 0)} items):</span>
              <span className="font-headline text-[13px] text-[#e4e2e4] tabular-nums">
                ₨ {rawSubtotal.toFixed(2)}
              </span>
            </div>

            {/* Discount selector */}
            <div className="flex justify-between items-center">
              <span>Staff / Combo Discount:</span>
              <div className="flex items-center gap-1">
                {[0, 10, 15].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiscountPercent(d)}
                    className={`px-1.5 py-0.2 text-[10px] font-headline uppercase font-bold rounded-[2px] border ${
                      discountPercent === d
                        ? 'bg-[#f7c61e] text-[#241a00] border-[#f7c61e]'
                        : 'bg-[#2a2a2c] text-[#d1c5ac] border-[#4e4633]'
                    }`}
                  >
                    {d === 0 ? 'None' : `${d}%`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <span>Govt. GST (5%):</span>
              <span className="font-headline text-[13px] text-[#e4e2e4] tabular-nums">
                ₨ {gstTax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between font-bold text-[18px] text-[#f7c61e] font-headline pt-1 border-t border-[#4e4633]">
              <span>Grand Total:</span>
              <span className="tabular-nums">₨ {grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-1 pt-1">
            {(['Cash', 'Card', 'Online'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`py-1 text-[11px] font-headline font-bold uppercase rounded-[2px] border cursor-pointer ${
                  paymentMethod === m
                    ? 'bg-[#2a2a2c] text-[#f7c61e] border-[#f7c61e]'
                    : 'bg-[#1f1f21] text-[#d1c5ac] border-[#4e4633]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2 pt-1">
            <button
              disabled={cart.length === 0}
              onClick={() => setCart([])}
              className="px-3 h-11 bg-[#2a2a2c] text-[#d1c5ac] border border-[#4e4633] font-headline font-semibold text-[13px] uppercase rounded-[2px] hover:text-[#ffb4ab] disabled:opacity-40 cursor-pointer"
              title="Void / Clear cart"
            >
              Clear
            </button>
            <button
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="flex-1 h-11 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[16px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] disabled:opacity-40 transition-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Charge & Print</span>
              <span className="tabular-nums font-extrabold">₨ {grandTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
