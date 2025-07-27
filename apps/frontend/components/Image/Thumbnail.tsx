"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import "swiper/css/bundle";
import Image from "next/image";

import { FileWithPreview, PropertyImageAttributes } from "@/types";

export default function Thumbnail({
  images,
  setThumbsSwiper,
}: {
  images: FileWithPreview[] | PropertyImageAttributes[];
  setThumbsSwiper: (swiper: SwiperClass) => void;
}) {
  return (
    <Swiper
      watchSlidesProgress
      className="w-full mx-auto cursor-grab"
      modules={[FreeMode, Thumbs]}
      slidesPerView={Math.min(images.length, 5)}
      spaceBetween={8}
      onSwiper={setThumbsSwiper}
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={image.url + "-" + index}
          className="!w-16 sm:!w-20 md:!w-24 lg:!w-28"
        >
          <div className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200 bg-white hover:border-primary-500 transition">
            {image.url}
            <Image
              fill
              alt={`Thumbnail ${index + 1}`}
              className="object-cover"
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
              src={image.url}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
