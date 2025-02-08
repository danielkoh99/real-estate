import { useEffect, useState } from "react";

import Error from "@/components/global/Error";
import NotFound from "@/components/property/NotFound";
import PropertyList from "@/components/property/PropertyList";
import { Property } from "@/types";

const PropertiesView: React.FC<{
  properties: Property[] | undefined;
  error: any;
  loading: boolean;
}> = ({ properties, error, loading }): JSX.Element => {
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true);
    } else {
      const timer = setTimeout(() => setDelayedLoading(false), 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, properties]);

  if (error) return <Error error_message={error.message} />;

  return (
    <>
      {!properties?.length && <NotFound />}
      <PropertyList delayedLoading={delayedLoading} properties={properties} />
    </>
  );
};

export default PropertiesView;
