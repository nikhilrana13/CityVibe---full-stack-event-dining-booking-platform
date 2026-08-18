import { CalendarDays, Check, Clock3, Sparkles } from 'lucide-react';
import React from 'react';
import ReactMarkdown from "react-markdown";


const StepTwo = ({ bookingType, question, AgentReply, isLoading }) => {
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
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </div>
              ) : (
                <div className="text-[13px] leading-6 text-slate-600">
                  <ReactMarkdown
                    components={{
                      ul: ({ children }) => (
                        <ul className="mt-2 space-y-2">
                          {children}
                        </ul>
                      ),

                      li: ({ children }) => (
                        <li className="flex items-start gap-2">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                          <span>{children}</span>
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-900">
                          {children}
                        </strong>
                      ),

                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {AgentReply}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;


