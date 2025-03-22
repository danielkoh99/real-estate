"use client";

import {
  Input,
  Button,
  Textarea,
  Card,
  CardBody,
  Select,
  SelectItem,
  Form,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import Upload from "@/components/property/Upload";
import { FileWithPreview, AddProperty, PropertyType } from "@/types";
import { createProperty } from "@/utils/createProperty";
import { propertySchema } from "@/schemes";

export default function AddPropertyForm({
  files,
  setFiles,
  setFormData,
  formData,
  loading,
  setLoading
}: {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  setFormData: React.Dispatch<React.SetStateAction<AddProperty>>;
  formData: AddProperty;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate } = useMutation({
    mutationFn: (data: AddProperty) => createProperty<AddProperty>(data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddProperty>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    const subscription = watch((data) => {
      setFormData((prev) => {
        return {
          ...prev,
          ...data,
          images: prev.images,
        };
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);
  const onSubmit = (data: AddProperty, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    mutate(formData);
  };

  return (
    <Card className="flex flex-col h-full w-full flex-grow">
      <CardBody className="flex flex-col flex-grow">
        <Form
          className="flex flex-col gap-4"
          validationErrors={Object.fromEntries(
            Object.entries(errors).map(([key, value]) => [
              key,
              value?.message ? [value.message] : [],
            ]),
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="h-full w-full">
            <Upload setLoading={setLoading} loading={loading} files={files} setFiles={setFiles} />
          </div>

          <Input
            fullWidth
            label="Price"
            {...register("price")}
            errorMessage={errors.price?.message}
            placeholder="Enter price"
            type="number"
          />

          <Input
            fullWidth
            label="Size (sq m)"
            {...register("size")}
            errorMessage={errors.size?.message}
            placeholder="Enter size"
            type="number"
          />

          <Input
            fullWidth
            label="Address"
            {...register("address")}
            errorMessage={errors.address?.message}
            placeholder="Enter address"
          />

          <Input
            fullWidth
            label="Bedrooms"
            {...register("bedrooms")}
            errorMessage={errors.bedrooms?.message}
            placeholder="Enter number of bedrooms"
            type="number"
          />
          <Input
            fullWidth
            label="Bathrooms"
            {...register("bathrooms")}
            errorMessage={errors.bathrooms?.message}
            placeholder="Enter number of bathrooms"
            type="number"
          />

          <Select
            fullWidth
            label="Property Type"
            onSelectionChange={(keys) =>
              setValue("type", Array.from(keys)[0] as PropertyType)
            }
          >
            <SelectItem key="apartment">Apartment</SelectItem>
            <SelectItem key="house">House</SelectItem>
          </Select>
          <Input
            fullWidth
            label="Category"
            {...register("category")}
            errorMessage={errors.category?.message}
            placeholder="Enter category"
          />

          <Input
            fullWidth
            label="City"
            {...register("city")}
            errorMessage={errors.city?.message}
            placeholder="Enter city"
          />

          <Input
            fullWidth
            label="District"
            {...register("district")}
            placeholder="Enter district (optional)"
          />

          <Input
            fullWidth
            label="Year Built"
            {...register("yearBuilt")}
            errorMessage={errors.yearBuilt?.message}
            placeholder="Enter year built (optional)"
            type="number"
          />

          <Textarea
            fullWidth
            label="Description"
            {...register("description")}
            errorMessage={errors.description?.message}
            placeholder="Enter property details"
          />
          <div className="flex justify-center w-full">
            <Button className="w-full" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
