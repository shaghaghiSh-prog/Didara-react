import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const brands = [
  {
    id: 1,
    name: "Brand 1",
    img: "/placeholder.svg?height=100&width=100&text=Brand1",
  },
  {
    id: 2,
    name: "Brand 2",
    img: "https://api.didaraoptic.com/attachments/admin/medias/6e0f29e5b2d9f594ba7dcf1d6b52ac2a.webp",
  },
  {
    id: 3,
    name: "Brand 3",
    img: "https://api.didaraoptic.com/attachments/admin/medias/3595f9b13769f9db2a69b06920720b8a.webp",
  },
  {
    id: 15,
    name: "Brand 15",
    img: "https://api.didaraoptic.com/attachments/admin/medias/f04eb17d484bbf37b14a4680d47b5d35.webp",
  },

  {
    id: 5,
    name: "Brand 4",
    img: "https://api.didaraoptic.com/attachments/admin/medias/f04eb17d484bbf37b14a4680d47b5d35.webp",
  },

  {
    id: 6,
    name: "Brand 4",
    img: "https://api.didaraoptic.com/attachments/admin/medias/df8333240987488e6005619595f53e83.webp",
  },

  {
    id: 7,
    name: "Brand 4",
    img: "https://api.didaraoptic.com/attachments/admin/medias/76c316a94f800d4803bb69b4065c37ec.webp",
  },
];

function SwipperBrands() {
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="container mx-auto pb-10 bg-white">
      <div className="flex items-center mb-12">
       
        <h2 className="text-3xl text-gray-500 font-black">برندها</h2>

        <div className="flex-grow h-px bg-[#a5a5a4] mx-4 rounded"></div>
      </div>

      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-fit py-4 md:w-4/5 mx-auto"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex items-center justify-center h-36 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                <img
                alt=""
                  src={brand.img}
                  className="max-h-full max-w-full rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center justify-center bg-white rounded-full p-3 w-10 h-10 shadow-md z-10 transition-all duration-300 hover:bg-[#f0edd3] focus:outline-none focus:ring-2 focus:ring-[#f0e68c] focus:ring-opacity-50"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="w-5 h-5 text-[#b89a3b]"
          />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center bg-white rounded-full p-3 w-10 h-10 shadow-md z-10 transition-all duration-300 hover:bg-[#dad7c3] focus:outline-none focus:ring-2 focus:ring-[#f0e68c] focus:ring-opacity-50"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="w-5 h-5 text-[#b89a3b]"
          />
        </button>
      </div>
    </div>
  );
}

export default SwipperBrands;
