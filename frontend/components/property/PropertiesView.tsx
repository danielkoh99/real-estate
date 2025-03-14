import { JSX, useEffect, useState } from "react";

import Error from "@/components/global/Error";
import NotFound from "@/components/property/NotFound";
import PropertyList from "@/components/property/PropertyList";
import { PropertyResponse } from "@/types";

const PropertiesView: React.FC<{
  properties: PropertyResponse[] | undefined;
  error: any;
  loading: boolean;
  ref: React.RefObject<HTMLDivElement|null>;
}> = ({ properties, error, loading,ref }): JSX.Element => {
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
      <PropertyList ref={ref} delayedLoading={delayedLoading} properties={properties} />
    </>
  );
};

export default PropertiesView;
