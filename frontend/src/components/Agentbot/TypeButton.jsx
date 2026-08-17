import { Check } from 'lucide-react';
import React from 'react';

const TypeButton = ({active, icon, title, subtitle, onClick }) => {
  return (
    <button type='button' onClick={onClick} className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${active ? "border-blue-200 bg-blue-50/70 shadow-[0_8px_25px_rgba(37,99,235,0.08)]" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50" }`}
    >
      {active && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#000000] text-white">
          <Check size={11} strokeWidth={3} />
        </div>
      )}
      <div
        className={`
          mb-3 flex h-9 w-9 items-center justify-center rounded-xl
          ${
            active
              ? "bg-[#000000] text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {icon}
      </div>

      <p className="text-[13px] font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
    </button>
  );
}

export default TypeButton;
