import type { ChangeEvent } from "react";

import { Select, SelectItem } from "@heroui/react";
import { PropertyType } from "@real-estate/shared";

import { PropertyFilters } from "@/types";
import { capitalizeFirst } from "@/utils";

export default function Type({
  query,
  handleSelectChange,
}: {
  query: Partial<PropertyFilters>;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex-1">
      <Select
        defaultSelectedKeys={[query.type || PropertyType.APARTMENT]}
        label="Select type"
        labelPlacement="outside"
        value={query.type || PropertyType.APARTMENT}
        onChange={handleSelectChange}
      >
        {Object.values(PropertyType).map((type) => (
          <SelectItem key={type} textValue={type}>
            {capitalizeFirst(type)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
