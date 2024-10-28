import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import { Property } from "@/types";

const SingleRealEstate: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <Link href={`/property/${property.id}`}>
        <Card className="shadow-sm rounded-lg overflow-hidden hover:shadow-lg border border-slate-200 transition-all">
          <CardHeader className="p-0">
            <Swiper
              loop
              navigation
              className="h-56 relative"
              modules={[Navigation]}
            >
              <Skeleton className="rounded-lg">
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
              </Skeleton>
            </Swiper>
          </CardHeader>
          <CardBody>
            <div className="p-4 flex flex-col">
              <p className="text-large mb-2">{property.title}</p>
              <p className="text-gray-600">{property.size}</p>
              <p className="text-gray-600">{property.price}</p>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default SingleRealEstate;
