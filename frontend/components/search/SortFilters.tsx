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
        className="w-1/4"
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
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default SortFilters;
