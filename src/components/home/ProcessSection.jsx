import React, { memo } from "react";
import hero3 from "../../assets/home/Rectangle 22.png";
import third1 from "../../assets/home/third1.webp";
import third2 from "../../assets/home/third2.webp";
import third3 from "../../assets/home/third3.webp";
import third4 from "../../assets/home/third4.webp";
import third5 from "../../assets/home/third5.webp";
import third6 from "../../assets/home/third6.webp";

const ProcessSection = () => {
  return (
    <div className="relative w-full h-auto flex py-10 overflow-hidden antialiased">

      {/* BACKGROUND IMAGE */}
      <img
        src={hero3}
        alt="background"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-5 h-auto w-full items-center text-white">

        <div className="flex gap-2 md:gap-4 items-center justify-center">
          <img
            src={third1}
            alt="section icon"
            decoding="async"
            className="w-5 h-auto"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What We Provide
          </h2>

          <img
            src={third1}
            alt="section icon"
            decoding="async"
            className="w-5 h-auto"
          />
        </div>

        <h3 className="text-2xl lg:text-3xl font-semibold text-white">
          Pet Diagnostic Process
        </h3>

        <p className="text-center text-xs px-3">
          A simple, structured diagnostic workflow designed for accuracy,
          speed, and reliable veterinary outcomes.
        </p>

        {/* PROCESS FLOW */}
        <div className="flex flex-col items-center justify-center lg:flex-row gap-6">

          <div className="flex flex-col items-center text-center">
            <img
              src={third2}
              decoding="async"
              loading="lazy"
              className="w-[150px]"
              alt="Collect of blood sample image"
            />
            <p>Collect of Blood Sample</p>
          </div>

          <img
            src={third6}
            decoding="async"
            loading="lazy"
            className="w-[50px] rotate-90 lg:rotate-0 lg:mb-6"
            alt="Arrow icon"
          />

          <div className="flex flex-col items-center text-center">
            <img
              src={third3}
              decoding="async"
              loading="lazy"
              className="w-[150px]"
              alt="Extraction of dna image"
            />
            <p>Extraction of DNA</p>
          </div>

          <img
            src={third6}
            decoding="async"
            loading="lazy"
            className="w-[50px] rotate-90 lg:rotate-0 lg:mb-6"
            alt="Arrow icon"
          />

          <div className="flex flex-col items-center text-center">
            <img
              src={third4}
              decoding="async"
              loading="lazy"
              className="w-[150px]"
              alt="PCR amplification image"
            />
            <p>PCR Amplification</p>
          </div>

          <img
            src={third6}
            decoding="async"
            loading="lazy"
            className="w-[50px] rotate-90 lg:rotate-0 lg:mb-6"
            alt="Arrow icon"
          />

          <div className="flex flex-col items-center text-center">
            <img
              src={third5}
              decoding="async"
              loading="lazy"
              className="w-[150px]"
              alt="Get reports image"
            />
            <p>Get Reports</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(ProcessSection);