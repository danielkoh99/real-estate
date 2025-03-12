import { MapPinIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/react";

import { goToMapsUrl } from "@/utils/openInMaps";

export default function GoToMaps({ address }: { address: string | undefined }) {
  if (!address) return null;

  return (
    <Tooltip content="Open in Google Maps">
      <div className="p-2 border hover:shadow-md rounded-md transition-all cursor-pointer">
        <button
          className="flex items-center space-x-1 text-sm lg:text-lg"
          onClick={(e) => goToMapsUrl(e, address)}
        >
          <MapPinIcon className="h-4 w-4 text-gray-500" />
          <p className="truncate">Show in maps</p>
        </button>
      </div>
    </Tooltip>
  );
}
