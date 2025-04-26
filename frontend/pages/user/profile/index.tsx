import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import DefaultLayout from "@/layouts/default";
import { UserInfoResponse } from "@/types";
import Error from "@/components/global/Error";
import { formatDateTime } from "@/utils/formatDateTime";
import { apiRequest } from "@/utils";
const fetchUserProfile = async () => {
  const { response, error } = await apiRequest<UserInfoResponse>({
    url: "/user/profile",
    method: "GET",
  });

  if (error) {
    throw error.response?.data?.message || "Failed to fetch user profile";
  }

  return response?.data as UserInfoResponse;
};

export default function UserProfilePage() {
  const { data, error, isLoading } = useQuery<UserInfoResponse>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Error error_message={error.message} />;
  if (!data) return <div>No data found</div>;

  const { firstName, lastName, email, createdAt, phone, savedProperties } =
    data;
  const formattedDate = formatDateTime(createdAt);

  return (
    <DefaultLayout>
      <Card className="w-full shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-600 text-white p-8 flex flex-col items-center">
          <Avatar
            isBordered
            alt="Profile Picture"
            className="mb-4"
            name={`${firstName} ${lastName}`}
          />
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-blue-200">{email}</p>
        </CardHeader>

        <CardBody className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-800 font-medium">{email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="text-gray-800 font-medium">
              {phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Joined</p>
            <p className="text-gray-800 font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Saved Properties</p>
            <p className="text-gray-800 font-medium">
              {savedProperties?.length ?? 0}
            </p>
          </div>
        </CardBody>

        <CardFooter className="bg-gray-50 p-6 flex justify-between">
          <Button color="primary" variant="shadow">
            Edit Profile
          </Button>
          <Button color="danger" variant="ghost">
            Delete Profile
          </Button>
        </CardFooter>
      </Card>
    </DefaultLayout>
  );
}
