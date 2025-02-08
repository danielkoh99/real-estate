import { Card } from "@heroui/react";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilters from "@/components/search/SearchFilters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/propertyStore";
import PaginationComponent from "@/components/property/Pagination";
import SortFilters from "@/components/search/SortFilters";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";
import TotalPropertiesCount from "@/components/property/TotalPropertiesCount";
import useFilterParams from "@/hooks/useFilterParams";

export default function IndexPage() {
  const { properties, loading, error } = usePropertyStore();

  useFilterParams();

  return (
    <>
      <DefaultLayout>
        <div
          className={`flex flex-col gap-4 h-full ${error ? "" : "justify-between"}`}
        >
          <SearchFilters />
          <Card className="flex flex-1 flex-col p-4 gap-4">
            <SortFilters />
            <TotalPropertiesCount />
            <PropertiesView
              error={error}
              loading={loading}
              properties={properties}
            />
            <PaginationComponent />
          </Card>
        </div>
        <LoginRequiredModal />
      </DefaultLayout>
    </>
  );
}
