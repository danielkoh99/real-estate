import dynamic from "next/dynamic";
import { JSX, useState, useMemo, useEffect, useRef, forwardRef } from "react";
import { Spinner } from "@heroui/react";

import Error from "../global/Error";

import NotFound from "./NotFound";
import PropertyList from "./PropertyList";

import { MapLocationData, PropertyResponse } from "@/types";

const PropertiesView = forwardRef<
  HTMLDivElement,
  {
    properties: PropertyResponse[] | undefined;
    error: any;
    loading: boolean;
    showMap: boolean;
    canEdit?: boolean;
  }
>(({ properties, error, loading, showMap, canEdit }, ref): JSX.Element => {
  const [delayedLoading, setDelayedLoading] = useState(false);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activePropertyId, setActivePropertyId] = useState<string>();

  const scrollToProperty = (id: string) => {
    const element = itemRefs.current[id];

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActivePropertyId(id);
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../property/Map"), {
        ssr: false,
        loading: () => (
          <div className="flex items-center justify-center h-full w-full">
            <Spinner color="primary" label="Loading map..." size="lg" />
          </div>
        ),
      }),
    []
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

    return properties.map((property) => ({
      ...property.location,
      display_name: property.address,
      image: property.images[0]?.url,
      propertyId: property.id,
    }));
  }, [properties]);

  if (error) return <Error error_message={error.message} />;
  if ((!loading && !properties?.length) || !properties) return <NotFound />;

  return (
    <div className="flex lg:flex-row w-full h-full gap-4 transition-all duration-500 ease-in-out overflow-y-auto">
      <div
        className={`transition-all duration-500 ease-in-out ${showMap ? "w-1/2" : "w-full"}`}
      >
        <div
          className={`h-full px-2 py-1 rounded-lg ${showMap ? "overflow-y-auto" : ""}`}
        >
          <PropertyList
            ref={ref}
            activePropertyId={activePropertyId}
            canEdit={canEdit}
            delayedLoading={delayedLoading}
            itemRefs={itemRefs}
            properties={properties}
            showMap={showMap}
          />
        </div>
      </div>

      {showMap && (
        <div className="flex w-1/2 h-full">
          <Map
            clickHandler={scrollToProperty}
            locations={propertiesLocations}
          />
        </div>
      )}
    </div>
  );
});

PropertiesView.displayName = "PropertiesView";

export default PropertiesView;
