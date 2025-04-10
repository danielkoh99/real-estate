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

  const { firstName, lastName, email, createdAt } = data!;
  const formattedDate = formatDateTime(createdAt);

  return (
    <DefaultLayout>
      <div className="min-h-screen p-5 flex justify-center items-center">
        <Card className="w-full max-w-xl">
          <CardHeader className="bg-blue-500 p-white p-4 rounded-t-lg flex flex-col items-center">
            <Avatar
              isBordered
              alt="Profile Picture"
              className="mb-4"
              color="primary"
              size="lg"
              src="https://via.placeholder.com/150"
            />
            <p>
              {firstName} {lastName}
            </p>
          </CardHeader>

          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-lg font-semibold">Email</p>
                <p className="p-gray-600">{email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Joined</p>
                <p className="p-gray-600">{formattedDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Phone</p>
                <p className="p-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="bg-gray-50 p-4 rounded-b-lg flex justify-end">
            <Button color="primary" variant="shadow">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
}
