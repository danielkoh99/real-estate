import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import "swiper/css/bundle";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  CalendarIcon,
  CameraIcon,
  MapPinIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import SaveListingBtn from "./SaveListingBtn";

import { Property } from "@/types";

const SingleRealEstate: React.FC<{
  property: Property;
  small?: boolean;
  loading?: boolean;
  classes?: string;
  isSaved: boolean;
}> = ({ property, loading, classes, small = false, isSaved }) => {
  const goToMapsUrl = (e: any) => {
    e.stopPropagation(); // Prevent the Link click
    e.preventDefault();
    const url = `http://maps.google.com/?q=${property.address}`;

    window.open(url, "_blank");
  };

  return (
    <Link
      className="w-full text-white text-center py-2 rounded-lg  h-full"
      href={`/property/${property.id}`}
    >
      <div className={twMerge("w-full h-full", classes)}>
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all duration-300 transform hover:shadow-lg h-full">
          <CardHeader className={`p-0 relative ${small ? "h-[150px]" : ""}`}>
            {!loading && (
              <>
                <div className="absolute z-50 top-0 right-0 bg-gray-800 text-white text-sm rounded-bl-lg px-3 py-1 flex items-center opacity-80">
                  <span className="material-icons mr-1 text-base">
                    <CameraIcon className="h-7 w-7" />
                  </span>
                  {property.images.length}
                </div>
                <div className="absolute z-50 top-0 left-0 bg-gray-800 text-white text-sm rounded-br-lg px-3 py-1 flex items-center opacity-80">
                  <SaveListingBtn isSaved={isSaved} propertyId={property.id} />
                </div>
              </>
            )}

            {loading ? (
              <Skeleton className="rounded-lg h-56 w-full" />
            ) : (
              <Image
                alt={property.description}
                className="object-cover w-full h-full relative"
                height={300}
                src={property.images[0].url}
                width={300}
              />
            )}
          </CardHeader>
          <CardBody>
            <div className="p-4 flex flex-col space-y-4 flex-grow">
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">
                      {property.price.toLocaleString()} M Ft
                    </h2>
                    <p className="text-sm text-slate-500">
                      {property.squarMeterPrice.toFixed(2)} M Ft/m²
                    </p>
                  </div>
                  <p className="text-slate-500">{property.size} m²</p>
                </div>
              </Skeleton>

              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <div className="text-gray-600 flex flex-col space-y-2">
                  <Tooltip content="Open in google maps">
                    <button
                      className="flex items-center space-x-2 underline "
                      onClick={(e) => goToMapsUrl(e)}
                    >
                      <MapPinIcon className="h-5 w-5 text-gray-500 " />
                      <p className="truncate text-ellipsis">
                        {property.address}
                      </p>
                    </button>
                  </Tooltip>
                  {/* Added City and District */}
                  {property.city && (
                    <p className="text-sm text-gray-500">{property.city}</p>
                  )}
                  {property.district && (
                    <p className="text-sm text-gray-500">
                      District: {property.district}
                    </p>
                  )}
                </div>
              </Skeleton>

              {!small && (
                <Skeleton className="rounded-lg" isLoaded={!loading}>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <Chip
                      color="primary"
                      startContent={
                        <Squares2X2Icon className="h-5 w-5 text-gray-500 mr-1" />
                      }
                      variant="faded"
                    >
                      {property.category}
                    </Chip>
                    <Chip
                      color="primary"
                      startContent={
                        <CalendarIcon className="h-5 w-5 text-gray-500 mr-1" />
                      }
                      variant="faded"
                    >
                      Built: {property.yearBuilt}
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
