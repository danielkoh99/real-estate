import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useState } from "react";
import Image from "next/image";

import { FileWithPreview, PropertyImageAttributes } from "@/types";

export default function ImageSwiperThumbnail({
  images,
}: {
  images: FileWithPreview[] | PropertyImageAttributes[] | undefined;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center rounded-md mb-4 h-[500px] w-full">
        no images added
      </div>
    );
  }

  return (
    <>
      <Swiper
        loop
        className="rounded-md mb-4 h-[300px] md:h-[500px] w-full"
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={image.url + index}>
            <div className="flex w-full h-full justify-center items-center">
              <Image
                alt={image.url}
                className="object-contain rounded-md w-full"
                height={500}
                src={image.url}
                width={500}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="mt-4 h-[200px] cursor-grab w-full"
        freeMode={true}
        modules={[FreeMode, Navigation, Thumbs]}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image.url + index}
            className="rounded-md overflow-hidden"
          >
            <div className="relative w-full h-[100px] md:h-[150px] overflow-hidden rounded-md">
              <Image
                alt={image.url}
                className="object-cover w-full h-full"
                height={200}
                src={image.url}
                width={200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
