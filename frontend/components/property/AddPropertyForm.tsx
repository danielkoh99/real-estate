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
import { useRouter } from "next/navigation";
import Link from "next/link";

import Upload from "@/components/property/Upload";
import { FileWithPreview, AddProperty, PropertyType } from "@/types";
import { createProperty } from "@/utils/createProperty";
import { propertySchema } from "@/schemes";
import toast from "@/utils/toast";

export default function AddPropertyForm({
  files,
  setFiles,
  setFormData,
  formData,
  loadingImage,
  setLoadingImage,
  setSaving,
}: {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  setFormData: React.Dispatch<React.SetStateAction<AddProperty>>;
  formData: AddProperty;
  loadingImage: boolean;
  setLoadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createProperty<AddProperty>,
    onMutate: () => {
      setSaving(true);
    },
    onSuccess: (response) => {
      setSaving(false);
      router.push("/");
      toast.success(
        "Success",
        response.message ?? "Property created successfully",
        <Link href={`/property/${response.id}`}>
          <Button color="primary" variant="ghost">
            View Property
          </Button>
        </Link>,
        20000,
      );
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
      toast.error("Error", error.message);
      setSaving(false);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddProperty>({
    resolver: zodResolver(propertySchema),
    defaultValues: formData,
  });

  useEffect(() => {
    const subscription = watch((data) => {
      setFormData((prev) => ({
        ...prev,
        ...data,
        images: prev.images,
      }));
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
            <Upload
              files={files}
              loading={loadingImage}
              setFiles={setFiles}
              setLoading={setLoadingImage}
            />
          </div>

          <Input
            fullWidth
            label="Price"
            {...register("price")}
            defaultValue={formData.price.toString()}
            errorMessage={errors.price?.message}
            placeholder="Enter price"
            type="number"
          />

          <Input
            fullWidth
            label="Size (sq m)"
            {...register("size")}
            defaultValue={formData.size.toString()}
            errorMessage={errors.size?.message}
            placeholder="Enter size"
            type="number"
          />

          <Input
            fullWidth
            label="Address"
            {...register("address")}
            defaultValue={formData.address}
            errorMessage={errors.address?.message}
            placeholder="Enter address"
          />

          <div className="flex gap-4 w-full">
            <Input
              fullWidth
              label="Bedrooms"
              {...register("bedrooms")}
              defaultValue={formData.bedrooms.toString()}
              errorMessage={errors.bedrooms?.message}
              placeholder="Enter number of bedrooms"
              type="number"
            />
            <Input
              fullWidth
              label="Bathrooms"
              {...register("bathrooms")}
              defaultValue={formData.bathrooms.toString()}
              errorMessage={errors.bathrooms?.message}
              placeholder="Enter number of bathrooms"
              type="number"
            />
          </div>
          <div className="flex gap-4 w-full">
            <Select
              fullWidth
              defaultSelectedKeys={[formData.type]}
              label="Property Type"
              onSelectionChange={(keys) =>
                setValue("type", Array.from(keys)[0] as PropertyType)
              }
            >
              {Object.values(PropertyType).map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>

            <Input
              fullWidth
              label="Category"
              {...register("category")}
              defaultValue={formData.category}
              errorMessage={errors.category?.message}
              placeholder="Enter category"
            />
          </div>
          <Input
            fullWidth
            label="City"
            {...register("city")}
            defaultValue={formData.city}
            errorMessage={errors.city?.message}
            placeholder="Enter city"
          />

          <Input
            fullWidth
            label="District"
            {...register("district")}
            defaultValue={formData.district}
            placeholder="Enter district (optional)"
          />

          <Input
            fullWidth
            label="Year Built"
            {...register("yearBuilt")}
            defaultValue={formData.yearBuilt.toString()}
            errorMessage={errors.yearBuilt?.message}
            placeholder="Enter year built (optional)"
            type="number"
          />

          <Textarea
            fullWidth
            label="Description"
            {...register("description")}
            defaultValue={formData.description}
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
