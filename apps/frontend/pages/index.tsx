import { Card, Switch } from "@heroui/react";
import { useRef } from "react";
import { MapIcon, XMarkIcon } from "@heroicons/react/24/outline";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilters from "@/components/search/SearchFilters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/propertyStore";
import PaginationComponent from "@/components/property/Pagination";
import SortFilters from "@/components/search/SortFilters";
import TotalPropertiesCount from "@/components/property/TotalPropertiesCount";
import useFilterParams from "@/hooks/useFilterParams";

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
        <SearchFilters />
        <Card
          className={`flex flex-col p-4 gap-4 ${showMap ? "h-screen" : "flex-1"} overflow-hidden`}
        >
          <SortFilters />
          <div className="w-full flex flex-row justify-between">
            <TotalPropertiesCount />
            <Switch
              isSelected={showMap}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <XMarkIcon className={className} />
                ) : (
                  <MapIcon className={className} />
                )
              }
              onValueChange={setShowMap}
            >
              {showMap ? "Hide Map" : "Show Map"}
            </Switch>
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
