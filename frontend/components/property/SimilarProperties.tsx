import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card } from "@heroui/react";
import React, { useRef } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import ScrollChevron from "../ScrollChevron";
import SingleRealEstate from "../property/SinglePropertyItem";

import { Property } from "@/types";

const SimilarProperties: React.FC<{
  relatedProperties: Property[];
}> = ({ relatedProperties }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="flex w-full relative">
      <div className="flex font-bold pl-5 py-5">Similar Properties</div>
      {scrollContainerRef.current && (
        <>
          <ScrollChevron
            classes="right-3"
            containerRef={scrollContainerRef.current}
            direction="right"
            scrollBy={200}
          >
            <ChevronRightIcon className="w-7 h-7" />
          </ScrollChevron>
          <ScrollChevron
            classes="left-3"
            containerRef={scrollContainerRef.current}
            direction="left"
            scrollBy={200}
          >
            <ChevronLeftIcon className="w-7 h-7" />
          </ScrollChevron>
        </>
      )}
      <div
        ref={scrollContainerRef}
        className="flex flex-row overflow-x-auto p-4 gap-4"
      >
        {relatedProperties.map((property) => (
          <SingleRealEstate
            key={property.id}
            small
            classes="flex-shrink-0 w-64 h-80"
            property={property}
          />
        ))}
      </div>
    </Card>
  );
};

export default SimilarProperties;
