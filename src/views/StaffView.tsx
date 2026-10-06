import React from 'react';
import { StaffMember } from '../types';

interface StaffViewProps {
  staff: StaffMember[];
  onToggleStatus: (staffId: string) => void;
}

export const StaffView: React.FC<StaffViewProps> = ({ staff, onToggleStatus }) => {
  return (
    <div className="flex flex-col w-full pb-8">
      <div className="my-4">
        <h1 className="font-headline text-[24px] font-bold text-[#e4e2e4] uppercase tracking-wide">
          Active Staff & Terminal Allocations
        </h1>
        <p className="font-body text-[13px] text-[#d1c5ac]">
          Current shift roster, assigned kitchen positions, and clock-in logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-[#1f1f21] border border-[#4e4633] p-5 rounded-[2px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffe6a8] flex items-center justify-center font-headline font-bold text-[#3d2f00] text-[16px]">
                    {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-body text-[16px] font-bold text-[#e4e2e4]">
                      {s.name}
                    </h3>
                    <span className="font-body text-[12px] text-[#d1c5ac]">
                      {s.role}
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center justify-center h-6 px-2.5 rounded-[2px] font-headline text-[12px] uppercase font-bold tracking-wide ${
                  s.status === 'active'
                    ? 'bg-[#f7c61e] text-[#241a00]'
                    : s.status === 'break'
                    ? 'border border-[#f7c61e] text-[#f7c61e]'
                    : 'border border-[#4e4633] text-[#d1c5ac]'
                }`}>
                  {s.status}
                </span>
              </div>

              <div className="bg-[#1b1b1d] p-3 border border-[#4e4633] rounded-[2px] mt-3 space-y-1 text-[13px] font-body text-[#d1c5ac]">
                <div className="flex justify-between">
                  <span>Assigned Station:</span>
                  <span className="font-semibold text-[#e4e2e4]">{s.terminalAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Shift:</span>
                  <span>{s.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span>Clocked In At:</span>
                  <span className="font-headline font-bold text-[#f7c61e] tabular-nums">{s.clockInTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-[#4e4633] flex items-center justify-between">
              <span className="text-[11px] text-[#9a9079]">PIN Access: Authorized</span>
              <button
                onClick={() => onToggleStatus(s.id)}
                className="h-8 px-3 bg-[#353437] text-[#e4e2e4] border border-[#4e4633] font-headline text-[12px] uppercase font-semibold rounded-[2px] hover:bg-[#4e4633] cursor-pointer"
              >
                {s.status === 'active' ? 'Set Break' : 'Set Active'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
