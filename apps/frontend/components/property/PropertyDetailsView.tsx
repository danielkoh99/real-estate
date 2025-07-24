import { Card, CardBody } from "@heroui/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import ContactUploader from "./ContactUploader";
import SaveListingBtn from "./SaveListingBtn";
import GoToMaps from "./GoToMaps";
import Price from "./Price";
import PHistory from "./PriceHistory";
import Details from "./Details";

import { AddProperty, MapLocationData, PropertyForDisplay } from "@/types";
import { calculatePriceChange } from "@/utils";

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
      dynamic(() => import("../Image/SwiperThumbnail"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    [],
  );
  const title = `${property.type} for sale`;
  const hasListedByUser = "listedByUser" in property && property.listedByUser;
  const hasPriceHistory = "priceHistory" in property && property.priceHistory;
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

  const priceChange = useMemo(
    () => calculatePriceChange(property.price, property.oldPrice),
    [property.price, property.oldPrice],
  );

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
              <p>{property.district} District</p>
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
                <Price
                  oldPrice={property.oldPrice}
                  price={property.price}
                  priceChange={priceChange}
                />
              </div>
              <div className="flex items-center">{property.size} m²</div>
            </div>

            <p className="text-gray-600 mt-4">{property.description}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Details property={property as PropertyForDisplay} />
          </CardBody>
        </Card>
        {hasPriceHistory && (
          <Card>
            <CardBody>
              <PHistory
                currentPrice={property.price}
                priceHistory={property.priceHistory}
              />
            </CardBody>
          </Card>
        )}
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
