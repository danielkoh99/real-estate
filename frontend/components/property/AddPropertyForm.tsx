"use client";

import { Input, Button, Textarea, Card, CardBody } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

import Upload from "@/components/property/Upload";
import { FileWithPreview, AddProperty } from "@/types";
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              label="Title"
              name="title"
              placeholder="Enter property title"
              value={formData?.title}
              onChange={handleChange}
            />

            <Input
              fullWidth
              label="Price ($)"
              name="price"
              placeholder="Enter price"
              type="number"
              value={formData?.price?.toString()}
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
            <Textarea
              fullWidth
              label="Description"
              name="description"
              placeholder="Enter property details"
              value={formData?.description}
              onChange={handleChange}
            />
          </div>
          <Button color="primary" onPress={handleSaveProperty}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
