"use client";
import { Avatar, Card, CardHeader, CardBody, Divider } from "@heroui/react";

import { User } from "@/types";

export default function PublicProfile({ user }: { user: User }) {
  return (
    <Card className="w-full p-4 shadow-lg rounded-xl">
      <CardHeader className="flex flex-col items-center">
        <Avatar
          isBordered
          alt={`${user.firstName} ${user.lastName}`}
          className="mb-3"
          size="lg"
          src={user.profileImage || "/default-avatar.png"}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-500">@{user.email}</p>
      </CardHeader>
      <Divider className="my-4" />
      <CardBody className="space-y-3 text-center">
        {user.phone && (
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
        )}
        <p className="text-gray-700">
          <span className="font-semibold">Member since:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </CardBody>
    </Card>
  );
}
