import { Card, CardBody, CardHeader, Chip, Skeleton } from "@heroui/react";
import "swiper/css/bundle";
import { twMerge } from "tailwind-merge";
import {
  CalendarIcon,
  CameraIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import ImageSwiper from "../Image/Swiper";

import SaveListingBtn from "./SaveListingBtn";
import Price from "./Price";
import Banner from "./Banner";

import { PropertyResponse } from "@/types";

const SingleRealEstate: React.FC<{
  property: PropertyResponse;
  small?: boolean;
  loading?: boolean;
  classes?: string;
  canEdit?: boolean;
}> = ({ property, loading, classes, canEdit, small = false }) => {
  const href = canEdit
    ? `/property/edit/${property.id}`
    : `/property/${property.id}`;

  return (
    <Link
      className="w-full text-white text-center rounded-lg h-full flex "
      href={href}
    >
      <div
        className={twMerge(
          "w-full h-full md:max-w-sm flex justify-center",
          classes,
        )}
      >
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all duration-300 transform hover:shadow-lg w-full min-h-[400px] flex flex-col h-full">
          <CardHeader className="p-0 relative h-1/2 overflow-hidden rounded-t-lg group">
            {/* Hover icons */}

            {!loading && !canEdit && (
              <>
                <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs rounded-bl-lg px-2 py-1 flex items-center opacity-80 z-10">
                  <CameraIcon className="h-8 w-8 mr-1" />
                  {property.images.length}
                </div>
                <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs rounded-br-lg px-2 py-1 opacity-80 z-10 flex items-center">
                  <SaveListingBtn propertyId={property.id} />
                </div>
                <Banner type={property.promotionType} />
              </>
            )}

            {loading ? (
              <Skeleton className="rounded-lg h-full w-full" />
            ) : (
              <ImageSwiper
                classes="h-full"
                images={property.images}
                thumbsSwiper={undefined}
              />
            )}
          </CardHeader>

          <CardBody className="p-3 flex flex-col flex-grow">
            <div className="flex flex-col gap-2 flex-grow">
              <Skeleton isLoaded={!loading}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Price price={property.price} />
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
                  <div className="flex flex-wrap items-center gap-1 text-xs text-slate-600 mt-auto">
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
          {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 z-10" />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              // onClick={() => handleEdit(property.id)}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
            <button
              // onClick={() => handleDelete(property.id)}
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div> */}
        </Card>
      </div>
    </Link>
  );
};

export default SingleRealEstate;
