import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131315]/85 p-4">
      <div className="w-full max-w-lg bg-[#1f1f21] border border-[#f7c61e] p-6 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between pb-3 border-b border-[#4e4633] mb-4">
          <h2 className="font-headline text-[18px] uppercase font-bold text-[#f7c61e]">
            {type === 'terms' ? 'Arabian Broast • Operating Terms' : 'Arabian Broast • POS Privacy Policy'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#d1c5ac] hover:text-[#e4e2e4] text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto font-body text-[13px] text-[#d1c5ac] space-y-3 leading-relaxed pr-2">
          {type === 'terms' ? (
            <>
              <p>
                <strong>1. Terminal Operation:</strong> This POS terminal is configured for official staff use at Arabian Broast. All transactions logged are authoritative for fiscal end-of-day register balancing.
              </p>
              <p>
                <strong>2. Cash Reconciliation:</strong> Head Cashiers and Store Leads must verify register cash drawers at the beginning and end of each scheduled shift.
              </p>
              <p>
                <strong>3. Kitchen Dispatch SLAs:</strong> Standard fast-food kitchen dispatch targets are maintained at &lt; 10.0 minutes for counter broast and burger orders.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Customer Data Handling:</strong> Customer phone numbers and order histories are collected strictly for loyalty benefits and order delivery dispatch.
              </p>
              <p>
                <strong>2. Transaction Records:</strong> Audit trails and fiscal records comply with local sales tax regulations and are encrypted within the local terminal database.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#4e4633] mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 h-9 bg-[#f7c61e] text-[#241a00] font-headline font-bold text-[13px] uppercase rounded-[2px] hover:bg-[#ffe6a8] cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
