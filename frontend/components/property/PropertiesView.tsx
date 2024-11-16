import { Card, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

import Error from "../Error";
import SingleRealEstate from "../SinglePropertyItem";
import PaginationComponent from "../Pagination";

import NotFound from "./NotFound";

import { Property } from "@/types";
import usePropertyStore from "@/stores/appStore";
const PropertiesView: React.FC<{
  properties: Property[] | undefined;
  error: any;
  loading: boolean;
}> = ({ properties, error, loading }): JSX.Element => {
  const { setLimit, getLimit } = usePropertyStore();
  const [delayedLoading, setDelayedLoading] = useState(true);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  };

  useEffect(() => {
    setTimeout(() => setDelayedLoading(false), 3000);
  }, [loading]);
  if (error) return <Error error_message={error.message} />;

  return (
    <Card className="flex flex-col p-4">
      {!properties?.length && <NotFound />}
      <Select
        defaultSelectedKeys={[getLimit()]}
        label="Number of listings per page"
        placeholder="10"
        onChange={handleSelectChange}
      >
        <SelectItem key="10">10</SelectItem>
        <SelectItem key="20">20</SelectItem>
        <SelectItem key="30">30</SelectItem>
      </Select>
      <div className="flex flex-row flex-wrap justify-start">
        {properties &&
          properties.map((property) => (
            <SingleRealEstate
              key={property.id}
              loading={delayedLoading}
              property={property}
            />
          ))}
      </div>
      <PaginationComponent />
    </Card>
  );
};

export default PropertiesView;
