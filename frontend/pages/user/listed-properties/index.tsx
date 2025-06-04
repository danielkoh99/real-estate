import { useRef, useEffect } from "react";

import PropertiesView from "@/components/property/PropertiesView";
import useUserStore from "@/stores/userStore";
import Error from "@/components/global/Error";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const propertiesViewRef = useRef<HTMLDivElement>(null);

  const { listedProperties, fetchListedProperties, loading, error } =
    useUserStore();

  useEffect(() => {
    const load = async () => {
      await fetchListedProperties();
    };

    load();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {error && <Error error_message={error} />}

        <div className="flex-1 min-h-0 overflow-hidden">
          <PropertiesView
            ref={propertiesViewRef}
            canEdit={true}
            error={false}
            loading={loading}
            properties={listedProperties}
            showMap={false}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
