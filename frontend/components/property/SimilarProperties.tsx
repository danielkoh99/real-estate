import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card } from "@nextui-org/react";
import React, { useRef } from "react";

import ScrollChevron from "../ScrollChevron";
import SingleRealEstate from "../SinglePropertyItem";

import { Property } from "@/types";

const SimilarProperties: React.FC<{
  relatedProperties: Property[];
}> = ({ relatedProperties }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="flex w-full">
      <div className="flex font-bold pl-5 py-5">Similar Properties</div>
      {scrollContainerRef.current && (
        <ScrollChevron
          containerRef={scrollContainerRef.current}
          direction="left"
          scrollBy={200}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </ScrollChevron>
      )}
      <div ref={scrollContainerRef} className="flex flex-row overflow-x-auto">
        {relatedProperties.map((property) => (
          <SingleRealEstate
            key={property.id}
            classes="w-56 flex-shrink-0"
            property={property}
          />
        ))}
      </div>
    </Card>
  );
};

export default SimilarProperties;
