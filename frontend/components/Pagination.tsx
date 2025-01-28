import React from "react";
import { Pagination } from "@heroui/react";

import usePropertyStore from "@/stores/appStore";

export default function PaginationComponent() {
  const { totalPages, page, setPage, properties } = usePropertyStore();
  const handlePageChange = (page: number) => {
    setPage(page);
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
