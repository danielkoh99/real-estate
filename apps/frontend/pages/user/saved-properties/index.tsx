import { useRef, useState, useEffect } from "react";

import PropertiesView from "@/components/property/PropertiesView";
import useUserStore from "@/stores/userStore";
import Error from "@/components/global/Error";
import DefaultLayout from "@/layouts/default";
import ShowMap from "@/components/property/ShowMap";

export default function IndexPage() {
  const [showMap, setShowMap] = useState(false);
  const propertiesViewRef = useRef<HTMLDivElement>(null);

  const { savedProperties, fetchSavedProperties, loading, error } =
    useUserStore();

  useEffect(() => {
    const load = async () => {
      await fetchSavedProperties();
    };

    load();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col h-screen overflow-hidden">
        {savedProperties?.length > 0 && (
          <div className="p-2">
            <ShowMap setShowMap={setShowMap} showMap={showMap} />
          </div>
        )}

        {error && <Error error_message={error} />}

        <div className="flex-1 min-h-0 overflow-hidden">
          <PropertiesView
            ref={propertiesViewRef}
            error={false}
            loading={loading}
            properties={savedProperties}
            showMap={showMap}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
