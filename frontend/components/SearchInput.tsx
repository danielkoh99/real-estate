import { Kbd, Input } from "@nextui-org/react";
import { useState } from "react";
import { useUpdateEffect } from "react-use";

import { SearchIcon } from "./icons";

export default function SearchInput() {
  const [value, setValue] = useState("");

  useUpdateEffect(() => {
    console.log("count", value); // will only show 1 and beyond
  }, [value]);

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
