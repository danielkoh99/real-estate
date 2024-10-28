import { useMemo, useState } from "react";
import { GetServerSideProps } from "next/types";
import Image from "next/image";
import { Card } from "@nextui-org/react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css/bundle";

import { Property } from "@/types";
import { formatDateTime } from "@/helpers/formatDateTime";

const PropertyPage: React.FC<{ property: Property }> = ({ property }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const formattedDate = formatDateTime(property.updatedAt);
  const listedByUserName = useMemo(
    () =>
      property.listedByUser.firstName + " " + property.listedByUser.lastName,
    [],
  );

  return (
    <div className="h-screen p-5 bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden h-full p-5">
        <div className="md:w-2/3 w-full h-full p-4">
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

        <div className="md:w-1/3 w-full h-full p-4 flex justify-center items-center">
          <Card className="w-full h-full p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {property.title}
            </h2>

            <div className="flex items-center mb-3">
              <p className="text-lg text-gray-600">{property.address}</p>
            </div>

            <div className="flex items-center mb-3">
              <p className="text-lg text-gray-600">
                {property.size ? `${property.size} m2` : "Size not specified"}
              </p>
            </div>

            <div className="flex items-center mb-6">
              <p className="text-2xl font-semibold text-gray-800">
                ${property.price.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col text-sm text-gray-500">
              <p>
                Listed by:
                <span className="font-medium">{listedByUserName}</span>
              </p>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p suppressHydrationWarning>Last updated: {formattedDate}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}`,
  );

  const property: Property = await response.json();

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
    },
  };
};
export default PropertyPage;
