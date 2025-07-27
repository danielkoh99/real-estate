"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import {
  PropertyType,
  PropertyCategory,
  HeatingType,
  BuildingType,
  PromotionType,
} from "@real-estate/shared";

import DefaultLayout from "@/layouts/default";
import { FileWithPreview, AddProperty } from "@/types";
import AddPropertyForm from "@/components/property/AddPropertyForm";
import PropertyDetails from "@/components/property/PropertyDetailsView";

export default function CreateListingPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<AddProperty>({
    id: "",
    price: 0,
    city: "",
    description: "",
    address: "",
    size: 0,
    yearBuilt: 0,
    type: PropertyType.APARTMENT,
    images: [],
    category: PropertyCategory.USED,
    bathrooms: 0,
    bedrooms: 0,
    district: undefined,
    petFriendly: false,
    hasElevator: false,
    hasTerrace: false,
    hasGarden: false,
    level: 0,
    heatingType: HeatingType.GAS,
    buildingType: BuildingType.APARTMENT,
    parkingSpace: false,
    promotionType: PromotionType.None,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, images: files }));
  }, [files]);

  return (
    <DefaultLayout>
      <div className="flex flex-1 flex-col md:flex-row gap-6 h-screen relative">
        <div className="w-full md:w-1/3 flex">
          <AddPropertyForm
            files={files}
            formData={formData}
            loadingImage={loadingImage}
            setFiles={setFiles}
            setFormData={setFormData}
            setLoadingImage={setLoadingImage}
            setSaving={setSaving}
          />
        </div>
        <div className="w-full md:w-2/3">
          <PropertyDetails preview property={formData} />
        </div>
        {saving ? (
          <div className="flex flex-col justify-center items-center w-full h-full absolute bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md z-50">
            <p className="text-lg font-medium text-gray-700">
              Placing your listing on the marketplace...
            </p>
            <Spinner className="mt-2" size="lg" />
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
}
