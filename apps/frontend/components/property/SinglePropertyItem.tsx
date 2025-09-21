import { Card } from "@heroui/react";
import "swiper/css/bundle";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import { ItemHeader } from "./ListItem/ItemHeader";
import { ItemBody } from "./ListItem/ItemBody";
import { ItemActions } from "./ListItem/ItemActions";

import { PropertyResponse } from "@/types";

const SingleRealEstate: React.FC<{
  property: PropertyResponse;
  small?: boolean;
  loading?: boolean;
  classes?: string;
  canEdit?: boolean;
}> = ({ property, loading, classes, canEdit, small = false }) => {
  const href = canEdit
    ? `/property/edit/${property.id}`
    : `/property/${property.id}`;

  return (
    <Link
      className="w-full text-white text-center rounded-lg h-full flex "
      href={href}
    >
      <div
        className={twMerge(
          "w-full h-full md:max-w-sm flex justify-center",
          classes,
        )}
      >
        <Card className="shadow-sm rounded-lg overflow-hidden border border-slate-200 transition-all duration-300 transform hover:shadow-lg w-full min-h-[400px] flex flex-col h-full">
          <ItemHeader canEdit={canEdit} loading={loading} property={property} />

          <ItemBody loading={loading} property={property} small={small} />
          <ItemActions canEdit={canEdit} property={property} />
        </Card>
      </div>
    </Link>
  );
};

export default SingleRealEstate;
