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
    <Card className="w-full shadow-xl rounded-xl overflow-hidden">
      <div className="p-6 bg-white text-center">
        <User
          avatarProps={{
            src:
              profileImage || "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          className="mx-auto mb-4"
          classNames={{ name: "text-2xl font-bold" }}
          name={`${firstName} ${lastName}`}
        />

        <p className="text-gray-500 mb-4">{email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-gray-400 text-xs mb-1">Email</p>
            <Input
              isDisabled={!isEditing}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Phone</p>
            <Input
              isDisabled={!isEditing}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-400 text-xs mb-1">Joined</p>
            <p className="text-gray-700">{formattedDate}</p>
          </div>
        </div>
      </div>

      <CardFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row gap-2 justify-end">
        <Button
          className="w-full sm:w-auto"
          color="danger"
          variant="light"
          onPress={onOpen}
        >
          Delete
        </Button>
        <Button
          className="w-full sm:w-auto"
          color="warning"
          isDisabled={!isEditing}
          variant="light"
          onPress={() => setIsEditing(false)}
        >
          Cancel
        </Button>
        <Button
          className="w-full sm:w-auto"
          color="primary"
          variant="solid"
          onPress={() => {
            if (isEditing) handleUpdate(formData);
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
