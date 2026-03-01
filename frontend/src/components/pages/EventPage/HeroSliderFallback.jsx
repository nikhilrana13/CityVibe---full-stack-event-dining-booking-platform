import { useLocationContext } from "../../../context/useLocationContext"
import { MapPin, Sparkles } from "lucide-react"

const HeroFallback = () => {
  const {location} = useLocationContext()
return(
      <div className="relative h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F4DC] via-[#FDFBF2] to-white" />
      {/* Soft Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-200/30 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-200/30 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white shadow-md rounded-2xl">
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          No Events in {location?.city}
        </h1>
        <p className="text-gray-600 text-lg">
          We’re working on bringing exciting experiences to your city.
          Try changing your location or check back soon.
        </p>
      </div>
    </div>

)}

export default HeroFallback