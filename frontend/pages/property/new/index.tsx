"use client";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import {
  FileWithPreview,
  AddProperty,
  PropertyType,
  PropertyCategory,
} from "@/types";
import AddPropertyForm from "@/components/property/AddPropertyForm";
import PropertyDetails from "@/components/property/PropertyDetailsView";

export default function CreateListingPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const [formData, setFormData] = useState<AddProperty>({
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
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, images: files }));
  }, [files]);

  return (
    <DefaultLayout>
      <div className="flex flex-1 flex-col md:flex-row gap-6 h-screen">
        <div className="w-full md:w-1/3 flex">
          <AddPropertyForm
            files={files}
            formData={formData}
            setFiles={setFiles}
            setFormData={setFormData}
            loading={loadingImage}
            setLoading={setLoadingImage}
          />
        </div>
        <div className="w-full md:w-2/3">
          <PropertyDetails preview property={formData} />
        </div>
      </div>
    </DefaultLayout>
  );
}
