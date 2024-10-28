import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex justify-center">
      <Pagination
        showControls
        color="primary"
        page={currentPage}
        total={10}
        onChange={setCurrentPage}
      />
    </div>
  );
}
