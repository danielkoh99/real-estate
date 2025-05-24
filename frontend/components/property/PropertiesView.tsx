import dynamic from "next/dynamic";
import { JSX, useState, useMemo, useEffect } from "react";

import Error from "../global/Error";

import NotFound from "./NotFound";
import PropertyList from "./PropertyList";

import { MapLocationData, PropertyResponse } from "@/types";

const PropertiesView: React.FC<{
  properties: PropertyResponse[] | undefined;
  error: any;
  loading: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  showMap: boolean;
}> = ({ properties, error, loading, ref, showMap }): JSX.Element => {
  const [delayedLoading, setDelayedLoading] = useState(false);

  const Map = useMemo(
    () =>
      dynamic(() => import("../property/Map"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true);
    } else {
      const timer = setTimeout(() => setDelayedLoading(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, properties]);
  const propertiesLocations = useMemo<MapLocationData[]>(() => {
    if (!properties) return [];

    return properties.map((property) => {
      return {
        ...property.location,
        display_name: property.address,
      };
    });
  }, [properties]);

  if (error) return <Error error_message={error.message} />;
  if ((!loading && !properties?.length) || !properties) return <NotFound />;

  return (
    <div className="flex lg:flex-row w-full h-full gap-4 transition-all duration-500 ease-in-out overflow-y-auto">
      <div
        className={`transition-all duration-500 ease-in-out ${
          showMap ? "w-1/2" : "w-full"
        }`}
      >
        <div className={`h-full ${showMap ? "overflow-y-auto" : ""}`}>
          <PropertyList
            ref={ref}
            delayedLoading={delayedLoading}
            properties={properties}
            showMap={showMap}
          />
        </div>
      </div>

      {showMap && (
        <div className="flex w-1/2 h-full">
          <Map locations={propertiesLocations} />
        </div>
      )}
    </div>
  );
};

export default PropertiesView;
