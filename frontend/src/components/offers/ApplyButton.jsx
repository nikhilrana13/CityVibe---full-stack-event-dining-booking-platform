import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import React from 'react';

const ApplyButton = ({isApplied,isApplying,onClick}) => {
    if (isApplied) {
    return (
      <button type="button" onClick={onClick} disabled={isApplying} className="inline-flex items-center gap-1.5 rounded-lg
          border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition-all hover:bg-green-100
          active:scale-[0.97]"
      >
        <CheckCircle2
          className="h-4 w-4"
          strokeWidth={2.5}
        />
        Applied
      </button>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={isApplying} aria-busy={isApplying}
      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white
        transition-all duration-150 hover:bg-indigo-700 active:scale-[0.97]  disabled:cursor-not-allowed disabled:bg-indigo-400
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
      {isApplying ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
          Applying
        </>
      ) : (
        <>
          Apply
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.5} />
        </>
      )}
    </button>
  );
}

export default ApplyButton;
