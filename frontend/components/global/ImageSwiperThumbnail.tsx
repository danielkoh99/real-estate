import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useState } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

import { FileWithPreview, PropertyImageAttributes } from "@/types";

export default function ImageSwiperThumbnail({
  images,
}: {
  images: FileWithPreview[] | PropertyImageAttributes[] | undefined;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center rounded-md mb-4 h-[500px] w-full">
        <PhotoIcon className="w-10 h-10 text-gray-400" />
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <>
      <Swiper
        loop
        navigation
        className="rounded-md mb-4 w-full max-w-[700px] mx-auto"
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url + index}>
            <div className="relative w-full aspect-square rounded-md overflow-hidden max-h-[500px]">
              <Image
                fill
                alt={`Image ${index + 1}`}
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 700px"
                src={image.url}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        freeMode
        watchSlidesProgress
        className="mt-4 cursor-grab"
        modules={[FreeMode, Navigation, Thumbs]}
        slidesPerView={Math.min(images.length, 5)}
        spaceBetween={8}
        onSwiper={setThumbsSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url + "-" + index} className="!w-20">
            <div className="relative group w-20 aspect-square rounded-md overflow-hidden border border-gray-200">
              <Image
                fill
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, (max-width: 1440px) 112px, 144px"
                src={image.url}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
