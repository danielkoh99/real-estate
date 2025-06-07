import { MapPinIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/react";

import { goToMapsUrl } from "@/utils/openInMaps";

export default function GoToMaps({ address }: { address: string | undefined }) {
  if (!address) return null;

  return (
    <Tooltip content="Open in Google Maps">
      <MapPinIcon
        className="h-8 w-8 text-gray-500 cursor-pointer transition opacity-85 hover:opacity-100"
        onClick={(e) => goToMapsUrl(e, address)}
      />
    </Tooltip>
  );
}
