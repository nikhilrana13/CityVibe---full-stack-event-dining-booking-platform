import React, { useState } from 'react';
import HomeOfferSkeleton from './HomeOfferSkeleton';
import { getDiscountHeadline, getDiscountSubline, getMinOrderLine } from '@/utils/Helpers';


 
// ---- Mock data (swap for RTK Query / Axios response) -----------------------
const MOCK_OFFER = {
  title: "Weekend Live Music Pass",
  discountType: "percentage",
  discountValue: 20,
  maxDiscount: 200,
  minOrderAmount: 500,
  bannerImageUrl: {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop",
    fileId: "mock-banner-01",
  },
  startDate: "2026-08-20",
  endDate: "2026-09-30",
  isActive: true,
  displayOnHome: true,
};

const HomeOfferSection = ({offer = MOCK_OFFER,isLoading = false,onExplore,viewAllHref = "#",}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  if (isLoading) return <HomeOfferSkeleton />;
  const shouldRender = offer && offer.isActive && offer.displayOnHome && offer.bannerImageUrl?.url;
  if (!shouldRender) return null;
 
  const headline = getDiscountHeadline(offer);
  const subline = getDiscountSubline(offer);
  const minOrderLine = getMinOrderLine(offer);
  const ctaLabel = "Explore Offer";
 
  const handleExplore = () => {
    if (onExplore) onExplore(offer);
  };
  return (
    <section aria-labelledby="cityvibe-offers-heading" className="w-full pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6748E4]">
              Exclusive Offers
            </p>
            <h2
              id="cityvibe-offers-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
            >
              Make your next CityVibe experience even better
            </h2>
          </div>
 
          <a
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#6748E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6748E4] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 rounded"
          >
            View All Offers
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
 
        {/* Offer card */}
        <article
          className="group relative w-full overflow-hidden rounded-[24px] bg-neutral-900 shadow-[0_20px_50px_-15px_rgba(19,55,236,0.25)] ring-1 ring-black/5 sm:rounded-[28px]"
        >
          {/* Aspect ratio: cinematic vertical on mobile, wide hero on desktop */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/7]">
            {/* Skeleton shimmer behind image until it loads */}
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800" />
            )}
 
            <img
              src={offer.bannerImageUrl.url}
              alt={`${offer.title} — CityVibe promotional offer`}
              onLoad={() => setImgLoaded(true)}
              className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
 
            {/* Cinematic gradient overlays for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent sm:from-black/75 sm:via-black/20 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
 
            {/* Subtle inner highlight border, premium glass edge */}
            <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 sm:rounded-[28px]" />
 
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:justify-center sm:p-10 lg:p-14">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md ring-1 ring-white/15">
                  Limited Time Offer
                </span>
 
                <h3 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {headline}
                </h3>
 
                <div className="mt-3 space-y-1">
                  {subline && (
                    <p className="text-base font-medium text-white/90 sm:text-lg">
                      {subline}
                    </p>
                  )}
                  <p className="text-sm font-medium text-white/70 sm:text-base">
                    {offer.title}
                  </p>
                  {minOrderLine && (
                    <p className="text-xs text-white/60 sm:text-sm">{minOrderLine}</p>
                  )}
                </div>
 
                <button
                  type="button"
                  onClick={handleExplore}
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#6748E4] px-7 text-sm font-semibold text-white shadow-lg shadow-[#1337EC]/30 transition-all duration-300 hover:bg-[#6748E4] hover:shadow-xl hover:shadow-[#6748E4]/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:mt-8"
                >
                  {ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HomeOfferSection ;
