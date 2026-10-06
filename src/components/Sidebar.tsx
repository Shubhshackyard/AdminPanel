import React from 'react';
import { ViewScreen } from '../types';

interface SidebarProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
  pendingCount: number;
  lowStockCount: number;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  pendingCount,
  lowStockCount,
  onOpenTerms,
  onOpenPrivacy
}) => {
  const navItems: { id: ViewScreen; label: string; badge?: number; badgeType?: 'gold' | 'red' }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders', badge: pendingCount > 0 ? pendingCount : undefined, badgeType: 'gold' },
    { id: 'new-order', label: 'New order' },
    { id: 'menu-items', label: 'Menu items' },
    { id: 'categories', label: 'Categories' },
    { id: 'combos', label: 'Combos' },
    { id: 'customers', label: 'Customers' },
    { id: 'reports', label: 'Reports' },
    { id: 'inventory', label: 'Inventory', badge: lowStockCount > 0 ? lowStockCount : undefined, badgeType: 'red' },
    { id: 'staff', label: 'Staff' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[232px] bg-[#0e0e10] border-r border-[#4e4633] flex flex-col z-50 justify-between select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate('dashboard')} 
          className="h-14 px-4 border-b border-[#4e4633] flex flex-col justify-center bg-[#0e0e10] cursor-pointer hover:bg-[#1b1b1d] transition-colors"
        >
          <span 
            className="text-[#f7c61e] text-[20px] leading-tight tracking-normal font-script"
            style={{ fontFamily: "'Kaushan Script', cursive" }}
          >
            Arabian Broast
          </span>
          <span className="font-body text-[12px] text-[#d1c5ac] font-medium tracking-tight">
            Order management
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-3 py-2 rounded-[2px] text-[15px] transition-none flex items-center justify-between group ${
                  isActive
                    ? 'bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[16px] tracking-wide'
                    : 'text-[#d1c5ac] hover:text-[#e4e2e4] hover:bg-[#2a2a2c] font-body'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`font-headline text-[11px] font-bold px-1.5 py-0.2 rounded-[2px] tabular-nums leading-tight ${
                      isActive
                        ? 'bg-[#241a00] text-[#f7c61e]'
                        : item.badgeType === 'red'
                        ? 'bg-[#93000a] text-[#ffb4ab] border border-[#ffb4ab]/30'
                        : 'bg-[#f7c61e]/20 text-[#f7c61e] border border-[#f7c61e]/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User info card & footer links */}
      <div className="border-t border-[#4e4633] p-2 bg-[#0e0e10]">
        <div className="flex items-center gap-2 p-2 mb-1 bg-[#1f1f21] rounded-[2px] border border-[#4e4633]">
          <div className="w-8 h-8 rounded-full bg-[#ffe6a8] flex items-center justify-center flex-shrink-0">
            <span className="text-[#3d2f00] font-headline font-bold text-[14px]">TA</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body text-[14px] text-[#e4e2e4] font-semibold truncate leading-tight">
              Tariq Al-Mansoor
            </span>
            <span className="font-body text-[11px] text-[#d1c5ac] truncate uppercase tracking-wider">
              Admin / Counter
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-[#d1c5ac]">
          <button 
            onClick={onOpenTerms} 
            className="hover:text-[#e4e2e4] transition-colors"
          >
            Terms of service
          </button>
          <span className="text-[#4e4633]">•</span>
          <button 
            onClick={onOpenPrivacy} 
            className="hover:text-[#e4e2e4] transition-colors"
          >
            Privacy policy
          </button>
        </div>
      </div>
    </aside>
  );
};
