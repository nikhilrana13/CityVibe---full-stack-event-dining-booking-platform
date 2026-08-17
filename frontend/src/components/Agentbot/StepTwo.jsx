import { CalendarDays, Check, Clock3, Sparkles } from 'lucide-react';
import React from 'react';

const StepTwo = ({bookingType,question}) => {
  return (
     <div className="flex min-h-full flex-col animate-in fade-in duration-300">
      {/* Step indicator */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-black">
            {bookingType === "event" ? "Event bookings" : "Dining bookings"}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Your conversation with CityVibe AI
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500">
          Step 2 of 2
        </span>
      </div>

      {/* Conversation */}
      <div className="flex flex-1 flex-col gap-5">
        {/* User Question - RIGHT */}
        <div className="flex justify-end">
          <div className="max-w-[82%]">
            <div className="mb-1.5 flex justify-end">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                You
              </span>
            </div>

            <div className="rounded-[18px] rounded-tr-md bg-slate-900 px-4 py-3 text-[13px] leading-5 text-white shadow-lg shadow-slate-900/10">
              {question}
            </div>
          </div>
        </div>

        {/* Agent Response - LEFT */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#000000] text-white shadow-md shadow-blue-500/20">
            <Sparkles size={14} />
          </div>

          <div className="max-w-[86%]">
            <div className="mb-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                CityVibe AI
              </span>
            </div>

            <div className="rounded-[18px] rounded-tl-md border border-slate-100 bg-slate-50 px-4 py-3.5 text-[13px] leading-6 text-slate-600">
              <p>
                You have a confirmed booking for{" "}
                <span className="font-semibold text-slate-900">
                  Diljit Dosanjh Dil-Luminati Tour Chandigarh
                </span>
                .
              </p>

              <div className="mt-3 space-y-2.5 border-t border-slate-200/70 pt-3">
                <InfoRow
                  icon={<CalendarDays size={13} />}
                  text="January 2, 2027"
                />

                <InfoRow
                  icon={<Clock3 size={13} />}
                  text="7:30 PM"
                />

                <InfoRow
                  icon={<Check size={13} />}
                  text="2 × Silver Zone tickets"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;


function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
      <span className="text-blue-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}