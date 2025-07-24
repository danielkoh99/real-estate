import { Divider } from "@heroui/react";

import { PropertyForDisplay } from "@/types";

export default function Details({
  property,
}: {
  property: PropertyForDisplay;
}) {
  return (
    <div className="flex flex-col text-gray-800">
      <p className="text-gray-600 font-semibold mb-2">Property Details</p>
      <div className="flex flex-row items-start gap-2 lg:gap-6">
        <div className="flex-1 space-y-2">
          <DetailItem label="Address" value={property.address} />
          <DetailItem label="City" value={property.city} />
          {property.district && (
            <DetailItem label="District" value={property.district} />
          )}
          <DetailItem label="Year Built" value={property.yearBuilt} />
          <DetailItem label="Type" value={property.type} />
          <DetailItem label="Bedrooms" value={property.bedrooms} />
          <DetailItem label="Pet Friendly" value={property.petFriendly} />
          <DetailItem label="Level" value={property.level} />
        </div>
        <Divider orientation="vertical" />
        <div className="flex-1 space-y-2">
          <DetailItem label="Bathrooms" value={property.bathrooms} />
          <DetailItem label="Size" value={`${property.size} m²`} />
          <DetailItem label="Heating type" value={property.heatingType} />
          <DetailItem label="Category" value={property.category} />
          <DetailItem label="Building type" value={property.buildingType} />
          <DetailItem label="Elevator" value={property.hasElevator} />
          <DetailItem label="Terrace" value={property.hasTerrace} />
          <DetailItem label="Garden" value={property.hasGarden} />
        </div>
      </div>
    </div>
  );
}
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | boolean | number;
}) {
  if (typeof value === "number") {
    value = value.toString();
  }
  if (typeof value === "boolean") {
    value = value ? "Yes" : "No";
  }

  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
