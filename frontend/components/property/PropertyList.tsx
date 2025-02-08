import React, { useEffect } from "react";

import SingleRealEstate from "../property/SinglePropertyItem";

import { Property } from "@/types";
import useUserStore from "@/stores/userStore";

const PropertyList: React.FC<{
  properties: Property[] | undefined;
  delayedLoading?: boolean;
}> = ({ properties, delayedLoading }) => {
  const { currentUser, fetchSavedProperties, savedProperties } = useUserStore();

  useEffect(() => {
    const fetchAndSetSavedProperties = async () => {
      if (currentUser) {
        await fetchSavedProperties();
      }
    };

    fetchAndSetSavedProperties();
  }, [currentUser]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {properties &&
        properties.map((property) => (
          <SingleRealEstate
            key={property.id}
            isSaved={savedProperties && savedProperties.includes(property.id)}
            loading={delayedLoading}
            property={property}
          />
        ))}
    </div>
  );
};

export default PropertyList;
