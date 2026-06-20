import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

// eager (above fold)
import HeroSection from "./home/HeroSection";
import WhoWeAre from "./home/WhoWeAre";
import ProcessSection from "./home/ProcessSection";
import AppointmentCTA from "./home/AppointmentCTA";

// lazy sections (below fold)
const SpecialServices = lazy(() => import("./home/SpecialServices"));
const StatsSection = lazy(() => import("./home/StatsSection"));
const Testimonials = lazy(() => import("./home/Testimonials"));

import SpecialServicesSkeleton from "../skeleton/SpecialServicesSkeleton";
import TestimonialsSkeleton from "../skeleton/TestimonialsSkeleton";
import Achievements from "./home/Achievements";
import SEO from "./SEO"

/* ---------------- Intersection Observer Hook ---------------- */
const useInView = (options = { threshold: 0.15 }) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // load once (important for performance)
      }
    }, options);

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  return [setRef, isVisible];
};

/* ---------------- Section Wrapper ---------------- */
const LazySection = ({ children }) => {
  const [ref, isVisible] = useInView();

  return (
    <div ref={ref}>
      {isVisible ? children : <div className="h-[300px]" />}
    </div>
  );
};

const Home = () => {
  return (
    <>
    <SEO
  title="Vetdiag Genomix – Veterinary Diagnostic Lab | Vijayawada"
  description="Accurate animal health testing by Vetdiag Genomix. Book appointments for diagnostic tests — fast, reliable, vet-trusted results."
  path="/"
/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* ABOVE FOLD (NO LAZY LOADING) */}
     <main>
       <HeroSection />
      <WhoWeAre />
      <ProcessSection />

      {/* BELOW FOLD (SMART LOAD ON SCROLL) */}
      <LazySection>
        <Suspense fallback={<SpecialServicesSkeleton />}>
          <SpecialServices />
        </Suspense>
      </LazySection>
      <Achievements/>

      <AppointmentCTA />

      <LazySection>
        <Suspense fallback={<div className="h-[200px]" />}>
          <StatsSection />
        </Suspense>
      </LazySection>

      <LazySection>
         <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      </LazySection>
     </main>

      <Footer />
    </motion.div></>
  );
};

export default Home;