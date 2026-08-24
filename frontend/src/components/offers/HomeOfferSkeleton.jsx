import React from 'react';

const HomeOfferSkeleton = () => {
  return (
    <section aria-hidden="true" className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-3 h-7 w-48 animate-pulse rounded-md bg-slate-200 sm:h-8 sm:w-64" />
          </div>
          <div className="hidden h-4 w-28 animate-pulse rounded-full bg-slate-200 sm:block" />
        </div>
 
        <div className="relative w-full overflow-hidden rounded-[24px] bg-slate-200 sm:rounded-[28px]">
          <div className="aspect-[4/5] w-full animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 sm:aspect-[16/7]" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-10">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/30" />
            <div className="h-9 w-40 animate-pulse rounded-md bg-white/30 sm:h-11 sm:w-56" />
            <div className="h-4 w-52 animate-pulse rounded-md bg-white/20" />
            <div className="h-11 w-36 animate-pulse rounded-full bg-white/30 sm:mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeOfferSkeleton;
