"use client";
import { SwiperClass } from "swiper/react";
import "swiper/css/bundle";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

import ImageSwiper from "./Swiper";
import Thumbnail from "./Thumbnail";

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
      <ImageSwiper images={images} thumbsSwiper={thumbsSwiper} />
      <Thumbnail images={images} setThumbsSwiper={setThumbsSwiper} />
    </>
  );
}
