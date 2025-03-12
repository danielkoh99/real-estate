import { Card, CardBody, CardHeader, Chip, Skeleton } from "@heroui/react";
import "swiper/css/bundle";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  CalendarIcon,
  CameraIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import SaveListingBtn from "./SaveListingBtn";

import { PropertyResponse } from "@/types";

const SingleRealEstate: React.FC<{
  property: PropertyResponse;
  small?: boolean;
  loading?: boolean;
  classes?: string;
}> = ({ property, loading, classes, small = false }) => {
  return (
    <Link
      className="w-full text-white text-center py-2 rounded-lg h-full flex justify-center items-center"
      href={`/property/${property.id}`}
    >
      <div
        className={twMerge(
          "w-full h-full md:max-w-sm flex justify-center items-center",
          classes,
        )}
      >
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all duration-300 transform hover:shadow-lg w-full min-h-[400px] flex flex-col h-full">
          <CardHeader className="p-0 relative h-[200px] ">
            {!loading && (
              <>
                <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs rounded-bl-lg px-2 py-1 flex items-center opacity-80">
                  <CameraIcon className="h-8 w-8 mr-1" />
                  {property.images.length}
                </div>
                <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs rounded-br-lg px-2 py-1 opacity-80 items-center">
                  <SaveListingBtn propertyId={property.id} />
                </div>
              </>
            )}

            {loading ? (
              <Skeleton className="rounded-lg h-full w-full" />
            ) : (
              <Image
                alt={property.description}
                className="object-cover w-full h-full"
                height={400}
                src={property.images[0].url}
                width={400}
              />
            )}
          </CardHeader>

          <CardBody className="p-3 flex flex-col flex-grow">
            <div className="flex flex-col gap-2 flex-grow">
              <Skeleton isLoaded={!loading}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-800 truncate">
                      {property.price.toLocaleString()} M Ft
                    </h2>
                    <p className="text-xs text-slate-500">
                      {property.squarMeterPrice.toFixed(2)} M Ft/m²
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">{property.size} m²</p>
                </div>
              </Skeleton>

              <Skeleton isLoaded={!loading}>
                <div className="text-gray-600 flex flex-col spac e-y-1">
                  <p className="text-xs text-gray-500">{property.address}</p>

                  {property.city && (
                    <p className="text-xs text-gray-500">{property.city}</p>
                  )}
                  {property.city === "Budapest" && property.district && (
                    <p className="text-xs text-gray-500">
                      District {property.district}
                    </p>
                  )}
                </div>
              </Skeleton>

              {!small && (
                <Skeleton className="mt-auto" isLoaded={!loading}>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-auto">
                    <Chip
                      className="min-h-[24px] flex items-center"
                      color="primary"
                      startContent={
                        <Squares2X2Icon className="h-4 w-4 text-gray-500" />
                      }
                      variant="faded"
                    >
                      {property.category}
                    </Chip>
                    <Chip
                      className="min-h-[24px] flex items-center"
                      color="primary"
                      startContent={
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                      }
                      variant="faded"
                    >
                      {property.yearBuilt}
                    </Chip>
                  </div>
                </Skeleton>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default SingleRealEstate;
