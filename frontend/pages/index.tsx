import { Card } from "@heroui/react";
import { useRef } from "react";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilters from "@/components/search/SearchFilters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/propertyStore";
import PaginationComponent from "@/components/property/Pagination";
import SortFilters from "@/components/search/SortFilters";
import TotalPropertiesCount from "@/components/property/TotalPropertiesCount";
import useFilterParams from "@/hooks/useFilterParams";

export default function IndexPage() {
  const { properties, loading, error } = usePropertyStore();

  useFilterParams();

  const propertiesViewRef = useRef<HTMLDivElement | null>(null);

  return (
    <DefaultLayout>
      <div
        className={`flex flex-col gap-4 h-full ${error ? "" : "justify-between"}`}
      >
        <SearchFilters />
        <Card className="flex flex-1 flex-col p-4 gap-4">
          <SortFilters />
          <TotalPropertiesCount />
          <PropertiesView
            ref={propertiesViewRef}
            error={error}
            loading={loading}
            properties={properties}
          />
          <PaginationComponent propertiesViewRef={propertiesViewRef} />
        </Card>
      </div>
    </DefaultLayout>
  );
}
