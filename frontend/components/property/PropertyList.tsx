import React, { useEffect } from "react";

import SingleRealEstate from "../property/SinglePropertyItem";

import { PropertyResponse } from "@/types";
import useUserStore from "@/stores/userStore";

const PropertyList: React.FC<{
  properties: PropertyResponse[] | undefined;
  delayedLoading?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
  showMap?: boolean;
  activePropertyId?: string;
  itemRefs?: React.RefObject<Record<string, HTMLDivElement | null>>;
}> = ({
  properties,
  delayedLoading,
  ref,
  showMap,
  activePropertyId,
  itemRefs,
}) => {
  const { currentUser, fetchSavedProperties } = useUserStore();

  useEffect(() => {
    const fetchAndSetSavedProperties = async () => {
      if (currentUser) {
        await fetchSavedProperties();
      }
    };

    fetchAndSetSavedProperties();
  }, [currentUser]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 ${showMap ? "md:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-4 w-full`}
    >
      {properties?.map((property) => (
        <div
          key={property.id}
          ref={(el) => {
            if (itemRefs && el) itemRefs.current[property.id] = el;
          }}
          className={`w-full flex justify-center items-center transition duration-300 ${
            activePropertyId === property.id
              ? "ring-2 ring-blue-500 rounded-lg"
              : ""
          }`}
        >
          <SingleRealEstate loading={delayedLoading} property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
