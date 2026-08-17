import { CalendarDays, ChevronRight, Sparkles, Utensils } from 'lucide-react';
import React from 'react';
import { bookingQuestions } from './BookingAgentChatInterface';
import TypeButton from './TypeButton';
import { useSelector } from 'react-redux';

const StepOne = ({bookingType,onTypeChange,onQuestionClick}) => {
    const questions = bookingQuestions[bookingType]
    const user = useSelector((state)=>state.Auth.user)


  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Welcome */}
      <div className="mb-7">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5">
          <Sparkles size={12} className="text-black" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-black">
            AI Booking Assistant
          </span>
        </div>

        <h1 className="max-w-[350px] text-[27px] font-bold leading-[1.12] tracking-[-0.8px] text-slate-900">
          Hey , {user?.name || "User"}
          <br />
          How can I help with your bookings?
        </h1>

        <p className="mt-3 max-w-[370px] text-[13px] leading-5 text-slate-500">
          Ask me about your upcoming events, restaurant reservations, tickets,
          and booking details.
        </p>
      </div>

      {/* Booking Type */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Choose booking type
          </p>

          <span className="text-[10px] text-slate-400">Step 1 of 2</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TypeButton
            active={bookingType === "event"}
            icon={<CalendarDays size={18} />}
            title="Events"
            subtitle="Concerts & experiences"
            onClick={() => onTypeChange("event")}
          />

          <TypeButton
            active={bookingType === "dining"}
            icon={<Utensils size={18} />}
            title="Dining"
            subtitle="Restaurant reservations"
            onClick={() => onTypeChange("dining")}
          />
        </div>
      </div>

      {/* Suggested Questions */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Suggested questions
          </p>

          <Sparkles size={13} className="text-slate-300" />
        </div>

        <div className="space-y-2">
          {questions.map((question) => (
            <button
              key={question}
              onClick={() => onQuestionClick(question)}
              className="group flex w-full items-center justify-between rounded-2xl border border-slate-200/80
                bg-white px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-blue-200
                hover:bg-blue-50/40 hover:shadow-[0_8px_25px_rgba(37,99,235,0.07)]">
              <span className="pr-4 text-[12px] font-medium text-slate-600 transition group-hover:text-slate-900">
                {question}
              </span>

              <ChevronRight
                size={15}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepOne;
