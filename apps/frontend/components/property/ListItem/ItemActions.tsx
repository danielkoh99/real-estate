import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { PropertyResponse } from "@/types";

export const ItemActions: React.FC<{
  property: PropertyResponse;
  canEdit?: boolean;
}> = ({ property, canEdit }) => {
  if (!canEdit) return null;

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 z-10" />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button
          // onClick={() => handleEdit(property.id)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
        >
          <PencilSquareIcon className="h-4 w-4" />
        </button>
        <button
          // onClick={() => handleDelete(property.id)}
          className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};
