import { Input } from "@heroui/react";

import { PropertyFilters } from "@/types";

export default function Size({
  query,
  setValue,
}: {
  query: Partial<PropertyFilters>;
  setValue: (type: string, val: string) => void;
}) {
  return (
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
  );
}
