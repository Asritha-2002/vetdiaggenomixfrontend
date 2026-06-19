import React, { useEffect, useRef, useState, memo } from "react";
import hero2 from "../../assets/hero-sections-contact/contactsectionbgc-1.png";
import titleimg2 from "../../assets/home/second-sec-tit.png";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(`${BASE_URL}/upload/achievements`);
        const result = await res.json();
        if (res.ok && result.data) {
          setAchievements(result.data);
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // ── How many cards visible based on screen ─────────────────────────────────
  // We show 1 on mobile, 2 on md, 3 on lg.
  // For dot/prev/next logic we just track the leading index.
  const VISIBLE = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  const getVisible = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const update = () => setVisibleCount(getVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = achievements.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Auto-play
  useEffect(() => {
    if (isPaused || total === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, total, maxIndex]);

  const goTo = (idx) => {
    clearInterval(intervalRef.current);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setIsPaused(false);
  };

  const prev = () => goTo(current === 0 ? maxIndex : current - 1);
  const next = () => goTo(current >= maxIndex ? 0 : current + 1);

  // ── Skeleton ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="relative w-full py-16 overflow-hidden">
        <img
          src={hero2}
          alt="background"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          <div className="h-8 w-56 rounded-lg bg-white/30 animate-pulse" />
          <div className="flex gap-5 w-full max-w-5xl justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="hidden lg:block w-[300px] h-[340px] rounded-2xl bg-white/30 animate-pulse"
              />
            ))}
            <div className="block lg:hidden w-[300px] h-[340px] rounded-2xl bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!loading && achievements.length === 0) return null;

  // ── Dots (one per "page") ──────────────────────────────────────────────────
  const dotCount = maxIndex + 1;

  return (
    <div
      className="relative w-full py-14 overflow-hidden antialiased"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* BACKGROUND */}
      <img
        src={hero2}
        alt="background"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">

        {/* ── HEADING ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2 md:gap-4 items-center justify-center">
            <img
              src={titleimg2}
              alt="section icon"
              decoding="async"
              className="w-5 h-5"
            />
            <h2 className="text-2xl md:text-4xl font-bold">
              <span className="text-[#b50b0b]">Our</span> Achievements
            </h2>
            <img
              src={titleimg2}
              alt="section icon"
              decoding="async"
              className="w-5 h-5"
            />
          </div>
          <p className="text-xl lg:text-3xl font-semibold text-center max-w-xl mx-auto">
            Milestones that reflect our commitment to excellence
          </p>
        </div>

        {/* ── CAROUSEL VIEWPORT ───────────────────────────────────────── */}
        <div className="relative w-full max-w-5xl">

          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous achievement"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20
                       flex items-center justify-center
                       w-10 h-10 rounded-full bg-white text-[#CF2E2E] shadow-lg
                       hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#CF2E2E]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards window (overflow hidden) */}
          <div className="overflow-hidden rounded-2xl mx-7">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${current} * (100% / ${visibleCount})))`,
              }}
            >
              {achievements.map((item, i) => (
                <div
                  key={item._id}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <AchievementCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next achievement"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20
                       flex items-center justify-center
                       w-10 h-10 rounded-full bg-white text-[#CF2E2E] shadow-lg
                       hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#CF2E2E]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── DOTS ────────────────────────────────────────────────────── */}
        {dotCount > 1 && (
          <div className="flex items-center gap-2 mt-1">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  i === current
                    ? "w-6 h-2.5 bg-[#CF2E2E]"
                    : "w-2.5 h-2.5"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

// ── Single card ──────────────────────────────────────────────────────────────
const AchievementCard = memo(({ item }) => (
  <div className="bg-white rounded-2xl overflow-hidden  flex flex-col h-full
                  transform transition-transform duration-300 hover:-translate-y-1">

    {/* Image */}
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        src={item.url}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Metric badge */}
      {item.metric && (
        <div className="absolute top-3 right-3 bg-[#CF2E2E] text-white text-xs font-bold
                        px-2.5 py-1 rounded-full shadow">
          {item.metric}
        </div>
      )}

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12
                      bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-1.5 p-4 flex-1">
      <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
        {item.title}
      </h3>
      {item.description && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      )}
    </div>

    {/* Red accent bottom bar */}
    <div className="h-1 bg-[#b50b0b] w-full mt-auto" />
  </div>
));

AchievementCard.displayName = "AchievementCard";

export default memo(Achievements);