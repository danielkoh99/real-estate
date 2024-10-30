import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import { Property } from "@/types";

const SingleRealEstate: React.FC<{ property: Property; loading: boolean }> = ({
  property,
  loading,
}) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <Link href={`/property/${property.id}`}>
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all transform hover:translate-y-[-5px]">
          <CardHeader className="p-0">
            {loading ? (
              <Skeleton className="rounded-lg h-56 w-full" />
            ) : (
              <Swiper
                loop
                navigation
                className="h-56 relative"
                modules={[Navigation]}
              >
                {property.images?.map((image) => (
                  <SwiperSlide key={image.id} className="relative h-full">
                    <Image
                      alt={property.title}
                      className="object-cover h-full w-full relative"
                      height={300}
                      priority={true}
                      src={image.url}
                      width={300}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </CardHeader>
          <CardBody>
            <div className="p-4 flex flex-col space-y-5">
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <p className="text-large mb-2">{property.title}</p>
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <p className="text-gray-600">{property.size}</p>
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <p className="text-gray-600">{property.price}</p>
              </Skeleton>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default SingleRealEstate;
