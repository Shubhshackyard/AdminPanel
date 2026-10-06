import React, { useState, useEffect } from 'react';
import { ViewScreen } from '../types';

interface HeaderProps {
  currentScreen: ViewScreen;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  shopStatus: 'open' | 'busy' | 'closed';
  onToggleShopStatus: () => void;
  notifications: Array<{ id: string; title: string; time: string; type: 'alert' | 'order' | 'kds'; read: boolean }>;
  onMarkNotificationRead: (id: string) => void;
  onNavigate: (screen: ViewScreen) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  searchQuery,
  onSearchChange,
  shopStatus,
  onToggleShopStatus,
  notifications,
  onMarkNotificationRead,
  onNavigate
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('24 Oct 2024, 07:45 PM');

  // Real-time clock update (or fallback to simulated store clock)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(now.toLocaleString('en-GB', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const screenTitles: Record<ViewScreen, string> = {
    dashboard: 'Operations',
    orders: 'Orders Queue',
    'new-order': 'POS Terminal',
    'menu-items': 'Menu Catalog',
    categories: 'Categories',
    combos: 'Combos & Deals',
    customers: 'Customer Directory',
    reports: 'Financial & Sales Reports',
    inventory: 'Inventory & Raw Materials',
    staff: 'Staff & Shift Management',
    settings: 'Terminal & Store Settings'
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-[232px] right-0 h-14 bg-[#0e0e10] border-b border-[#4e4633] z-40 px-4 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[16px] text-[#e4e2e4]">
        <span className="font-body text-[#d1c5ac]">Terminal 01</span>
        <span className="text-[#9a9079] font-body text-[14px]">/</span>
        <span className="text-[#e4e2e4] font-headline font-semibold text-[17px] tracking-wide">
          {screenTitles[currentScreen]}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-[#1f1f21] border border-[#4e4633] px-3 py-1 rounded-[2px] w-64 gap-2 focus-within:border-[#f7c61e]">
          <span className="text-[#d1c5ac] text-[14px] select-none">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders, SKU, customer..."
            className="bg-transparent text-[#e4e2e4] placeholder:text-[#d1c5ac]/70 font-body text-[12px] focus:outline-none w-full border-none p-0"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="text-[#d1c5ac] hover:text-[#e4e2e4] text-[12px]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Shop Status Toggle Button */}
        <button
          onClick={onToggleShopStatus}
          title="Click to toggle store operating status"
          className="flex items-center gap-2 border border-[#4e4633] bg-[#1f1f21] px-3 py-1 rounded-[2px] hover:border-[#9a9079] transition-none cursor-pointer"
        >
          <span
            className={`w-2 h-2 rounded-[1px] inline-block ${
              shopStatus === 'open'
                ? 'bg-[#f7c61e]'
                : shopStatus === 'busy'
                ? 'bg-[#ffa726]'
                : 'bg-[#ffb4ab]'
            }`}
          />
          <span className="font-headline text-[13px] font-semibold text-[#e4e2e4] tracking-wide uppercase">
            Shop: {shopStatus}
          </span>
        </button>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center p-1 text-[#e4e2e4] hover:text-[#f7c61e] cursor-pointer"
            title="System notifications"
          >
            <span className="text-[19px]">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f7c61e] text-[#241a00] font-headline text-[10px] px-1 font-bold rounded-[2px] leading-tight">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-[#1f1f21] border border-[#f7c61e] shadow-2xl rounded-[0px] z-50 p-2">
              <div className="flex items-center justify-between border-b border-[#4e4633] pb-2 mb-2 px-1">
                <span className="font-headline text-[14px] uppercase text-[#e4e2e4] font-bold tracking-wider">
                  Live Notifications ({unreadCount} unread)
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[#d1c5ac] hover:text-[#e4e2e4] text-[12px]"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onMarkNotificationRead(n.id);
                      if (n.type === 'alert') onNavigate('inventory');
                      if (n.type === 'order') onNavigate('orders');
                    }}
                    className={`p-2 rounded-[2px] border text-left cursor-pointer transition-none ${
                      n.read
                        ? 'bg-[#1b1b1d] border-[#4e4633] text-[#d1c5ac]'
                        : 'bg-[#2a2a2c] border-[#f7c61e]/60 text-[#e4e2e4]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className={`font-headline uppercase font-bold ${
                        n.type === 'alert' ? 'text-[#ffb4ab]' : 'text-[#f7c61e]'
                      }`}>
                        {n.type === 'alert' ? '• Low Stock' : n.type === 'order' ? '• New Order' : '• Kitchen Station'}
                      </span>
                      <span className="text-[#9a9079] font-headline tabular-nums">{n.time}</span>
                    </div>
                    <p className="font-body text-[13px] leading-snug">{n.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Clock */}
        <div className="font-headline text-[16px] font-semibold text-[#f7c61e] border-l border-[#4e4633] pl-4 tracking-wider tabular-nums select-none whitespace-nowrap">
          {currentTime}
        </div>

        {/* User avatar button with profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-[#ffe6a8] flex items-center justify-center flex-shrink-0 ml-1 hover:ring-2 hover:ring-[#f7c61e] transition-all cursor-pointer"
            title="User Profile: Tariq Al-Mansoor"
          >
            <span className="text-[#3d2f00] font-headline font-bold text-[13px]">TA</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-56 bg-[#1f1f21] border border-[#f7c61e] rounded-[0px] z-50 p-3 select-none">
              <div className="border-b border-[#4e4633] pb-2 mb-2">
                <div className="font-headline font-bold text-[#f7c61e] text-[15px]">Tariq Al-Mansoor</div>
                <div className="text-[12px] text-[#d1c5ac] font-body">Terminal 01 • Cashier Admin</div>
              </div>
              <div className="flex flex-col gap-1 text-[13px] font-body">
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-[#2a2a2c] text-[#e4e2e4] rounded-[2px]"
                >
                  ⚙ Store Configuration
                </button>
                <button
                  onClick={() => {
                    onNavigate('staff');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-[#2a2a2c] text-[#e4e2e4] rounded-[2px]"
                >
                  👥 Staff Shifts
                </button>
                <button
                  onClick={() => {
                    alert('Session locked. Enter PIN to unlock counter terminal.');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-[#93000a]/30 text-[#ffb4ab] rounded-[2px]"
                >
                  🔒 Lock Terminal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
