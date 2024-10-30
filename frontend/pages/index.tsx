import { useEffect } from "react";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilter from "@/components/SearchFilter";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/appStore";
export default function IndexPage() {
  const { fetchProperties, properties, loading, error } = usePropertyStore(
    (state) => ({
      fetchProperties: state.fetchProperties,
      properties: state.properties,
      loading: state.loading,
      error: state.error,
    }),
  );

  useEffect(() => {
    const loadData = async () => {
      await fetchProperties(); // Fetch properties when the component mounts
    };

    loadData();
  }, [fetchProperties]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 h-full justify-between">
        <SearchFilter />

        <PropertiesView
          error={error}
          loading={loading}
          properties={properties}
        />
      </div>
    </DefaultLayout>
  );
}
