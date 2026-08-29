import { Tag } from 'lucide-react'

const OfferEmptyState = () => {
  return (
   <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-gray-100 bg-gradient-to-b from-[#faf9ff] via-white to-white px-6 py-12 text-center">
  {/* Icon */}
  <div className="relative mb-6">
    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6a4dff] to-[#8b5cf6] shadow-[0_12px_30px_rgba(106,77,255,0.20)]">
      <Tag className="h-9 w-9 text-white" strokeWidth={1.8} />
    </div>

    {/* decorative dot */}
    <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-[#22c55e] ring-4 ring-white" />
  </div>

  {/* Heading */}
  <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e] sm:text-2xl">
    No offers right now
  </h3>

  {/* Description */}
  <p className="mt-3 max-w-[340px] text-sm leading-6 text-gray-500">
    We don't have any active offers for you at the moment.
    Keep exploring CityVibe — exciting deals are on the way.
  </p>

  {/* Bottom hint */}
  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e9e5ff] bg-[#f7f5ff] px-4 py-2">
    <span className="h-1.5 w-1.5 rounded-full bg-[#6a4dff]" />
    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6a4dff]">
      Stay tuned for new deals
    </span>
  </div>

</div>
  );
}

export default OfferEmptyState;
