import { Card } from "@heroui/react";
import React from "react";

import SingleRealEstate from "../property/SinglePropertyItem";

import { PropertyResponse } from "@/types";

const SimilarProperties: React.FC<{
  relatedProperties: PropertyResponse[];
}> = ({ relatedProperties }) => {
  if (!relatedProperties.length) return null;

  return (
    <Card className="flex flex-col w-full relative">
      <div className="font-bold pl-5 py-5">Similar Properties</div>
      <div
        className="flex flex-row overflow-x-auto p-4 gap-4 snap-x snap-mandatory hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {relatedProperties.map((property) => (
          <SingleRealEstate
            key={property.id}
            classes="flex-shrink-0 w-64 snap-center"
            property={property}
          />
        ))}
      </div>
    </Card>
  );
};

export default SimilarProperties;
