import React from 'react'; 
const OfferCardShimmer = () => {
  return (
     <div className="flex w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(15,15,35,0.04)] sm:flex-row">
      <div className="relative flex shrink-0 flex-row items-center justify-between gap-3 bg-gray-50 px-5 py-4 sm:w-36 sm:flex-col sm:items-start sm:justify-center sm:gap-2 sm:px-4 sm:py-5 md:w-40">
        <div className="h-7 w-20 rounded-md bg-gray-200 sm:h-8 sm:w-24" />
        <div className="h-2.5 w-24 rounded bg-gray-200 sm:w-20" />
        <span aria-hidden="true" className="absolute right-0 top-3 bottom-3 hidden w-px bg-gray-200 sm:block" />
        <span aria-hidden="true" className="absolute bottom-0 left-3 right-3 h-px bg-gray-200 sm:hidden" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 px-5 py-4 sm:py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="h-4 w-40 rounded bg-gray-200 sm:w-48" />
            <div className="hidden h-6 w-20 shrink-0 rounded-md bg-gray-100 sm:block" />
          </div>
          <div className="h-3 w-full max-w-[240px] rounded bg-gray-100" />
          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            <div className="h-6 w-20 rounded-md bg-gray-100 sm:hidden" />
            <div className="h-3 w-24 rounded bg-gray-100" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="h-9 w-24 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default OfferCardShimmer;
