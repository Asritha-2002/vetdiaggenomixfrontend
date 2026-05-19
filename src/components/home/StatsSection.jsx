import React, { memo, useEffect, useState } from "react";
import hero2 from "../../assets/hero-sections-contact/contactsectionbgc-1.png";
import titleimg2 from "../../assets/home/second-sec-tit.png";
import image1 from "../../assets/home/image 4.png";
import image2 from "../../assets/home/image 5.png";
import image3 from "../../assets/home/image 6.png";
import image4 from "../../assets/home/image 7.png";

// Base API link configuration
const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

const StatsSection = () => {
  const [partners, setPartners] = useState([]);

  // Fetch live partner logos from the database
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${BASE_URL}/upload/partners`);
        const result = await response.json();
        if (response.ok && result.data) {
          setPartners(result.data);
        }
      } catch (error) {
        console.error("FAILED TO FETCH PARTNER LOGOS:", error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="relative w-full h-auto pb-10 overflow-hidden antialiased">

      {/* BACKGROUND */}
      <img
        src={hero2}
        alt="background"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* STATS */}
      <div className="relative z-10 flex flex-wrap gap-5 items-center justify-center mt-10 w-full">

        <div className="flex flex-col items-center justify-center bg-white p-6 w-[200px] shadow-md rounded-lg">
          <img src={image1} alt="customers" decoding="async" loading="lazy" className="w-[100px]" />
          <h3>
            <span className="text-2xl lg:text-3xl text-[#b50b0b] font-semibold">2000</span>
            <sup className="text-xl text-[#898888]">+</sup>
          </h3>
          <p className="font-bold">Happy Customers</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-[200px]">
          <img src={image2} alt="experience" decoding="async" loading="lazy" className="w-[100px]" />
          <h3>
            <span className="text-2xl lg:text-3xl text-[#b50b0b] font-semibold">2</span>
            <sup className="text-lg text-[#898888]">Years +</sup>
          </h3>
          <p className="font-bold">Experience</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-[200px]">
          <img src={image3} alt="pets served" decoding="async" loading="lazy" className="w-[100px]" />
          <h3>
            <span className="text-2xl lg:text-3xl text-[#b50b0b] font-semibold">1200</span>
            <sup className="text-xl text-[#898888]">+</sup>
          </h3>
          <p className="font-bold">Pets Served</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-[200px]">
          <img src={image4} alt="support" decoding="async" loading="lazy" className="w-[100px]" />
          <h3>
            <span className="text-2xl lg:text-3xl text-[#b50b0b] font-semibold">24</span>
            <sup className="text-xl text-[#898888]">hrs</sup>
          </h3>
          <p className="font-bold">Service Support</p>
        </div>

      </div>

      {/* NETWORK SECTION */}
      <div className="relative z-10 flex flex-col gap-4 items-center justify-center mt-5">

        <div className="flex gap-2 md:gap-4 items-center justify-center mt-5">
          <img src={titleimg2} alt="icon" decoding="async" loading="lazy" className="w-5 h-5" />

          <h3 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#b50b0b]">Our</span> Network
          </h3>

          <img src={titleimg2} alt="icon" decoding="async" loading="lazy" className="w-5 h-5" />
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold">
          Collaborative Partners
        </h2>

        <p className="text-center md:text-left">
          We work closely with leading veterinary institutions and partners to
          advance animal health
        </p>

        {/* PARTNERS INFINITE SCROLL */}
        <div className="overflow-hidden w-full">
          {partners.length > 0 && (
            <div className="flex gap-10 items-center animate-scroll whitespace-nowrap">
              
              {/* Set 1: Original map tracking API URLs */}
              {partners.map((partner, idx) => (
                <img 
                  key={`orig-${partner._id || idx}`} 
                  src={partner.url} 
                  alt={partner.name || "partner"} 
                  className="w-[150px] h-[120px] object-contain" 
                />
              ))}

              {/* Set 2: Duplicate map to preserve the seamless CSS loop */}
              {partners.map((partner, idx) => (
                <img 
                  key={`dup-${partner._id || idx}`} 
                  src={partner.url} 
                  alt={partner.name || "partner"} 
                  className="w-[150px] h-[120px] object-contain" 
                />
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default memo(StatsSection);