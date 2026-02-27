import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import qrcode from "../../../assets/qrcode.svg"

const Footer = () => {
    return (
        <footer className="w-full bg-[#1c1c1f]  text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl px-4 mx-auto ">
                {/* TOP SECTION */}
                <div className="flex  flex-col lg:flex-row justify-between items-center gap-12">
                    {/* Logo */}
                    <div className="text-3xl font-bold text-white tracking-tight">
                        City<span className="text-[#6748E4]">Vibe</span>
                        <div className="text-xs font-light tracking-[0.3em] text-gray-400 mt-1">
                            DISCOVER • DINE • CELEBRATE
                        </div>
                    </div>
                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition">Terms & Conditions</a>
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Contact Us</a>
                        <a href="/events/list-your-events" className="hover:text-white transition">List your events</a>
                    </div>
                    {/* QR Section */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg">
                            <img
                                src={qrcode}
                                alt="QR Code"
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                            Scan to download the app
                        </p>
                    </div>
                </div>
                {/* Divider */}
                <div className="border-t border-gray-700 my-10"></div>
                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-500">
                    <p className="text-center lg:text-left max-w-3xl">
                        By accessing this page, you confirm that you have read,
                        understood, and agreed to our Terms of Service, Cookie Policy,
                        Privacy Policy, and Content Guidelines. All rights reserved.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl text-gray-400">
                        <FaFacebookF className="hover:text-white transition cursor-pointer" />
                        <FaInstagram className="hover:text-white transition cursor-pointer" />
                        <FaXTwitter className="hover:text-white transition cursor-pointer" />
                        <FaYoutube className="hover:text-white transition cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;