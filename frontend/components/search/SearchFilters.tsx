import { Button, Card, Input, Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";

import { BPDistricts, PropertyFilters, PropertyType } from "@/types";
import { capitalizeFirst } from "@/utils/stringUtils";
import useFilterParams from "@/hooks/useFilterParams";
import { useQueryStore } from "@/stores/queryStore";

const SearchFilter = () => {
  const { filters } = useQueryStore();
  const { setQueryParams } = useFilterParams();
  const [query, setQuery] = useState<Partial<PropertyFilters>>({
    ...filters,
  });

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      ...filters,
    }));
  }, [filters]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuery((prev) => ({ ...prev, type: e.target.value as PropertyType }));
  };

  const handleSelectDistricts = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDistricts =
      e.target.value.split(",").filter((district) => district !== "").length > 0
        ? e.target.value.split(",")
        : [];

    setQuery((prev) => ({
      ...prev,
      districts: selectedDistricts as BPDistricts[],
    }));
  };

  const setValue = (type: string, val: string) => {
    const value = val ? parseInt(val) : undefined;

    setQuery((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Card>
      <div className="flex flex-col md:items-center p-4 w-full gap-3">
        <div className="flex w-full gap-3">
          <div className="flex-1">
            <Select
              defaultSelectedKeys={[query.type || PropertyType.APARTMENT]}
              label="Select type"
              labelPlacement="outside"
              value={query.type || PropertyType.APARTMENT}
              onChange={handleSelectChange}
            >
              {Object.values(PropertyType).map((type) => (
                <SelectItem key={type} value={type}>
                  {capitalizeFirst(type)}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex-1">
            <Select
              label="Districts"
              labelPlacement="outside"
              placeholder="Select districts"
              selectedKeys={query.districts ?? []}
              selectionMode="multiple"
              onChange={handleSelectDistricts}
            >
              {Object.keys(BPDistricts).map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-3">
          <div className="flex flex-col flex-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  isClearable
                  label="Minimum price"
                  labelPlacement="outside"
                  placeholder="Start value"
                  type="number"
                  value={query.priceMin?.toString() || ""}
                  onChange={(e) => setValue("priceMin", e.target.value)}
                  onClear={() => setValue("priceMin", "")}
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="flex-1">
                <Input
                  isClearable
                  label="Maximum price"
                  labelPlacement="outside"
                  placeholder="End value"
                  type="number"
                  value={query.priceMax?.toString() || ""}
                  onChange={(e) => setValue("priceMax", e.target.value)}
                  onClear={() => setValue("priceMax", "")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-gray-700 font-medium mb-1">Size</span>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  isClearable
                  placeholder="Start value"
                  type="number"
                  value={query.sizeMin?.toString() || ""}
                  onChange={(e) => setValue("sizeMin", e.target.value)}
                  onClear={() => setValue("sizeMin", "")}
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="flex-1">
                <Input
                  isClearable
                  placeholder="End value"
                  type="number"
                  value={query.sizeMax?.toString() || ""}
                  onChange={(e) => setValue("sizeMax", e.target.value)}
                  onClear={() => setValue("sizeMax", "")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            onPress={() =>
              setQueryParams((prev) => ({
                ...prev,
                ...query,
              }))
            }
          >
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchFilter;
