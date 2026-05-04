import React, { useMemo } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import hero2 from "../../assets/home/Rectangle 22.png";
import "swiper/css";
import "swiper/css/navigation";

// Images
import img1 from "../../assets/gallery/img1.jpg";
import img2 from "../../assets/gallery/img2.jpg";
import img3 from "../../assets/gallery/img3.jpg";
import img4 from "../../assets/gallery/img4.jpg";
import img5 from "../../assets/gallery/img5.jpg";
import img6 from "../../assets/gallery/img6.jpg";
import img7 from "../../assets/gallery/img7.jpg";
import img8 from "../../assets/gallery/img8.jpg";
import img9 from "../../assets/gallery/img9.jpg";
import img10 from "../../assets/gallery/img10.jpg";
import img11 from "../../assets/gallery/img11.jpg";
import img12 from "../../assets/gallery/img12.jpg";
import img13 from "../../assets/gallery/img13.jpg";
import img14 from "../../assets/gallery/img14.jpg";
import img15 from "../../assets/gallery/img15.jpg";

import t1 from "../../assets/gallery/t1.jpg";
import t2 from "../../assets/gallery/t2.jpg";
import t3 from "../../assets/gallery/t3.jpg";
import t4 from "../../assets/gallery/t4.jpg";
import t5 from "../../assets/gallery/t5.jpg";
import t6 from "../../assets/gallery/t6.jpg";
import t7 from "../../assets/gallery/t7.jpg";
import t8 from "../../assets/gallery/t8.jpg";
import t9 from "../../assets/gallery/t9.jpg";
import t10 from "../../assets/gallery/t10.jpg";
import t11 from "../../assets/gallery/t11.jpg";
import t12 from "../../assets/gallery/t12.jpg";
import t13 from "../../assets/gallery/t13.jpg";
import t14 from "../../assets/gallery/t14.jpg";
import t15 from "../../assets/gallery/t15.jpg";
import t16 from "../../assets/gallery/t16.jpg";
import t17 from "../../assets/gallery/t17.jpg";
import t18 from "../../assets/gallery/t18.jpg";

const Gallary = () => {

  // 🔥 Shuffle function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 🔥 Prepare images
  const images = useMemo(() => {
    const firstImages = [t1, t2, t3]; // fixed first
    const remaining = shuffleArray([
      t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18,
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15
    ]);

    return [...firstImages, ...remaining];
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
    <div className="absolute inset-0"></div>

    {/* 🔥 CONTENT */}
    <div className="relative z-10">

      <h2 className="text-center text-white text-2xl md:text-4xl font-bold mb-10 ">
        Our Gallery
      </h2>

      <div className="max-w-6xl mx-auto">

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-md">
                <img
                  src={img}
                  alt={`gallery-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  </section>
);
};

export default Gallary;