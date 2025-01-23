import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import "swiper/css/bundle";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  BookmarkIcon,
  CalendarIcon,
  CameraIcon,
  MapPinIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import { Property } from "@/types";

const SingleRealEstate: React.FC<{
  property: Property;
  loading?: boolean;
  classes?: string;
}> = ({ property, loading, classes }) => {
  const goToMapsUrl = (e: any) => {
    e.stopPropagation(); // Prevent the Link click
    e.preventDefault();
    const url = `http://maps.google.com/?q=${property.address}`;

    window.open(url, "_blank");
  };

  return (
    <div className={twMerge("w-full", classes)}>
      <Link href={`/property/${property.id}`}>
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all duration-200 transform hover:shadow-md h-full">
          <CardHeader className="p-0 relative">
            {!loading && (
              <div className="absolute z-50 top-0 right-0 bg-gray-800 text-white text-sm rounded-bl-lg px-3 py-1 flex items-center opacity-80">
                <span className="material-icons mr-1 text-base">
                  <CameraIcon className="h-5 w-5" />
                </span>
                {property.images.length}
              </div>
            )}

            {loading ? (
              <Skeleton className="rounded-lg h-56 w-full" />
            ) : (
              <Image
                alt={property.title}
                className="object-cover h-full w-full relative"
                height={300}
                priority={true}
                src={property.images[0].url}
                width={300}
              />
            )}
          </CardHeader>
          <CardBody>
            <div className="p-4 flex flex-col space-y-4 flex-grow">
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">
                  {property.price.toLocaleString()} M Ft
                </h2>
                <p className="text-sm text-slate-500">
                  {property.squarMeterPrice.toFixed(2)} M Ft/m²
                </p>
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <div className="text-gray-600 flex flex-col space-y-2">
                  {/* Size */}
                  <div className="flex items-center space-x-2">
                    icon
                    <p>{property.size} m²</p>
                  </div>

                  {/* Address */}
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
                </div>
              </Skeleton>

              <Skeleton className="rounded-lg" isLoaded={!loading}>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    <Squares2X2Icon className="h-5 w-5 text-gray-500 mr-1" />
                    {property.type}
                  </span>
                  <span className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-1" />
                    Built: {property.yearBuilt}
                  </span>
                </div>
              </Skeleton>
            </div>
            <Skeleton className="rounded-lg p-4" isLoaded={!loading}>
              <div className="flex gap-2 items-center ">
                <Button
                  className="w-2/3 text-white text-center py-2 rounded-lg  transition"
                  color="primary"
                >
                  View Details
                </Button>
                <Button
                  isIconOnly
                  className="w-1/3"
                  color="primary"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the Link click
                    e.preventDefault(); // Prevent the default behavior
                    console.log("Bookmark icon clicked!"); // Add your logic here
                  }}
                >
                  <Tooltip content="Save listing">
                    <BookmarkIcon className="h-5 w-5 text-gray-500" />
                  </Tooltip>
                </Button>
              </div>
            </Skeleton>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default SingleRealEstate;
