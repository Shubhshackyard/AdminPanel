import React from 'react';

export const ReportsView: React.FC = () => {
  const hourlyData = [
    { hour: '12 PM', orders: 12, revenue: 3400 },
    { hour: '01 PM', orders: 18, revenue: 5200 },
    { hour: '02 PM', orders: 22, revenue: 6450 },
    { hour: '03 PM', orders: 10, revenue: 2900 },
    { hour: '04 PM', orders: 8, revenue: 2100 },
    { hour: '05 PM', orders: 14, revenue: 3800 },
    { hour: '06 PM', orders: 19, revenue: 5600 },
    { hour: '07 PM', orders: 28, revenue: 8400, isPeak: true },
    { hour: '08 PM', orders: 24, revenue: 7100 },
    { hour: '09 PM', orders: 20, revenue: 5900 },
    { hour: '10 PM', orders: 15, revenue: 4200 }
  ];

  const maxRevenue = Math.max(...hourlyData.map(h => h.revenue));

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="my-4">
        <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
          Sales & Operational Intelligence
        </h1>
        <p className="font-body text-[13px] text-[#d1c5ac]">
          Granular throughput metrics, channel performance, and peak service analytics.
        </p>
      </div>

      {/* Top 4 KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px]">
          <div className="text-[11px] font-headline uppercase font-bold text-[#d1c5ac] mb-1">
            Weekly Gross Revenue
          </div>
          <div className="font-headline text-[32px] font-bold text-[#f7c61e] tabular-nums leading-none">
            ₨ 312,400
          </div>
          <div className="text-[12px] text-[#e4e2e4] mt-2 font-body font-semibold">
            +14.2% vs previous week
          </div>
        </div>

        <div className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px]">
          <div className="text-[11px] font-headline uppercase font-bold text-[#d1c5ac] mb-1">
            Today's Target Progress
          </div>
          <div className="font-headline text-[32px] font-bold text-[#f7c61e] tabular-nums leading-none">
            85.7%
          </div>
          <div className="text-[12px] text-[#d1c5ac] mt-2 font-body">
            ₨ 42,850 of ₨ 50,000 target
          </div>
        </div>

        <div className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px]">
          <div className="text-[11px] font-headline uppercase font-bold text-[#d1c5ac] mb-1">
            Average Kitchen Speed
          </div>
          <div className="font-headline text-[32px] font-bold text-[#e4e2e4] tabular-nums leading-none">
            8.4 min
          </div>
          <div className="text-[12px] text-[#d1c5ac] mt-2 font-body">
            Target SLA: &lt; 10.0 min
          </div>
        </div>

        <div className="bg-[#1f1f21] border border-[#4e4633] p-4 rounded-[2px]">
          <div className="text-[11px] font-headline uppercase font-bold text-[#d1c5ac] mb-1">
            Avg Order Ticket
          </div>
          <div className="font-headline text-[32px] font-bold text-[#e4e2e4] tabular-nums leading-none">
            ₨ 289.50
          </div>
          <div className="text-[12px] text-[#d1c5ac] mt-2 font-body">
            Dine-in avg: ₨ 340.00
          </div>
        </div>
      </div>

      {/* Hourly Sales Graph */}
      <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px] mb-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#4e4633]">
          <div>
            <h2 className="font-headline text-[18px] uppercase font-bold text-[#e4e2e4] tracking-wider">
              Today's Hourly Revenue Profile
            </h2>
            <span className="font-body text-[12px] text-[#d1c5ac]">
              Peak rush observed during 07:00 PM - 08:00 PM dinner shift
            </span>
          </div>
          <span className="font-headline text-[13px] text-[#f7c61e] font-bold uppercase tracking-wider">
            Peak Ticket Window: 07:00 PM
          </span>
        </div>

        <div className="w-full flex items-end justify-between gap-3 h-48 pt-6 px-2">
          {hourlyData.map((h) => {
            const pct = (h.revenue / maxRevenue) * 100;
            return (
              <div key={h.hour} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className={`font-headline text-[10px] tabular-nums mb-1 ${
                  h.isPeak ? 'text-[#f7c61e] font-bold' : 'text-[#d1c5ac]'
                }`}>
                  ₨ {h.revenue}
                </span>
                <div
                  className={`w-full rounded-[1px] ${
                    h.isPeak ? 'bg-[#f7c61e]' : 'bg-[#f7c61e]/80 group-hover:bg-[#f7c61e]'
                  }`}
                  style={{ height: `${pct}%` }}
                />
                <span className={`font-headline text-[11px] mt-2 uppercase ${
                  h.isPeak ? 'text-[#f7c61e] font-bold' : 'text-[#d1c5ac]'
                }`}>
                  {h.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel & Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Channel Breakdown */}
        <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px]">
          <h2 className="font-headline text-[16px] uppercase font-bold text-[#e4e2e4] tracking-wider mb-4 pb-2 border-b border-[#4e4633]">
            Order Distribution by Channel
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Dine-In (64 orders)</span>
                <span className="font-headline text-[14px] text-[#f7c61e] font-bold">43.2%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#f7c61e] h-2 rounded-[1px]" style={{ width: '43.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Takeaway Counter (52 orders)</span>
                <span className="font-headline text-[14px] text-[#e4e2e4] font-bold">35.1%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#e4e2e4] h-2 rounded-[1px]" style={{ width: '35.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Home Delivery (32 orders)</span>
                <span className="font-headline text-[14px] text-[#d1c5ac] font-bold">21.7%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#9a9079] h-2 rounded-[1px]" style={{ width: '21.7%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px]">
          <h2 className="font-headline text-[16px] uppercase font-bold text-[#e4e2e4] tracking-wider mb-4 pb-2 border-b border-[#4e4633]">
            Payment Settlement Mix
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Cash at Counter (₨ 24,850)</span>
                <span className="font-headline text-[14px] text-[#f7c61e] font-bold">58%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#f7c61e] h-2 rounded-[1px]" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Credit / Debit Card (₨ 11,140)</span>
                <span className="font-headline text-[14px] text-[#e4e2e4] font-bold">26%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#e4e2e4] h-2 rounded-[1px]" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-body text-[13px] mb-1">
                <span className="text-[#e4e2e4] font-semibold">Online & Direct QR (₨ 6,860)</span>
                <span className="font-headline text-[14px] text-[#d1c5ac] font-bold">16%</span>
              </div>
              <div className="w-full bg-[#0e0e10] h-2 rounded-[1px]">
                <div className="bg-[#9a9079] h-2 rounded-[1px]" style={{ width: '16%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
