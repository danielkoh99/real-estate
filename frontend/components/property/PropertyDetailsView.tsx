import { Card, CardBody, Divider } from "@heroui/react";
import { CurrencyDollarIcon, CalendarIcon } from "@heroicons/react/24/outline";

import ContactUploader from "./ContactUploader";
import SaveListingBtn from "./SaveListingBtn";
import GoToMaps from "./GoToMaps";

import ImageSwiperThumbnail from "@/components/global/ImageSwiperThumbnail";
import { AddProperty, PropertyResponse } from "@/types";

interface PropertyDetailsProps {
  property: AddProperty | PropertyResponse;
  preview?: boolean;
}
export default function PropertyDetailsView({
  property,
  preview = false,
}: PropertyDetailsProps) {
  const hasListedByUser = "listedByUser" in property && property.listedByUser;
  const hasPropertyId = "id" in property && property.id;

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full relative">
      <div
        className={`flex flex-col gap-8 ${!preview ? "md:w-2/3" : "w-full"}`}
      >
        <Card className="p-5">
          <div className="flex items-center justify-between text-gray-700 mb-4">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            <div className="flex justify-end items-center gap-5">
              <GoToMaps address={property.address} />
              {hasPropertyId && !preview && (
                <SaveListingBtn color="black" propertyId={property.id} />
              )}
            </div>
          </div>
          <ImageSwiperThumbnail images={property.images} />
          <CardBody>
            <div className="flex flex-wrap gap-4 text-lg text-gray-800">
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
                {property.price?.toLocaleString()} Ft
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                {property.size} m²
              </div>
            </div>

            <p className="text-gray-600 mt-4">{property.description}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-start gap-2 lg:gap-6 text-gray-800">
              <div className="flex-1 space-y-2">
                <DetailItem label="Address" value={property.address} />
                <DetailItem label="City" value={property.city} />
                <DetailItem
                  label="Year Built"
                  value={property.yearBuilt.toString()}
                />
                <DetailItem label="Type" value={property.type} />
                <DetailItem
                  label="Bedrooms"
                  value={property.bedrooms.toString()}
                />
              </div>
              <Divider orientation="vertical" />
              <div className="flex-1 space-y-2">
                <DetailItem
                  label="Bathrooms"
                  value={property.bathrooms.toString()}
                />
                <DetailItem label="Size" value={`${property.size} m²`} />
                {property.district && (
                  <DetailItem label="District" value={property.district} />
                )}
                <DetailItem label="Category" value={property.category} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {hasListedByUser && !preview && (
        <div className="w-full md:w-1/3 relative">
          <div className="sticky top-0">
            <ContactUploader listedByUser={property.listedByUser} />
          </div>
        </div>
      )}
    </div>
  );
}
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
