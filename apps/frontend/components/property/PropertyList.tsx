import { useEffect, forwardRef } from "react";

import SingleRealEstate from "../property/SinglePropertyItem";

import { PropertyResponse } from "@/types";
import useUserStore from "@/stores/userStore";

type PropertyListProps = {
  properties: PropertyResponse[] | undefined;
  delayedLoading?: boolean;
  showMap?: boolean;
  activePropertyId?: string;
  itemRefs?: React.RefObject<Record<string, HTMLDivElement | null>>;
  canEdit?: boolean;
};

const PropertyList = forwardRef<HTMLDivElement, PropertyListProps>(
  (
    {
      properties,
      delayedLoading,
      showMap,
      activePropertyId,
      itemRefs,
      canEdit,
    },
    ref,
  ) => {
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
              if (itemRefs?.current && el) itemRefs.current[property.id] = el;
            }}
            className={`w-full flex justify-center items-center transition duration-300 ${
              activePropertyId === property.id
                ? "ring-2 ring-blue-500 rounded-lg"
                : ""
            }`}
          >
            <SingleRealEstate
              canEdit={canEdit}
              loading={delayedLoading}
              property={property}
            />
          </div>
        ))}
      </div>
    );
  },
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
