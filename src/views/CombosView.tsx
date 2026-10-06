import React from 'react';
import { ComboItem } from '../types';

interface CombosViewProps {
  combos: ComboItem[];
  onOrderCombo: (combo: ComboItem) => void;
}

export const CombosView: React.FC<CombosViewProps> = ({ combos, onOrderCombo }) => {
  return (
    <div className="flex flex-col w-full pb-8">
      <div className="my-4">
        <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
          Special Value Combos & Family Deals
        </h1>
        <p className="font-body text-[13px] text-[#d1c5ac]">
          High-margin bundled packages designed for rapid counter ordering and maximum basket size.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combos.map((combo) => {
          const savings = combo.originalPrice - combo.comboPrice;
          return (
            <div
              key={combo.id}
              className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-headline text-[20px] font-bold text-[#e4e2e4]">
                    {combo.name}
                  </span>
                  {combo.badge && (
                    <span className="font-headline text-[12px] uppercase font-bold text-[#241a00] bg-[#f7c61e] px-2 py-0.5 rounded-[1px]">
                      {combo.badge}
                    </span>
                  )}
                </div>

                <p className="font-body text-[13px] text-[#d1c5ac] mb-3">
                  {combo.description}
                </p>

                {/* Items included */}
                <div className="bg-[#1b1b1d] p-3 border border-[#4e4633] rounded-[2px] mb-3">
                  <div className="text-[11px] font-headline uppercase font-bold text-[#9a9079] mb-1.5">
                    What's Included:
                  </div>
                  <ul className="space-y-1">
                    {combo.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="font-body text-[13px] text-[#e4e2e4] flex items-center gap-2">
                        <span className="text-[#f7c61e] font-headline text-[10px]">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-[#4e4633] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[26px] font-bold text-[#f7c61e] tabular-nums">
                      ₨ {combo.comboPrice.toFixed(2)}
                    </span>
                    <span className="font-headline text-[15px] text-[#9a9079] line-through tabular-nums">
                      ₨ {combo.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-body text-[11px] text-[#e4e2e4] font-semibold">
                    Customer saves ₨ {savings.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onOrderCombo(combo)}
                  className="h-10 px-4 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[14px] uppercase tracking-wider rounded-[2px] hover:bg-[#ffe6a8] transition-none cursor-pointer"
                >
                  Order This Combo
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
