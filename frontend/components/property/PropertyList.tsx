import React from "react";

import SingleRealEstate from "../SinglePropertyItem";

import { Property } from "@/types";

const PropertyList: React.FC<{
  properties: Property[] | undefined;
  delayedLoading?: boolean;
}> = ({ properties, delayedLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {properties &&
        properties.map((property) => (
          <SingleRealEstate
            key={property.id}
            loading={delayedLoading}
            property={property}
          />
        ))}
    </div>
  );
};

export default PropertyList;
