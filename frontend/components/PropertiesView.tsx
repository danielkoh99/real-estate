import { Card } from "@nextui-org/react";

import Error from "./Error";
import SinglePropertyItem from "./SinglePropertyItem";

import useApi from "@/hooks/useApi";
import { PropertyRes } from "@/types";

const PropertiesView = () => {
  const { response, error, loading } = useApi<PropertyRes>({
    url: "/property",
    method: "GET",
    config: {
      params: {
        limit: 10,
        page: 1,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <Error error_message={error.message} />;

  return (
    <Card className="flex flex-row flex-wrap justify-center p-4">
      {response?.data.properties.map((property) => (
        <SinglePropertyItem key={property.id} property={property} />
      ))}
    </Card>
  );
};

export default PropertiesView;
