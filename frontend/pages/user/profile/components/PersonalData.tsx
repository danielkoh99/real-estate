import type { UpdateUser, User as U } from "@/types";

import { Card, CardFooter, Button, Input, User } from "@heroui/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

import useUserMutations from "../profileMutations";

import { formatDateTime } from "@/utils";
import toast from "@/utils/toast";

interface PersonalDataProps extends U {
  onOpen: () => void;
}
export default function PersonalData({
  firstName,
  lastName,
  email,
  phone,
  createdAt,
  profileImage,
  onOpen,
}: PersonalDataProps) {
  const { updateMutation } = useUserMutations();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<UpdateUser>>({
    firstName,
    lastName,
    email,
    phone,
  });
  const formattedDate = formatDateTime(createdAt);

  const handleUpdate = (data: Partial<UpdateUser>) => {
    const userId = session?.user?.id;

    if (!userId) {
      toast.error("Error", "User ID not found in session.");

      return;
    }

    updateMutation.mutate({ userId, data });
  };

  return (
    <Card className="w-full shadow-2xl rounded-2xl overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <User
            avatarProps={{
              src:
                profileImage ||
                "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            name={`${firstName} ${lastName}`}
          />
        </div>
      </div>

      <div className="mt-16 p-8 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <Input
              className="text-gray-800 font-medium"
              disabled={!isEditing}
              isDisabled={!isEditing}
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <Input
              className="text-gray-800 font-medium"
              disabled={!isEditing}
              isDisabled={!isEditing}
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Joined</p>
            <p className="text-gray-800 font-medium">{formattedDate}</p>
          </div>
        </div>
      </div>

      <CardFooter className="bg-gray-50 p-6 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex gap-2 w-full">
          <Button
            className="w-full md:w-auto"
            color="danger"
            variant="ghost"
            onPress={onOpen}
          >
            Delete Profile
          </Button>
        </div>

        <Button
          className="w-full md:w-auto"
          color="warning"
          isDisabled={!isEditing}
          variant="shadow"
          onPress={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </Button>

        <Button
          className="w-full md:w-auto"
          color="primary"
          variant="shadow"
          onPress={() => {
            if (isEditing) {
              handleUpdate(formData);
            }
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
