import React, { useState } from 'react';
import { MenuItem, Category } from '../types';

interface MenuItemsViewProps {
  menuItems: MenuItem[];
  categories: Category[];
  onToggleInStock: (itemId: string) => void;
  onSaveItem: (item: MenuItem) => void;
}

export const MenuItemsView: React.FC<MenuItemsViewProps> = ({
  menuItems,
  categories,
  onToggleInStock,
  onSaveItem
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItem, setIsNewItem] = useState<boolean>(false);

  const filteredItems = menuItems.filter((i) =>
    selectedCat === 'all' ? true : i.category === selectedCat
  );

  const handleCreateNew = () => {
    setIsNewItem(true);
    setEditingItem({
      id: `item-${Date.now()}`,
      name: '',
      category: categories[0]?.name || 'Broast & Chicken',
      price: 150,
      description: '',
      inStock: true,
      code: `BR-${Math.floor(Math.random() * 900 + 100)}`,
      prepTimeMinutes: 10
    });
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
            Menu Items Catalog
          </h1>
          <p className="font-body text-[13px] text-[#d1c5ac]">
            Manage prices, availability, and kitchen preparation times.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="h-10 px-4 bg-[#f7c61e] text-[#241a00] font-headline font-bold uppercase text-[14px] tracking-wider rounded-[2px] hover:bg-[#ffe6a8] flex items-center gap-1.5 cursor-pointer"
        >
          <span>+</span> Add New Item
        </button>
      </div>

      {/* Category Filter Pills/Buttons */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#4e4633] mb-4">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-3 py-1.5 text-[13px] font-headline uppercase font-bold rounded-[2px] transition-none cursor-pointer ${
            selectedCat === 'all'
              ? 'bg-[#f7c61e] text-[#241a00]'
              : 'bg-[#1f1f21] text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4]'
          }`}
        >
          All Items ({menuItems.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.name)}
            className={`px-3 py-1.5 text-[13px] font-headline uppercase font-bold rounded-[2px] whitespace-nowrap transition-none cursor-pointer ${
              selectedCat === c.name
                ? 'bg-[#f7c61e] text-[#241a00]'
                : 'bg-[#1f1f21] text-[#d1c5ac] border border-[#4e4633] hover:text-[#e4e2e4]'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-[2px] border flex flex-col justify-between ${
              item.inStock
                ? 'bg-[#1f1f21] border-[#4e4633]'
                : 'bg-[#1b1b1d] border-[#4e4633] opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className="font-headline font-bold text-[#9a9079] tracking-wider uppercase">
                  {item.code}
                </span>
                <span className="font-body text-[#d1c5ac] text-[11px] px-2 py-0.5 bg-[#2a2a2c] rounded-[2px]">
                  {item.category}
                </span>
              </div>

              <h3 className="font-body text-[16px] font-bold text-[#e4e2e4] mt-1">
                {item.name}
              </h3>
              <p className="font-body text-[12px] text-[#d1c5ac] mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#4e4633] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-body text-[#d1c5ac]">Price</div>
                <div className="font-headline text-[22px] font-bold text-[#f7c61e] tabular-nums">
                  ₨ {item.price.toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleInStock(item.id)}
                  className={`h-7 px-2.5 font-headline text-[12px] uppercase font-bold rounded-[2px] border cursor-pointer ${
                    item.inStock
                      ? 'border-[#f7c61e] text-[#f7c61e] bg-[#f7c61e]/10'
                      : 'border-[#ffb4ab] text-[#ffb4ab] bg-[#93000a]/20'
                  }`}
                >
                  {item.inStock ? 'In Stock' : 'Sold Out'}
                </button>
                <button
                  onClick={() => {
                    setIsNewItem(false);
                    setEditingItem(item);
                  }}
                  className="h-7 px-2.5 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline text-[12px] uppercase font-semibold rounded-[2px] hover:bg-[#4e4633] cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4">
          <div className="w-full max-w-md bg-[#1f1f21] border border-[#f7c61e] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
              <span className="font-headline text-[18px] uppercase font-bold text-[#f7c61e]">
                {isNewItem ? 'Add New Menu Dish' : `Edit: ${editingItem.name}`}
              </span>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveItem(editingItem);
                setEditingItem(null);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-body text-[14px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-headline text-[16px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.code}
                    onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                    className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-headline text-[14px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-body text-[13px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Kitchen Prep Time (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingItem.prepTimeMinutes}
                  onChange={(e) => setEditingItem({ ...editingItem, prepTimeMinutes: parseInt(e.target.value) || 5 })}
                  className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-headline text-[15px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#303033] border border-[#4e4633] p-2 font-body text-[13px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[14px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] cursor-pointer"
                >
                  Save Dish
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 h-10 bg-[#2a2a2c] text-[#d1c5ac] border border-[#4e4633] font-headline text-[13px] uppercase rounded-[2px] hover:text-[#e4e2e4] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
