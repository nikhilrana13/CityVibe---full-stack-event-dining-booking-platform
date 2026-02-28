import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import slugify from "slugify"

const HeroSlider = ({ events = []}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps:false,
    dragFree:false
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  // Auto slide
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = setInterval(() => {
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
    } else {
      emblaApi.scrollTo(0) // jump to first smoothly
    }
  }, 4000)
    return () => clearInterval(autoplay)
  }, [emblaApi])

  if (!events.length) return null
  return (
    <div className="relative w-full overflow-hidden">
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {events.map((event,index) => (
          <div key={`${event._id}-${index}`} className="min-w-full  transition-all duration-700 ease-out relative">
            {/* for mobile*/}
            <div className="md:hidden relative h-[75vh] flex items-end px-5 pb-10">
              {/* Background Image */}
              <img src={event?.coverimage} loading={index === 0 ? "eager" : "lazy"} decoding="async" alt={event?.title} className="absolute inset-0 w-full h-full object-cover"/>
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
              {/* Content */}
              <div className="relative z-10 text-white space-y-3">
                <p className="text-sm opacity-90">
                  {new Date(event?.startDate).toDateString()}
                </p>
                <h1 className="text-4xl font-extrabold leading-tight">
                  {event?.title}
                </h1>
                <p className="text-base font-medium">
                  {event?.venue} • {event?.city}
                </p>
                <p className="text-lg font-semibold">
                  ₹{event?.minPrice} onwards
                </p>
                <button
                  onClick={() =>
                    navigate(
                      `/events/${event?._id}/${slugify(event?.title || "", {
                        lower: true,
                        strict: true
                      })}`
                    )
                  }
                  className="mt-3 px-6 py-3 bg-white backdrop-blur-md shadow-lg  text-black rounded-xl font-semibold active:scale-95 transition"
                >
                  Book tickets
                </button>
              </div>
            </div>
            {/* for desktop */}
            <div className="hidden  md:flex relative h-[80vh] items-center justify-between px-32">

              {/* Background Blur */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-3xl scale-110 opacity-30 bg-gradient-to-t from-black/90 via-black/60 to-black/20"
                style={{ backgroundImage: `url(${event?.coverimage})` }}
              />

              {/* Left Content */}
              <div className="relative z-10 max-w-xl space-y-6">
                <p className="font-medium text-lg">
                  {new Date(event?.startDate).toDateString()}
                </p>

                <h1 className="text-5xl font-bold leading-tight">
                  {event?.title}
                </h1>

                <p className="text-xl font-medium">
                  {event?.venue} • {event?.city}
                </p>

                <p className="text-lg font-semibold">
                  ₹{event?.minPrice} onwards
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/events/${event?._id}/${slugify(event?.title || "", {
                        lower: true,
                        strict: true
                      })}`
                    )
                  }
                  className="px-8 py-4 bg-black text-white rounded-xl hover:bg-black/90 transition"
                >
                  Book tickets
                </button>
              </div>

              {/* Right Image Card */}
              <div className="relative z-10 w-[320px] h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={event?.coverimage}
                  alt={event?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
    {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute hidden md:block left-8 top-1/2 -translate-y-1/2  p-3 "
      >
         <ChevronLeft size={28} />
       </button>

       <button
         onClick={scrollNext}
        className="absolute hidden md:block right-8 top-1/2 -translate-y-1/2 p-3 "
      >
        <ChevronRight size={28} />
       </button>
    {/*dots*/}
    <div className="absolute bottom-6 md:pb-10 w-full flex justify-center gap-3">
      {events.map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === selectedIndex
              ? "w-8 bg-white md:bg-black"
              : "w-2 bg-white/40 md:bg-gray-600"
          }`}
        />
      ))}
    </div>
  </div>
  )
}

export default HeroSlider