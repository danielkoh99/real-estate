import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { ChangeEvent } from "react";

import usePropertyStore from "@/stores/appStore";

const SortFilters = () => {
  const { setLimit, limit: queryLimit } = usePropertyStore();
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  };

  return (
    <div className="flex justify-between items-center">
      <Select
        className="w-1/3"
        label="Number of listings per page"
        placeholder="10"
        selectedKeys={[queryLimit.toString()]}
        onChange={handleSelectChange}
      >
        <SelectItem key="10">10</SelectItem>
        <SelectItem key="20">20</SelectItem>
        <SelectItem key="30">30</SelectItem>
      </Select>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Sort by</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">Newest</DropdownItem>
          <DropdownItem key="copy">Price increasing</DropdownItem>
          <DropdownItem key="edit">Price decreasing</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default SortFilters;
