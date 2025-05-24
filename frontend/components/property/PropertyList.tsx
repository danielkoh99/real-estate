import React, { useEffect } from "react";

import SingleRealEstate from "../property/SinglePropertyItem";

import { PropertyResponse } from "@/types";
import useUserStore from "@/stores/userStore";

const PropertyList: React.FC<{
  properties: PropertyResponse[] | undefined;
  delayedLoading?: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  showMap: boolean;
}> = ({ properties, delayedLoading, ref, showMap }) => {
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
          className="w-full flex justify-center items-center"
        >
          <SingleRealEstate loading={delayedLoading} property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
