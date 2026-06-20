import React, { useEffect, useRef, useState, memo } from "react";
import hero2 from "../../assets/hero-sections-contact/contactsectionbgc-1.png";
import titleimg2 from "../../assets/home/second-sec-tit.png";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

/* ── Eye Icon SVG ─────────────────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
         -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

/* ── Chevron Icons ────────────────────────────────────────────────────────── */
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/* ── Achievement Detail Modal — now with carousel nav ─────────────────────── */
const AchievementModal = ({ items, index, onClose, onNavigate }) => {
  const item = items[index];
  const total = items.length;

  // close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // close on Escape, navigate on arrow keys
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  onNavigate(index === 0 ? total - 1 : index - 1);
      if (e.key === "ArrowRight") onNavigate(index === total - 1 ? 0 : index + 1);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate, index, total]);

  if (!item) return null;

  const goPrev = () => onNavigate(index === 0 ? total - 1 : index - 1);
  const goNext = () => onNavigate(index === total - 1 ? 0 : index + 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={handleBackdrop}
    >
      {/* Close button — sits on the backdrop, top-right of viewport */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-5 right-5 z-[60] w-10 h-10 rounded-full
                   bg-white/15 hover:bg-white/25 text-white
                   flex items-center justify-center transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Carousel nav arrows — sit on the backdrop, either side of the modal */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous achievement"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[60]
                       flex items-center justify-center
                       w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 text-[#CF2E2E] shadow-lg
                       hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next achievement"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[60]
                       flex items-center justify-center
                       w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 text-[#CF2E2E] shadow-lg
                       hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      <div
        className="relative bg-white rounded-3xl overflow-hidden w-full max-w-lg
                   shadow-2xl animate-modal-pop flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Image */}
        <div className="relative w-full overflow-hidden bg-gray-100 flex-shrink-0"
             style={{ aspectRatio: "16/9" }}>
          <img
            key={item._id}
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover animate-fade-in"
          />

          {/* metric badge */}
          {item.metric && (
            <div className="absolute top-3 left-3 bg-[#CF2E2E] text-white
                            text-xs font-bold px-3 py-1.5 rounded-full shadow-lg
                            tracking-wide">
              {item.metric}
            </div>
          )}

          {/* gradient fade into content */}
          <div className="absolute bottom-0 left-0 right-0 h-20
                          bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content — scrollable, takes remaining space, no fixed cutoff height */}
        <div className="px-6 pb-6 pt-2 overflow-y-auto flex-1 min-h-0">

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
            {item.title}
          </h3>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-[#b50b0b] rounded-full" />
            <div className="h-0.5 flex-1 bg-gray-100 rounded-full" />
          </div>

          {/* Description — full text, wraps and scrolls naturally */}
          {item.description ? (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No description available.</p>
          )}
        </div>

        {/* Position indicator dots */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-1.5 pb-3 flex-shrink-0">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                aria-label={`Go to achievement ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  i === index
                    ? "w-5 h-1.5 bg-[#CF2E2E]"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* Red bottom accent */}
        <div className="h-1 bg-[#b50b0b] w-full flex-shrink-0" />
      </div>

      {/* animation keyframes via inline style tag */}
      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .animate-modal-pop {
          animation: modalPop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes fadeInImg {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeInImg 0.25s ease both;
        }
      `}</style>
    </div>
  );
};

/* ── Single Card ──────────────────────────────────────────────────────────── */
const AchievementCard = memo(({ item, onView }) => (
  <div
    className="bg-white rounded-2xl overflow-hidden flex flex-col h-full
               transform transition-transform duration-300 hover:-translate-y-1
               shadow-sm hover:shadow-md"
  >
    {/* Image */}
    <div className="relative w-full overflow-hidden bg-gray-100"
         style={{ aspectRatio: "4/3" }}>
      <img
        src={item.url}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Metric badge */}
      {item.metric && (
        <div className="absolute top-3 right-3 bg-[#CF2E2E] text-white
                        text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {item.metric}
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12
                      bg-gradient-to-t from-black/40 to-transparent" />

      {/* Eye icon — bottom-right corner */}
      <button
        onClick={(e) => { e.stopPropagation(); onView(item); }}
        aria-label={`View details for ${item.title}`}
        className="absolute bottom-2.5 right-2.5
                   flex items-center gap-1.5
                   bg-black/50 hover:bg-[#CF2E2E]
                   text-white text-[11px] font-semibold
                   px-2.5 py-1.5 rounded-full
                   backdrop-blur-sm
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/50
                   group"
      >
        <EyeIcon />
        <span className="hidden group-hover:inline transition-all duration-200">
          View
        </span>
      </button>
    </div>

    {/* Text content — clipped intentionally */}
    <div className="flex flex-col gap-1.5 p-4 flex-1">
      <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
        {item.title}
      </h3>
      {item.description && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      )}
    </div>

    {/* Red accent bar */}
    <div className="h-1 bg-[#b50b0b] w-full mt-auto" />
  </div>
));

AchievementCard.displayName = "AchievementCard";

/* ── Main Component ───────────────────────────────────────────────────────── */
const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [current, setCurrent]           = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const [modalIndex, setModalIndex]     = useState(null); // ← index instead of item now
  const intervalRef                     = useRef(null);

  /* fetch */
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res    = await fetch(`${BASE_URL}/upload/achievements`);
        const result = await res.json();
        if (res.ok && result.data) setAchievements(result.data);
      } catch (err) {
        console.error("Failed to load achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  /* visible count */
  const getVisible = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1);
  useEffect(() => {
    const update = () => setVisibleCount(getVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total    = achievements.length;
  const maxIndex = Math.max(0, total - visibleCount);
  const dotCount = maxIndex + 1;

  /* auto-play — pause when modal is open */
  useEffect(() => {
    if (isPaused || total === 0 || modalIndex !== null) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, total, maxIndex, modalIndex]);

  const goTo = (idx) => {
    clearInterval(intervalRef.current);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setIsPaused(false);
  };

  const prev = () => goTo(current === 0 ? maxIndex : current - 1);
  const next = () => goTo(current >= maxIndex ? 0 : current + 1);

  /* open modal at a given item's index within the full achievements array */
  const openModal = (item) => {
    const idx = achievements.findIndex((a) => a._id === item._id);
    setModalIndex(idx === -1 ? 0 : idx);
  };

  const closeModal = () => setModalIndex(null);

  const navigateModal = (idx) => setModalIndex(idx);

  /* skeleton */
  if (loading) {
    return (
      <div className="relative w-full py-16 overflow-hidden">
        <img src={hero2} alt="background" decoding="async" fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          <div className="h-8 w-56 rounded-lg bg-white/30 animate-pulse" />
          <div className="flex gap-5 w-full max-w-5xl justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i}
                className="hidden lg:block w-[300px] h-[340px] rounded-2xl bg-white/30 animate-pulse" />
            ))}
            <div className="block lg:hidden w-[300px] h-[340px] rounded-2xl bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!loading && achievements.length === 0) return null;

  return (
    <>
      <div
        className="relative w-full py-14 overflow-hidden antialiased"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background */}
        <img src={hero2} alt="background" decoding="async" fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-white" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-4">

          {/* Heading */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2 md:gap-4 items-center justify-center">
              <img src={titleimg2} alt="section icon" decoding="async" className="w-5 h-5" />
              <h2 className="text-2xl md:text-4xl font-bold">
                <span className="text-[#b50b0b]">Our</span> Achievements
              </h2>
              <img src={titleimg2} alt="section icon" decoding="async" className="w-5 h-5" />
            </div>
            <p className="text-xl lg:text-3xl font-semibold text-center max-w-xl mx-auto">
              Milestones that reflect our commitment to excellence
            </p>
          </div>

          {/* Carousel */}
          <div className="relative w-full max-w-5xl">

            {/* Prev */}
            <button onClick={prev} aria-label="Previous achievement"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20
                         flex items-center justify-center
                         w-10 h-10 rounded-full bg-white text-[#CF2E2E] shadow-lg
                         hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#CF2E2E]">
              <ChevronLeftIcon />
            </button>

            {/* Cards window */}
            <div className="overflow-hidden rounded-2xl mx-7">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCount})))` }}
              >
                {achievements.map((item) => (
                  <div
                    key={item._id}
                    className="shrink-0 px-2"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <AchievementCard item={item} onView={openModal} />
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <button onClick={next} aria-label="Next achievement"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20
                         flex items-center justify-center
                         w-10 h-10 rounded-full bg-white text-[#CF2E2E] shadow-lg
                         hover:bg-[#CF2E2E] hover:text-white transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#CF2E2E]">
              <ChevronRightIcon />
            </button>
          </div>

          {/* Dots */}
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
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Modal — rendered outside carousel div so no overflow clipping */}
      {modalIndex !== null && (
        <AchievementModal
          items={achievements}
          index={modalIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}
    </>
  );
};

export default memo(Achievements);