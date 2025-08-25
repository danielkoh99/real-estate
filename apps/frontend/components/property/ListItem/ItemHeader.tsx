import { CameraIcon } from "@heroicons/react/24/outline";
import { CardHeader, Skeleton } from "@heroui/react";
import { FC } from "react";

import SaveListingBtn from "../SaveListingBtn";

import Banner from "./Banner";

import ImageSwiper from "@/components/Image/Swiper";
import { PropertyResponse } from "@/types";
interface ItemHeaderProps {
  property: PropertyResponse;
  loading?: boolean;
  canEdit?: boolean;
}
export const ItemHeader: FC<ItemHeaderProps> = ({
  property,
  loading,
  canEdit,
}) => {
  return (
    <CardHeader className="p-0 relative h-1/2 overflow-hidden rounded-t-lg group">
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
  );
};
