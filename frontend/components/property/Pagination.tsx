import React from "react";
import { Pagination } from "@heroui/react";

import usePropertyStore from "@/stores/propertyStore";
import useFilterParams from "@/hooks/useFilterParams";

export default function PaginationComponent() {
  const { totalPages, page, properties } = usePropertyStore();
  const { setQueryParams } = useFilterParams();
  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  if (!totalPages || !properties.length) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <Pagination
        showControls
        color="primary"
        page={page}
        total={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}
