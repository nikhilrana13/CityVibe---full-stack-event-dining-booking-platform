import React from 'react';
import music from "/categories/music.avif"
import comedy from "/categories/comedy.avif"
import sports from "/categories/sports.avif"
import performances from "/categories/performances.avif"
import fooddrink from "/categories/food.avif"
import socialmixers from "/categories/social.avif"
import pets from "/categories/pets.avif"
import openmics from "/categories/openmics.avif"
import nightlife from "/categories/nightlife.avif"
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';


const CategoriesSection = () => {
    const navigate = useNavigate()

    return (
        <div className='px-4  py-4 w-full mx-auto max-w-[1300px]'>
            <h3 className='text-[1.8rem] font-[500] mb-6'>Explore Events</h3>
            {/* categories grid */}
            <div className="grid gap-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {[
                    { name: "music", src: music },
                    { name: "comedy", src: comedy },
                    { name: "sports", src: sports },
                    { name: "performances", src: performances },
                    { name: "fooddrink", src: fooddrink },
                    { name: "socialmixers", src: socialmixers },
                    { name: "pets", src: pets },
                    { name: "openmics", src: openmics },
                    { name: "nightlife", src: nightlife },
                    {name:"celebrations",src:music}
                ].map((cat, idx) => (
                    <div key={idx} onClick={() => navigate(`/events/category/${slugify(cat.name,{lower:true})}`)} className="flex flex-col items-center justify-center transition-all duration-300 h-[160px] cursor-pointer">
                        <img src={cat.src} alt={cat.name} className="w-full h-full object-contain mb-3" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesSection;
