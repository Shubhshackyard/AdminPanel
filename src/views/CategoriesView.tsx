import React, { useState } from 'react';
import { Category } from '../types';

interface CategoriesViewProps {
  categories: Category[];
  onAddCategory: (cat: Category) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ categories, onAddCategory }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory({
      id: `cat-${Date.now()}`,
      name: name.trim(),
      itemCount: 0,
      iconName: 'category',
      description: desc.trim() || 'Menu category for kitchen station routing'
    });
    setName('');
    setDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
            Product Categories
          </h1>
          <p className="font-body text-[13px] text-[#d1c5ac]">
            Structure menu items for cashier touch displays and kitchen expediting screens.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="h-10 px-4 bg-[#f7c61e] text-[#241a00] font-headline font-bold uppercase text-[14px] tracking-wider rounded-[2px] hover:bg-[#ffe6a8] flex items-center gap-1.5 cursor-pointer"
        >
          <span>+</span> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline text-[13px] uppercase font-bold text-[#f7c61e]">
                  {c.name}
                </span>
                <span className="font-headline text-[13px] text-[#d1c5ac] tabular-nums font-semibold px-2 py-0.5 bg-[#2a2a2c] rounded-[2px]">
                  {c.itemCount} items
                </span>
              </div>
              <p className="font-body text-[13px] text-[#d1c5ac] leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#4e4633] flex items-center justify-between text-[11px] text-[#9a9079]">
              <span>Station: Kitchen Main</span>
              <span className="text-[#f7c61e] font-headline font-bold">Active in POS</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4">
          <div className="w-full max-w-sm bg-[#1f1f21] border border-[#f7c61e] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
              <span className="font-headline text-[18px] uppercase font-bold text-[#f7c61e]">
                Add New Category
              </span>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desserts & Shakes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-body text-[14px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short summary for kitchen grouping..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#303033] border border-[#4e4633] p-2 font-body text-[13px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[14px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] cursor-pointer"
                >
                  Create Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
