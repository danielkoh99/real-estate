import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";

import { SortDirection } from "@/types";
import { useQueryStore } from "@/stores/queryStore";

const SortFilters = () => {
  const { filters, updateFilters } = useQueryStore();

  const [safeFilters, setSafeFilters] = useState({
    limit: filters.limit ?? 10,
    sortBy: filters.sortBy ?? "createdAt",
    sortDirection: filters.sortDirection ?? SortDirection.asc,
  });

  useEffect(() => {
    if (filters) {
      setSafeFilters((prev) => ({
        limit: filters.limit ?? prev.limit,
        sortBy: filters.sortBy ?? prev.sortBy,
        sortDirection: filters.sortDirection ?? prev.sortDirection,
      }));
    }
  }, [filters]);

  const handleSelectNumPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);

    setSafeFilters((prev) => ({ ...prev, limit: newLimit }));

    updateFilters({ limit: newLimit });
  };

  const handleSelectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const [sortByKey, sortDirectionKey] = e.target.value.split("-");
    const newSortDirection =
      SortDirection[sortDirectionKey as keyof typeof SortDirection] ??
      SortDirection.asc;

    setSafeFilters((prev) => ({
      ...prev,
      sortBy: sortByKey,
      sortDirection: newSortDirection,
    }));
    updateFilters({ sortBy: sortByKey, sortDirection: newSortDirection });
  };

  const selectedSortKey = `${safeFilters.sortBy}-${safeFilters.sortDirection.toLowerCase()}`;
  const validSortKeys = [
    "createdAt-desc",
    "createdAt-asc",
    "price-desc",
    "price-asc",
  ];

  return (
    <div className="flex gap-4 md:justify-between items-center">
      <Select
        className="w-1/2 md:w-1/3"
        label="Listings/Page"
        placeholder="10"
        selectedKeys={[safeFilters.limit.toString()]}
        onChange={handleSelectNumPerPage}
      >
        <SelectItem key="10">10</SelectItem>
        <SelectItem key="20">20</SelectItem>
        <SelectItem key="30">30</SelectItem>
      </Select>
      <Select
        className="w-1/2 md:w-1/3"
        label="Sort by"
        selectedKeys={
          validSortKeys.includes(selectedSortKey) ? [selectedSortKey] : []
        }
        onChange={handleSelectFilter}
      >
        <SelectItem key="createdAt-desc">Oldest</SelectItem>
        <SelectItem key="createdAt-asc">Newest</SelectItem>
        <SelectItem key="price-desc">Price decreasing</SelectItem>
        <SelectItem key="price-asc">Price increasing</SelectItem>
      </Select>
    </div>
  );
};

export default SortFilters;
