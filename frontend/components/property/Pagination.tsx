import React from "react";
import { Pagination } from "@heroui/react";

import { useQueryStore } from "@/stores/queryStore";
import usePropertyStore from "@/stores/propertyStore";

export default function PaginationComponent({
  propertiesViewRef,
}: {
  propertiesViewRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { totalPages, page, properties } = usePropertyStore();
  const { updateFilters } = useQueryStore();
  const handlePageChange = (page: number) => {
    if (propertiesViewRef.current) {
      propertiesViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    updateFilters({ page: page });
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
