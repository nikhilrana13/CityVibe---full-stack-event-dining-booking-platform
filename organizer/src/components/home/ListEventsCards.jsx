import React from 'react'
import musicImg from "../../assets/music.svg"
import partyImg from "../../assets/party.svg"
import comedyImg from "../../assets/comedy.webp"
import foodImg from "../../assets/food.webp"
import celebrations from "../../assets/celebrations.webp"
import danceImg from "../../assets/dance.webp"

const ListEventsCards = () => {
const categories = [
  { name: "Music", img: musicImg },
  { name: "Parties", img: partyImg },
  { name: "Comedy", img: comedyImg },
  { name: "Food & Drinks", img: foodImg },
  { name: "Celebrations", img:celebrations },
  { name: "Performances", img: danceImg },
];


    return (
        <section className="relative w-full py-24 bg-gradient-to-br  from-[#0f051d]  via-[#1a0830]  to-[#140424]">
            {/* Section Heading */}
            <h2 className="text-center text-4xl sm:text-5xl font-semibold  text-white mb-16">
                List all your <span className="text-yellow-400">events</span> with us
            </h2>
            {/* Cards Grid */}
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
                {categories?.map((item, index) => (
                    <div key={index} className="relative w-[280px] h-[360px] rounded-[40px] border border-white/20  bg-white/5 backdrop-blur-xl overflow-hidden group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Radial Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,0,0.25),transparent_70%)] opacity-60"></div>
                        {/* Dotted Floor Effect */}
                        <div className="absolute bottom-0 left-0 w-full h-40 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:12px_12px] opacity-20"></div>
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            {/* SVG/Image */}
                            <div className="w-32 h-32 mb-10">
                            <img src={item.img} alt={item.name} className='object-cover' />
                            </div>
                            <h3 className="text-white text-3xl font-medium">
                                {item.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ListEventsCards