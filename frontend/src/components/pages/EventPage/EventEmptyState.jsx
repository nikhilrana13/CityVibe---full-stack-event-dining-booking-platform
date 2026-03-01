import {LuSearch } from "react-icons/lu"
import { motion } from "framer-motion"

const EventEmptyState = ({title,description,primaryLabel,onPrimaryCheck}) => {
  return (
    <div className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F9F4DC] via-[#FDFBF2] to-white">
      {/* Floating Animated Blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-purple-200/40 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute -bottom-24 -right-24 w-[350px] h-[350px] bg-yellow-200/40 blur-3xl rounded-full"
      />
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-10 max-w-[650px] text-center space-y-6"
      >
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        {/* Subtext */}
        <p className="text-gray-600 text-lg leading-relaxed">
         {description}
        </p>
        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrimaryCheck}
          className="mt-4 px-8 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 mx-auto shadow-lg"
        >
          <LuSearch size={18} />
          {primaryLabel}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default EventEmptyState