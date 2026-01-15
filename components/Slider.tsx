"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  const slides = [
    {
      title: "Source Code Premium",
      desc: "Dapatkan source code siap pakai untuk project Anda.",
      img: "https://picsum.photos/1920/800?random=1",
    },
    {
      title: "Dukung Kreator",
      desc: "Bantu developer lokal dengan donasi.",
      img: "https://picsum.photos/1920/800?random=2",
    },
    {
      title: "Belajar Lebih Cepat",
      desc: "Source code dengan dokumentasi lengkap.",
      img: "https://picsum.photos/1920/800?random=3",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-[400px] md:h-[600px] flex items-center justify-center text-center text-white"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* overlay gelap */}
              <div className="absolute inset-0 bg-black/50" />
              
              {/* konten teks */}
              <div className="relative z-10 px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.desc}</p>
                <button className="px-6 py-3 font-semibold text-white bg-orange-400 rounded-lg shadow bg-orange-500 transition">
                  Jelajahi Sekarang
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
