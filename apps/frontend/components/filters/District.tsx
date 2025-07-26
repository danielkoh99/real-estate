import type { ChangeEvent } from "react";

import { Select, SelectItem } from "@heroui/react";
import { BPDistricts } from "@real-estate/shared";

import { PropertyFilters } from "@/types";

export default function District({
  query,
  setArrayVal,
}: {
  query: Partial<PropertyFilters>;
  setArrayVal: (type: string, e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex-1">
      <Select
        label="Districts"
        labelPlacement="outside"
        placeholder="Select districts"
        selectedKeys={query.districts ?? []}
        selectionMode="multiple"
        onChange={(e) => setArrayVal("districts", e)}
      >
        {Object.keys(BPDistricts).map((district) => (
          <SelectItem key={district} textValue={district}>
            {district}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
