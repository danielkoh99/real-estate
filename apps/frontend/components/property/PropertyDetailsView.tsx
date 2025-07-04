import { Card, CardBody, Divider } from "@heroui/react";
import { CurrencyDollarIcon, CalendarIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import ContactUploader from "./ContactUploader";
import SaveListingBtn from "./SaveListingBtn";
import GoToMaps from "./GoToMaps";

import { AddProperty, MapLocationData, PropertyForDisplay } from "@/types";

interface PropertyDetailsProps {
  property: PropertyForDisplay | AddProperty;
  preview?: boolean;
}
export default function PropertyDetailsView({
  property,
  preview = false,
}: PropertyDetailsProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    [],
  );
  const ImageSwiper = useMemo(
    () =>
      dynamic(() => import("../global/ImageSwiperThumbnail"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    [],
  );
  const title = `${property.type} for sale`;
  const hasListedByUser = "listedByUser" in property && property.listedByUser;
  const locationObj = useMemo<MapLocationData | undefined>(() => {
    const p = property as PropertyForDisplay;

    if (!preview) {
      return {
        lat: p.location.lat,
        lon: p.location.lon,
        boundingbox: p.location.boundingbox,
        display_name: p.address,
        propertyId: p.id,
        image: p.images[0].url,
      };
    }

    return undefined;
  }, [property]);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full relative">
      <div
        className={`flex flex-col gap-8 ${!preview ? "md:w-3/5" : "w-full"}`}
      >
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between text-gray-700 mb-4 gap-2 text-center">
            <div className="flex flex-col justify-start items-start ">
              <h1 className="text-lg font-bold">{title}</h1>
              <p>{property.city}</p>
              <p>{property.district}</p>
            </div>
            <div className="flex justify-end items-center gap-5">
              <GoToMaps address={property.address} />
              {property.id && !preview && (
                <SaveListingBtn color="black" propertyId={property.id} />
              )}
            </div>
          </div>
          <ImageSwiper images={property.images} />
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
      {hasListedByUser && (
        <div className="w-full md:w-2/5">
          <div className="sticky top-0 h-screen flex flex-col gap-5">
            <ContactUploader listedByUser={property.listedByUser} />
            {locationObj && (
              <div className="flex-1">
                <Map locations={[locationObj]} />
              </div>
            )}
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
