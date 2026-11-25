import React from 'react';

const HomeOfferSkeleton = () => (
  <section aria-hidden="true" className="w-full pt-12 sm:pt-16 lg:pt-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div className="space-y-2">
          <div className="h-7 w-64 animate-pulse rounded bg-neutral-200 sm:h-8 sm:w-96" />
          <div className="h-4 w-48 animate-pulse rounded bg-neutral-200 sm:w-80" />
        </div>
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="aspect-[16/10] w-full animate-pulse rounded-t-[28px] bg-neutral-200 sm:aspect-[16/8] lg:aspect-auto lg:min-h-[380px] lg:flex-1 lg:rounded-l-[28px] lg:rounded-tr-none" />
        <div className="flex min-h-[300px] w-full flex-col justify-between rounded-b-[28px] bg-neutral-300 p-6 lg:w-[360px] lg:shrink-0 lg:rounded-b-none lg:rounded-r-[28px] lg:p-9">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
            <div className="h-14 w-44 animate-pulse rounded bg-neutral-200" />
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="h-12 w-full animate-pulse rounded-xl bg-neutral-200" />
        </div>
      </div>
    </div>
  </section>
);

export default HomeOfferSkeleton;