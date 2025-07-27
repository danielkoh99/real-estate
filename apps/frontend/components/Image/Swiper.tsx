"use client";
import { Thumbs, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { FileWithPreview, PropertyImageAttributes } from "@/types";

export default function ImageSwiper({
  classes,
  images,
  thumbsSwiper,
}: {
  classes?: string;
  images: FileWithPreview[] | PropertyImageAttributes[];
  thumbsSwiper: SwiperClass | undefined;
}) {
  return (
    <Swiper
      loop
      navigation
      className={twMerge(
        `w-full relative max-w-[700px] md:max-w-[800px] lg:max-w-[900px] mx-auto rounded-md ${thumbsSwiper ? "mb-6" : "mb-0"}`,
        classes,
      )}
      modules={[FreeMode, Navigation, Thumbs, Pagination]}
      pagination={{ clickable: true, type: "bullets" }}
      spaceBetween={10}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.url + index} className="w-full h-full">
          <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[3/2] max-h-[500px] rounded-md overflow-hidden bg-gray-100 h-full">
            <Image
              fill
              alt={`Image ${index + 1}`}
              className="h-full hover:scale-110 transition duration-300 ease-in-out"
              sizes="(max-width: 768px) 100vw, 700px"
              src={image.url}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
