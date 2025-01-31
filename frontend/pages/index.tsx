import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@heroui/react";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilters from "@/components/search/SearchFilters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/appStore";
import PaginationComponent from "@/components/property/Pagination";
import SortFilters from "@/components/search/SortFilters";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";

export default function IndexPage() {
  const { query, push } = useRouter();
  const { page, limit } = query;
  const { fetchProperties, setPage, setLimit, properties, loading, error } =
    usePropertyStore();

  useEffect(() => {
    if (!page || !limit) {
      const timeout = setTimeout(() => {
        const updatedQuery = {
          ...query,
          page: query.page || "1",
          limit: query.limit || "10",
        };

        push({ pathname: "/", query: updatedQuery }, undefined, {
          shallow: true,
        });
      }, 100);

      return () => clearTimeout(timeout);
    }

    if (page) setPage(parseInt(page as string));
    if (limit) setLimit(parseInt(limit as string));

    fetchProperties();
  }, [page, limit]);

  return (
    <>
      <DefaultLayout>
        <div
          className={`flex flex-col gap-4 h-full ${error ? "" : "justify-between"}`}
        >
          <SearchFilters />
          <Card className="flex flex-col p-4 gap-4">
            <SortFilters />
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
