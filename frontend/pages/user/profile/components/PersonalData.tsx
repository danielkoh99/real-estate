import { Card, Avatar, CardFooter, Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

import { UpdateUser, User } from "@/types";
import { apiRequest, formatDateTime } from "@/utils";
import toast from "@/utils/toast";
const updateUserProfile = async (data: FormData) => {
  const response = await apiRequest<UpdateUser>({
    url: "/user",
    method: "PATCH",
    data: data,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  console.log(response);

  return response;
};

export default function PersonalData({
  firstName,
  lastName,
  email,
  phone,
  createdAt,
}: User) {
  const formattedDate = formatDateTime(createdAt);
  const { mutate } = useMutation({
    mutationFn: updateUserProfile,

    onSuccess: (response) => {
      toast.success(
        "Success",
        response.message ?? "Profile updated successfully",
        undefined,
        20000,
      );
    },
    onError: (error) => {
      toast.error("Error", error.message);
    },
  });

  return (
    <Card className="w-full shadow-2xl rounded-2xl overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Avatar
            isBordered
            alt="Profile Picture"
            className="w-24 h-24"
            name={firstName}
            size="lg"
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
            <p className="text-gray-800 font-medium">{email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-gray-800 font-medium">
              {phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Joined</p>
            <p className="text-gray-800 font-medium">{formattedDate}</p>
          </div>
        </div>
      </div>

      <CardFooter className="bg-gray-50 p-6 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex gap-2">
          <Button className="w-full md:w-auto" color="primary" variant="shadow">
            Edit Profile
          </Button>
          <Button
            className="w-full md:w-auto"
            color="secondary"
            variant="shadow"
          >
            Change password
          </Button>
        </div>
        <Button className="w-full md:w-auto" color="danger" variant="ghost">
          Delete Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
