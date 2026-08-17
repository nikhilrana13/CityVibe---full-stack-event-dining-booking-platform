"use client"
import React, { useState } from 'react';
import { ArrowLeft, Sparkles, X,} from "lucide-react";
import StepOne from './StepOne';
import StepTwo from './StepTwo';



export const bookingQuestions = {
  event: [
    "Which events have I booked?",
    "What is my next event?",
    "Show my confirmed event bookings",
    "Show my cancelled event bookings",
  ],
  dining: [
    "Which restaurants have I booked?",
    "What is my next dining booking?",
    "Show my confirmed dining bookings",
    "Show my cancelled dining bookings",
  ],
};
const BookingAgentChatInterface = ({onClose,}) => {
     const [step,setStep] = useState(1)
     const [bookingType,setBookingType] = useState("event")
     const [selectedQuestion,setSelectedQuestion] = useState("")

  const handleTypeChange = (type)=>{
    setBookingType(type)
    setSelectedQuestion("")
  }

  const handleQuestionClick = (question)=>{
    setSelectedQuestion(question)
    setStep(2)
  }
  
  return (
      <div onClick={onClose} className="fixed inset-0 z-[100] flex items-end justify-end bg-black/20 p-3 backdrop-blur-[3px] sm:p-5">
      <div onClick={(e) => e.stopPropagation()} className="relative flex h-[min(760px,calc(100vh-24px))] w-full max-w-[470px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
              </button>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#000000] text-white shadow-lg shadow-blue-500/25">
                <Sparkles size={19} />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold tracking-tight text-slate-900">
                  CityVibe AI
                </h2>

                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Assistant
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Your personal booking assistant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        {/* Content */}
        <div className="relative flex-1 overflow-y-auto px-5 py-6">
          {step === 1 ? (
            <StepOne
              bookingType={bookingType}
              onTypeChange={handleTypeChange}
              onQuestionClick={handleQuestionClick}
            />
          ) : (
            <StepTwo
              bookingType={bookingType}
              question={selectedQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingAgentChatInterface;
