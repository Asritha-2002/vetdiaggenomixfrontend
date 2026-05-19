import React, { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import hero2 from "../../assets/home/Rectangle 22.png";
import "swiper/css";
import "swiper/css/navigation";

// Base API link configuration
const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

const Gallary = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Shuffle utility function for random dynamic layout placement
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 🔥 Fetch live records from Cloudinary/MongoDB
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        // Using your exact endpoint format
        const response = await fetch(`${BASE_URL}/upload/media`);
        const result = await response.json();

        if (response.ok && result.data) {
          // Extract just the asset URLs from the document objects
          const dbImageUrls = result.data.map((item) => item.url);
          
          // Randomize the layout order dynamically on load!
          const randomizedGallery = shuffleArray(dbImageUrls);
          setImages(randomizedGallery);
        }
      } catch (error) {
        console.error("FAILED TO FETCH PUBLIC GALLERY IMAGES:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* 🔥 BACKGROUND IMAGE */}
      <img
        src={hero2}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔥 OPTIONAL DARK OVERLAY (for readability) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10">
        <h2 className="text-center text-white text-2xl md:text-4xl font-bold mb-10">
          Our Gallery
        </h2>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            /* Simple custom loading spinner */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
              <p className="mt-4 text-sm font-medium text-white/80">Loading gallery photos...</p>
            </div>
          ) : images.length === 0 ? (
            /* Fallback state when database has no images yet */
            <div className="text-center py-16 text-white/70 bg-white/10 backdrop-blur-sm rounded-2xl max-w-md mx-auto px-4">
              <p className="font-semibold">No images found in the gallery</p>
              <p className="text-xs mt-1">Upload images via the Admin panel to show them here.</p>
            </div>
          ) : (
            /* 🔥 SWIPER SLIDER COMPONENT */
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={images.length >= 3} // Loop works properly if you have enough items for viewports
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {images.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-auto rounded-xl overflow-hidden shadow-md bg-black/10 backdrop-blur-sm">
                    <img
                      src={imgUrl}
                      alt={`gallery-${index}`}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                      loading="lazy" // Native browser lazy loading optimization
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallary;