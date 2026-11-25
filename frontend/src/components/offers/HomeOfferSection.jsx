import React, { useState } from 'react';
import HomeOfferSkeleton from './HomeOfferSkeleton';
import { getDiscountHeadline, getDiscountSubline, getMinOrderLine } from '@/utils/Helpers';

/**
 * Premium offer section — "ticket" concept.
 * CityVibe sells tickets and table reservations, so the offer is a ticket:
 * banner on the left, a perforated stub on the right that carries the deal,
 * the coupon code and the CTA. Stacks vertically on mobile.
 *
 * Optional offer fields used if present: offer.code, offer.endDate | validTill | expiresAt
 */

const formatEnd = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short',year:"numeric",timeZone:"UTC"});
};

// True ticket cut-outs via mask, so the page background shows through.
const ticketCss = `
.cv-cut-img{
  -webkit-mask:
    radial-gradient(circle 14px at 0 100%,#0000 97%,#000) bottom left/51% 100% no-repeat,
    radial-gradient(circle 14px at 100% 100%,#0000 97%,#000) bottom right/51% 100% no-repeat;
          mask:
    radial-gradient(circle 14px at 0 100%,#0000 97%,#000) bottom left/51% 100% no-repeat,
    radial-gradient(circle 14px at 100% 100%,#0000 97%,#000) bottom right/51% 100% no-repeat;
}
.cv-cut-stub{
  -webkit-mask:
    radial-gradient(circle 14px at 0 0,#0000 97%,#000) top left/51% 100% no-repeat,
    radial-gradient(circle 14px at 100% 0,#0000 97%,#000) top right/51% 100% no-repeat;
          mask:
    radial-gradient(circle 14px at 0 0,#0000 97%,#000) top left/51% 100% no-repeat,
    radial-gradient(circle 14px at 100% 0,#0000 97%,#000) top right/51% 100% no-repeat;
}
@media (min-width:1024px){
  .cv-cut-img{
    -webkit-mask:
      radial-gradient(circle 14px at 100% 0,#0000 97%,#000) top/100% 51% no-repeat,
      radial-gradient(circle 14px at 100% 100%,#0000 97%,#000) bottom/100% 51% no-repeat;
            mask:
      radial-gradient(circle 14px at 100% 0,#0000 97%,#000) top/100% 51% no-repeat,
      radial-gradient(circle 14px at 100% 100%,#0000 97%,#000) bottom/100% 51% no-repeat;
  }
  .cv-cut-stub{
    -webkit-mask:
      radial-gradient(circle 14px at 0 0,#0000 97%,#000) top/100% 51% no-repeat,
      radial-gradient(circle 14px at 0 100%,#0000 97%,#000) bottom/100% 51% no-repeat;
            mask:
      radial-gradient(circle 14px at 0 0,#0000 97%,#000) top/100% 51% no-repeat,
      radial-gradient(circle 14px at 0 100%,#0000 97%,#000) bottom/100% 51% no-repeat;
  }
}
`;

const HomeOfferSection = ({ offer, loading, onExplore, viewAllHref = '#' }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (loading) return <HomeOfferSkeleton />;

  const shouldRender =
    offer && offer.isActive && offer.displayOnHome && offer.bannerImageUrl?.url;
  if (!shouldRender) return null;

  const headline = getDiscountHeadline(offer);
  const subline = getDiscountSubline(offer);
  const minOrderLine = getMinOrderLine(offer);
  const ctaLabel = 'Explore offer';
  const endLabel = formatEnd(offer.endDate || offer.validTill || offer.expiresAt);
  const code = offer.code || offer.couponCode;

  const handleExplore = () => {
    if (onExplore) onExplore(offer);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — code stays visible to copy manually */
    }
  };

  return (
    <section
      aria-labelledby="cityvibe-offers-heading"
      className="w-full pt-12 sm:pt-16 lg:pt-20"
    >
      <style>{ticketCss}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <h2
              id="cityvibe-offers-heading"
              className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
            >
              Save on your next event or table
            </h2>
            <p className="mt-1.5 text-sm text-neutral-600 sm:text-base">
              Offers on tickets and restaurant bookings, live right now.
            </p>
          </div>

          <a
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded text-sm font-semibold text-neutral-900 transition-colors hover:text-[#6748E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6748E4] focus-visible:ring-offset-2"
          >
            View all offers
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </a>
        </div>

        {/* Ticket */}
        <article className="group/ticket flex flex-col drop-shadow-[0_18px_30px_rgba(103,72,228,0.18)] lg:flex-row">
          {/* Banner panel */}
          <div className="cv-cut-img relative aspect-[16/10] w-full overflow-hidden rounded-t-[28px] bg-neutral-900 sm:aspect-[16/8] lg:aspect-auto lg:min-h-[380px] lg:flex-1 lg:rounded-l-[28px] lg:rounded-tr-none">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800" />
            )}

            <img
              src={offer.bannerImageUrl.url}
              alt={`${offer.title} — CityVibe offer`}
              onLoad={() => setImgLoaded(true)}
              fetchPriority="high"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-[transform,opacity] duration-700 ease-out group-hover/ticket:scale-[1.03] motion-reduce:transition-none ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* One gradient, only where the title sits */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 pb-8 sm:p-8 sm:pb-10 lg:pb-8">
              <p className="max-w-xl capitalize text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-3xl">
                {offer.title}
              </p>
            </div>
          </div>

          {/* Stub */}
          <div className="cv-cut-stub relative flex w-full flex-col justify-between gap-6 rounded-b-[28px] bg-[#6748E4] p-6 pt-8 text-white sm:p-8 sm:pt-10 lg:w-[360px] lg:shrink-0 lg:rounded-b-none lg:rounded-r-[28px] lg:p-9">
            {/* Perforation */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-6 right-6 top-0 border-t-2 border-dashed border-white/35 lg:bottom-6 lg:left-0 lg:right-auto lg:top-6 lg:border-l-2 lg:border-t-0"
            />

            <div>
              <p className="text-sm font-medium text-white/80">
                {endLabel ? `Ends ${endLabel}` : 'For a limited time'}
              </p>

              <h3 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                {headline}
              </h3>

              {subline && (
                <p className="mt-3 text-lg font-semibold text-white">{subline}</p>
              )}
              {minOrderLine && (
                <p className="mt-1 text-sm text-white/75">{minOrderLine}</p>
              )}
            </div>

            <div className="space-y-3">
              {code && (
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={`Copy coupon code ${code}`}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-white/50 px-4 py-3 text-left transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6748E4]"
                >
                  <span className="font-mono text-base font-semibold tracking-wider">
                    {code}
                  </span>
                  <span className="text-sm font-medium text-white/85" aria-live="polite">
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#4B2FC4] transition-colors hover:bg-neutral-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6748E4] motion-reduce:transition-none"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomeOfferSection;