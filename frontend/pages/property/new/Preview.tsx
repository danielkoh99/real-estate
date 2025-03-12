import "swiper/css/bundle";
import { Card, CardBody } from "@heroui/react";

import { AddProperty } from "@/types";
import PropertyDetails from "@/components/property/PropertyDetailsView";

interface ListingPreviewProps {
  formData: AddProperty;
}

export default function Preview({ formData }: ListingPreviewProps) {
  return (
    <Card className="bg-white shadow-lg rounded-xl flex-1 hidden md:block">
      <CardBody className="flex items-center justify-center h-full">
        <PropertyDetails property={formData} />
      </CardBody>
    </Card>
  );
}
