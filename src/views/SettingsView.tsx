import React, { useState } from 'react';

interface SettingsViewProps {
  shopStatus: 'open' | 'busy' | 'closed';
  onChangeShopStatus: (status: 'open' | 'busy' | 'closed') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ shopStatus, onChangeShopStatus }) => {
  const [storeName, setStoreName] = useState('Arabian Broast');
  const [terminalId, setTerminalId] = useState('Terminal 01');
  const [taxRate, setTaxRate] = useState(5);
  const [autoPrint, setAutoPrint] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-8 max-w-3xl">
      <div className="my-4">
        <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
          Store & Terminal Configuration
        </h1>
        <p className="font-body text-[13px] text-[#d1c5ac]">
          Operational parameters, tax rate calculation, and hardware printer interfacing.
        </p>
      </div>

      {savedMessage && (
        <div className="p-3 mb-4 bg-[#f7c61e]/15 border border-[#f7c61e] text-[#f7c61e] rounded-[2px] font-headline uppercase font-bold text-[14px]">
          ✓ Configuration settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store & Operating Status */}
        <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px]">
          <h2 className="font-headline text-[16px] uppercase font-bold text-[#e4e2e4] mb-3 pb-2 border-b border-[#4e4633]">
            Store Operational State
          </h2>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { id: 'open', label: 'Shop: Open', color: 'bg-[#f7c61e] text-[#241a00]' },
              { id: 'busy', label: 'Shop: Busy (Queue High)', color: 'bg-[#ffa726] text-[#241a00]' },
              { id: 'closed', label: 'Shop: Closed', color: 'bg-[#ffb4ab] text-[#690005]' }
            ].map((st) => (
              <button
                type="button"
                key={st.id}
                onClick={() => onChangeShopStatus(st.id as any)}
                className={`py-2 px-3 font-headline text-[13px] font-bold uppercase rounded-[2px] cursor-pointer transition-none ${
                  shopStatus === st.id
                    ? `${st.color} ring-1 ring-[#f7c61e]`
                    : 'bg-[#2a2a2c] text-[#d1c5ac] border border-[#4e4633]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                Store Title
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-body text-[14px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                Terminal Identifier
              </label>
              <input
                type="text"
                value={terminalId}
                onChange={(e) => setTerminalId(e.target.value)}
                className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-body text-[14px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Taxation & Currency */}
        <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px]">
          <h2 className="font-headline text-[16px] uppercase font-bold text-[#e4e2e4] mb-3 pb-2 border-b border-[#4e4633]">
            Taxation & POS Accounting
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                Sales Tax / GST Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full h-9 bg-[#303033] border border-[#4e4633] px-3 font-headline text-[16px] text-[#e4e2e4] rounded-[2px] focus:outline-none focus:border-[#f7c61e]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-headline uppercase text-[#d1c5ac] mb-1">
                Base Currency Symbol
              </label>
              <input
                type="text"
                disabled
                value="₨ (PKR)"
                className="w-full h-9 bg-[#2a2a2c] border border-[#4e4633] px-3 font-body text-[13px] text-[#d1c5ac] rounded-[2px] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Hardware & Printing */}
        <div className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px]">
          <h2 className="font-headline text-[16px] uppercase font-bold text-[#e4e2e4] mb-3 pb-2 border-b border-[#4e4633]">
            Thermal Receipt & KDS Printing
          </h2>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-body text-[14px] font-semibold text-[#e4e2e4]">
                Auto-generate Thermal Receipt
              </div>
              <div className="text-[12px] text-[#d1c5ac] font-body">
                Open thermal receipt modal immediately after charging order
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoPrint(!autoPrint)}
              className={`w-12 h-6 rounded-[2px] border transition-none flex items-center p-0.5 cursor-pointer ${
                autoPrint ? 'bg-[#f7c61e] border-[#f7c61e] justify-end' : 'bg-[#353437] border-[#4e4633] justify-start'
              }`}
            >
              <span className={`w-4 h-4 rounded-[1px] ${autoPrint ? 'bg-[#241a00]' : 'bg-[#d1c5ac]'}`} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="h-10 px-6 bg-[#f7c61e] text-[#241a00] font-headline font-bold uppercase text-[15px] tracking-wider rounded-[2px] hover:bg-[#ffe6a8] transition-none cursor-pointer"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};
