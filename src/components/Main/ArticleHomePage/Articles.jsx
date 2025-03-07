import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "./ArticleCart";

import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const articles = [
  {
    id: 1,
    imageUrl:
      "https://api.didaraoptic.com/attachments/article/67952ad07983ac070b4a3af55096afb6.webp",
    title: `لنزهای زیبایی و لنزهای طبی، کدام گزینه برای شما مناسب‌ تر است؟
`,
    description:
      "لنزهای چشمی به دو دسته کلی لنزهای طبی و لنزهای زیبایی تقسیم می‌شوند. انتخاب بین این دو نوع لنز بسته به نیازهای بینایی و سلیقه شخصی",
  },
  {
    id: 2,
    imageUrl:
      "https://api.didaraoptic.com/attachments/article/c83ca4e67e4ee0f17bae7b03a5edc821.webp",
    title: `لنزهای زیبایی و لنزهای طبی، کدام گزینه برای شما مناسب‌ تر است؟
    `,
    description:
      "لنزهای چشمی به دو دسته کلی لنزهای طبی و لنزهای زیبایی تقسیم می‌شوند. انتخاب بین این دو نوع لنز بسته به نیازهای بینایی و سلیقه شخصی",
  },
  {
    id: 3,
    imageUrl:
      "https://api.didaraoptic.com/attachments/article/559f7002ce08c65da613768265d5acb5.webp",
    title: `لنزهای زیبایی و لنزهای طبی، کدام گزینه برای شما مناسب‌ تر است؟
    `,
    description:
      "لنزهای چشمی به دو دسته کلی لنزهای طبی و لنزهای زیبایی تقسیم می‌شوند. انتخاب بین این دو نوع لنز بسته به نیازهای بینایی و سلیقه شخصی",
  },
  {
    id: 4,
    imageUrl:
      "https://api.didaraoptic.com/attachments/article/f6ea0a9ce1b2ec5ce10012fadb3230d9.webp",
    title: `لنزهای زیبایی و لنزهای طبی، کدام گزینه برای شما مناسب‌ تر است؟
    `,
    description:
      "لنزهای چشمی به دو دسته کلی لنزهای طبی و لنزهای زیبایی تقسیم می‌شوند. انتخاب بین این دو نوع لنز بسته به نیازهای بینایی و سلیقه شخصی",
  },
  {
    id: 5,
    imageUrl:
      "https://api.didaraoptic.com/attachments/article/f263caea89dac3b8a9516f04e8a80610.webp",
    title: `لنزهای زیبایی و لنزهای طبی، کدام گزینه برای شما مناسب‌ تر است؟
    `,
    description:
      "لنزهای چشمی به دو دسته کلی لنزهای طبی و لنزهای زیبایی تقسیم می‌شوند. انتخاب بین این دو نوع لنز بسته به نیازهای بینایی و سلیقه شخصی",
  },
];

export function Articles() {
  const swiperRef = useRef(null);

  // Function to swipe left
  const swipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Function to swipe right
  const swipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="container mx-auto px-14 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-gray-500 font-black mx-4">مقالات</h2>

        <div className="flex-grow h-px bg-gray-300"></div>

        <button className="flex items-center py-2 px-2 mx-3 border border-gold-1000 rounded-3xl text-sm font-medium text-gray-700 bg-pink-50 transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          مشاهده مقالات
          <ArrowLeft className="mr-2 h-4 w-4" />
        </button>
      </div>

      <div className="relative">
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3.5,
            },
          }}
          className="mySwiper"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <ArticleCard {...article} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className=" absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={swipeRight} // Call swipeLeft function
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="w-5 h-5 text-[#b89a3b]"
          />
        </button>
        <button
          className=" absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={swipeLeft} // Call swipeRight function
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
