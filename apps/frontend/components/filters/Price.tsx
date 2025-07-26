import { Input } from "@heroui/react";

import { PropertyFilters } from "@/types";

export default function Price({
  query,
  setValue,
}: {
  query: Partial<PropertyFilters>;
  setValue: (type: string, val: string) => void;
}) {
  return (
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
  );
}
