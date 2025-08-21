import { Card } from "@heroui/react";
import { useRef } from "react";

import PropertiesView from "@/components/property/PropertiesView";
import Filters from "@/components/filters/Filters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/propertyStore";
import PaginationComponent from "@/components/property/Pagination";
import SortFilters from "@/components/filters/Sort";
import TotalPropertiesCount from "@/components/property/TotalPropertiesCount";
import useFilterParams from "@/hooks/useFilterParams";
import ShowMap from "@/components/property/ShowMap";

export default function IndexPage() {
  useFilterParams();
  const { properties, loading, error, showMap, setShowMap } =
    usePropertyStore();

  const propertiesViewRef = useRef<HTMLDivElement>(null);

  return (
    <DefaultLayout>
      <div
        className={`flex flex-col gap-4 h-full ${error ? "" : "justify-between"}`}
      >
        <Filters />
        <Card
          className={`flex flex-col p-4 gap-4 ${showMap ? "h-screen" : "flex-1"} overflow-hidden`}
        >
          <SortFilters />
          <div className="w-full flex flex-row justify-between">
            <TotalPropertiesCount />
            {properties.length > 0 && (
              <ShowMap setShowMap={setShowMap} showMap={showMap} />
            )}
          </div>

          <div className="flex-1 min-h-0">
            <PropertiesView
              ref={propertiesViewRef}
              error={error}
              loading={loading}
              properties={properties}
              showMap={showMap}
            />
          </div>

          <PaginationComponent propertiesViewRef={propertiesViewRef} />
        </Card>
      </div>
    </DefaultLayout>
  );
}
