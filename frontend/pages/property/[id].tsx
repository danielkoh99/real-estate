import { useMemo, useState } from "react";
import { GetServerSideProps } from "next/types";
import Image from "next/image";
import { Avatar, Card } from "@nextui-org/react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css/bundle";

import {
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

import { Property } from "@/types";
import SimilarProperties from "@/components/property/SimilarProperties";

const PropertyPage: React.FC<{
  property: Property;
  lastUpdated: string;
  relatedProperties: Property[];
}> = ({ property, lastUpdated, relatedProperties }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const formattedDate = formatDateTime(property.updatedAt);
  const listedByUserName = useMemo(
    () =>
      property.listedByUser.firstName + " " + property.listedByUser.lastName,
    [],
  );

  return (
    <Card className="p-5 flex flex-col justify-center items-center gap-5">
      <Card className="h-screen flex flex-col md:flex-row w-full gap-5">
        {/* This section will be the full height of the screen */}
        <div className="md:w-2/3 w-full h-full p-4 ">
          {/* Main Swiper */}
          <Swiper
            loop
            className="rounded-md mb-4 h-3/4"
            modules={[FreeMode, Navigation, Thumbs]}
            navigation={true}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={image.url + index}>
                <Image
                  fill
                  alt={property.title}
                  className="object-cover h-full w-full relative"
                  priority={true}
                  src={image.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbs Swiper */}
          <Swiper
            className="flex justify-between mt-4 h-1/5"
            freeMode={true}
            modules={[FreeMode, Navigation, Thumbs]}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={image.url + index}>
                <Image
                  fill
                  alt={property.title}
                  className="object-cover h-full w-full relative rounded-md"
                  priority={true}
                  src={image.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* This section will be placed next to the main content */}
        <div className="md:w-1/3 w-full h-full p-4 flex justify-center items-center overflow-auto">
          <Card className="w-full h-full p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300 ease-in-out">
              {property.title}
            </h2>

            {/* Address */}
            <div className="flex items-center mb-4 text-gray-700">
              <MapPinIcon className="w-5 h-5 text-gray-500 mr-2" />
              <p className="text-lg font-medium">{property.address}</p>
            </div>

            {/* Size */}
            <div className="flex items-center mb-4 text-gray-700">
              <p className="text-lg font-medium">
                {property.size ? `${property.size} m²` : "Size not specified"}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center mb-8 text-gray-900">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <p className="text-lg font-semibold">
                {property.price.toLocaleString()}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-6 text-gray-600 text-sm">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-800">
                  {property.type || "Not specified"}
                </span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium">
                  {property.yearBuilt
                    ? `Built in ${property.yearBuilt}`
                    : "Year not specified"}
                </span>
              </div>
            </div>

            {/* Description with Show More */}
            <div className="text-gray-700 text-sm leading-relaxed my-6 max-h">
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-screen" : "max-h-28 line-clamp-5"
                }`}
              >
                <p>{property.description}</p>
              </div>
              <button
                className="text-blue-600 hover:underline mt-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </div>

            {/* Listed by */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Avatar className="mr-3" />
              <div>
                <p className="font-medium">{listedByUserName}</p>
              </div>
            </div>

            {/* Contact Button */}
            <div className="mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
                Contact Agent
              </button>
            </div>

            {/* Last updated */}
            <div className="mt-4 text-xs text-gray-400">
              <p suppressHydrationWarning>Last updated: {lastUpdated}</p>
            </div>
          </Card>
        </div>
      </Card>
      <SimilarProperties relatedProperties={relatedProperties} />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}`,
  );
  const relatedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}/related`,
  );

  const property: Property = await response.json();
  const relatedProperties: Property[] = await relatedResponse.json();

  if (!property) {
    return {
      notFound: true,
    };
  }
  const lastUpdated = new Date(property.updatedAt).toLocaleString();

  return {
    props: {
      property,
      lastUpdated: lastUpdated,
      relatedProperties,
    },
  };
};
export default PropertyPage;
