import { Squares2X2Icon, CalendarIcon } from "@heroicons/react/24/outline";
import { CardBody, Skeleton, Chip } from "@heroui/react";

import Price from "../Price";

import { PropertyResponse } from "@/types";

export const ItemBody: React.FC<{
  property: PropertyResponse;
  loading?: boolean;
  small?: boolean;
}> = ({ property, loading, small = false }) => {
  return (
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
  );
};
