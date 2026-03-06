import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';



const ImageViewerDialog = ({ images, onClose }) => {
    const [index, setIndex] = useState(0);
    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };
    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    // ESC close support
    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
            {/* Desktop Top */}
            <div className="hidden md:flex justify-end p-4 text-white">
                <button onClick={onClose} className="flex items-center gap-2 text-lg">
                    <IoClose size={24} />
                    Close
                </button>
            </div>
            {/* Desktop Image */}
            <div className="hidden md:flex items-center justify-center flex-1 relative select-none">
                <button onClick={prev} className="absolute left-10 text-white border border-white/40 rounded-full p-3 hover:bg-white/10">
                    <ChevronLeft size={28} />
                </button>
                <img src={images[index]} className="max-h-[70vh] object-contain" />
                <button onClick={next} className="absolute right-10 text-white border border-white/40 rounded-full p-3 hover:bg-white/10" >
                    <ChevronRight size={28} />
                </button>
            </div>
            {/* Desktop thumbnails */}
            <div className="hidden md:flex justify-center gap-3 pb-8">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        onClick={() => setIndex(i)}
                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-4 ${i === index
                            ? "border-[#8B8B93]"
                            : "border-[#2C2C2E] opacity-60"
                            }`}
                    />
                ))}
            </div>
            {/* Mobile Top */}
            <div className="md:hidden flex justify-between items-center p-4 text-white">
                <button onClick={onClose}>
                    <IoClose size={28} />
                </button>
            </div>
            {/* Mobile Image */}
            <div className="md:hidden flex items-center justify-center flex-1 px-4 select-none">
            <img src={images[index]}  className="max-h-[75vh] w-full object-contain"/>
            </div>
            {/* controls */}
            <div className="md:hidden flex items-center justify-center gap-6 pb-6 text-white">
            <button onClick={prev} className="border border-white/40 rounded-full p-3 active:scale-95">
            <ChevronLeft size={24} />
            </button>
            <p className="text-lg font-medium">
                    {index + 1} / {images.length}
            </p>
            <button onClick={next} className="border border-white/40 rounded-full p-3 active:scale-95">
                    <ChevronRight size={24} />
            </button>
            </div>
        </div>

    );
}

export default ImageViewerDialog;
