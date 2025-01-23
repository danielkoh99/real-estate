import { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";

import PropertiesView from "@/components/property/PropertiesView";
import SearchFilters from "@/components/search/SearchFilters";
import DefaultLayout from "@/layouts/default";
import usePropertyStore from "@/stores/appStore";
import PaginationComponent from "@/components/Pagination";

export default function IndexPage() {
  const { query, push } = useRouter();
  const { page, limit } = query;
  const {
    fetchProperties,
    setPage,
    setLimit,
    limit: queryLimit,
    properties,
    loading,
    error,
  } = usePropertyStore();
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  };

  useEffect(() => {
    // Check if page and limit exist in the query

    if (!page || !limit) {
      // Use a timeout to delay updating the query if values are not yet defined
      const timeout = setTimeout(() => {
        const updatedQuery = {
          ...query,
          page: query.page || "1",
          limit: query.limit || "10",
        };

        push({ pathname: "/", query: updatedQuery }, undefined, {
          shallow: true,
        });
      }, 100); // Adjust timeout as needed

      return () => clearTimeout(timeout); // Clean up timeout on unmount
    }

    // Sync Zustand state
    if (page) setPage(parseInt(page as string));
    if (limit) setLimit(parseInt(limit as string));

    // Fetch properties after syncing state
    fetchProperties();
  }, [page, limit]);

  return (
    <DefaultLayout>
      <div
        className={`flex flex-col gap-4 h-full ${error ? "" : "justify-between"}`}
      >
        <SearchFilters />
        <Card className="flex flex-col p-4 gap-4">
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
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <PropertiesView
            error={error}
            loading={loading}
            properties={properties}
          />
          <PaginationComponent />
        </Card>
      </div>
    </DefaultLayout>
  );
}
