"use client";

import {
  Input,
  Button,
  Textarea,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

import Upload from "@/components/property/Upload";
import { FileWithPreview, AddProperty, PropertyType } from "@/types";
import { createProperty } from "@/utils/createProperty";

export default function AddPropertyForm({
  files,
  setFiles,
  formData,
  setFormData,
}: {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  formData: AddProperty;
  setFormData: React.Dispatch<React.SetStateAction<AddProperty>>;
}) {
  const { mutate, data, error, isPending, isIdle, isError } = useMutation({
    mutationFn: (formData: AddProperty) =>
      createProperty<AddProperty>(formData),
  });

  const handleSaveProperty = () => {
    mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? (value ? Number(value) : "") : value,
    });
  };

  return (
    <Card className="flex flex-col h-full flex-grow">
      <CardBody className="flex flex-col flex-grow">
        <form className="flex flex-col justify-between gap-4 flex-grow">
          <div className="h-1/3">
            <Upload files={files} setFiles={setFiles} />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <Input
              fullWidth
              label="Price"
              name="price"
              placeholder="Enter price"
              type="number"
              value={formData?.price?.toString()}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Size (sq m)"
              name="size"
              placeholder="Enter size"
              type="number"
              value={formData?.size?.toString()}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Address"
              name="address"
              placeholder="Enter address"
              value={formData?.address}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Bedrooms"
              min={0}
              name="bedrooms"
              placeholder="Enter number of bedrooms"
              type="number"
              value={formData?.bedrooms?.toString()}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Bathrooms"
              min={0}
              name="bathrooms"
              placeholder="Enter number of bathrooms"
              type="number"
              value={formData?.bathrooms?.toString()}
              onChange={handleChange}
            />

            <Select
              fullWidth
              label="Property Type"
              name="type"
              selectedKeys={[formData?.type]}
              onSelectionChange={(keys) =>
                setFormData({
                  ...formData,
                  type: Array.from(keys)[0] as PropertyType,
                })
              }
            >
              <SelectItem key="apartment">Apartment</SelectItem>
              <SelectItem key="house">House</SelectItem>
            </Select>

            <Input
              fullWidth
              label="Category"
              name="category"
              placeholder="Enter category"
              value={formData?.category}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="City"
              name="city"
              placeholder="Enter city"
              value={formData?.city}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="District"
              name="district"
              placeholder="Enter district (optional)"
              value={formData?.district}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Year Built"
              name="yearBuilt"
              placeholder="Enter year built (optional)"
              type="number"
              value={formData?.yearBuilt?.toString()}
              onChange={handleChange}
            />

            <Textarea
              fullWidth
              label="Description"
              name="description"
              placeholder="Enter property details"
              value={formData?.description}
              onChange={handleChange}
            />
            <Button color="primary" onPress={handleSaveProperty}>
              Submit
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
