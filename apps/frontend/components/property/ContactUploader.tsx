import { Card, CardBody, Button, User } from "@heroui/react";
import Link from "next/link";

import { PropertyResponse } from "@/types";
interface ContactUploaderProps {
  listedByUser: PropertyResponse["listedByUser"] | undefined;
}
export default function ContactUploader({
  listedByUser,
}: ContactUploaderProps) {
  if (!listedByUser) return null;
  const mailtoLink = `mailto:${listedByUser.email}`;
  const callPhoneLink = `tel:${listedByUser.phone}`;
  const name = `${listedByUser.firstName} ${listedByUser.lastName}`;
  const nameSlug =
    `${listedByUser.firstName}-${listedByUser.lastName}`.toLowerCase();
  const slug = `/user/${listedByUser.uuid}/${nameSlug}`;

  return (
    <Card>
      <CardBody className="space-y-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <Link
          className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-gray-50 hover:shadow-sm"
          href={slug}
        >
          <User
            avatarProps={{
              src:
                listedByUser.profileImage ||
                "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            name={name}
          />
        </Link>

        <Button
          as="a"
          className="w-full flex items-center justify-center gap-2 text-white font-medium"
          color="primary"
          href={callPhoneLink}
        >
          {listedByUser.phone}
        </Button>

        <Button
          as="a"
          className="w-full flex items-center justify-center gap-2 text-white font-medium"
          color="primary"
          href={mailtoLink}
        >
          {listedByUser.email}
        </Button>

        <Button
          className="w-full flex items-center justify-center gap-2 font-medium hover:bg-gray-50"
          variant="ghost"
        >
          Send a message
        </Button>
      </CardBody>
    </Card>
  );
}
