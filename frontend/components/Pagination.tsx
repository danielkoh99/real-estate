import React from "react";
import { Pagination } from "@nextui-org/react";

import usePropertyStore from "@/stores/appStore";

export default function PaginationComponent() {
  const { totalPages, page, setPage } = usePropertyStore();
  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
