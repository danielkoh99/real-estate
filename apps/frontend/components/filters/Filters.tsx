import { Button, Card } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { PropertyType } from "@real-estate/shared";

import Size from "./Size";
import Advanced from "./Advanced";
import Price from "./Price";
import District from "./District";
import Type from "./Type";

import { PropertyFilters } from "@/types";
import { useQueryStore } from "@/stores/queryStore";

const SearchFilter = () => {
  const { filters, updateFilters } = useQueryStore();
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

  const handleSelectArrays = (
    type: string,
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const selected =
      e.target.value.split(",").filter((val) => val !== "").length > 0
        ? e.target.value.split(",")
        : [];

    setQuery((prev) => ({
      ...prev,
      [type]: selected,
    }));
  };

  const setValue = (type: string, val: any) => {
    let value: any = val;

    if (typeof val === "string" && /^\d+$/.test(val)) {
      value = parseInt(val, 10);
    }

    if (typeof val === "boolean") {
      if (val === true) value = val;
      else value = null;
    }

    if (val === "" || val === undefined) {
      value = null;
    }

    setQuery((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Card>
      <div className="flex flex-col md:items-center p-4 w-full gap-3">
        <div className="flex flex-col md:flex-row w-full gap-3">
          <Type handleSelectChange={handleSelectChange} query={query} />
          <District query={query} setArrayVal={handleSelectArrays} />
        </div>

        <div className="flex w-full flex-col md:flex-row gap-3">
          <Price query={query} setValue={setValue} />
          <Size query={query} setValue={setValue} />
        </div>
        <Advanced
          query={query}
          setArrayVal={handleSelectArrays}
          setValue={setValue}
        />
        <div className="flex justify-end w-full">
          <Button variant="ghost" onPress={() => updateFilters(query)}>
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchFilter;
