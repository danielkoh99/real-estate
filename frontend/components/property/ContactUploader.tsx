import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Avatar, Button } from "@heroui/react";
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

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-bold mb-4">Contact Uplader</h3>
        <Link
          className="flex items-center gap-4 mb-4 transition duration-300 hover:bg-gray-100 hover:shadow-md p-2 rounded-lg"
          href={`/user/profile/${listedByUser.id}`}
        >
          <Avatar isFocusable name={listedByUser.firstName} size="lg" />
          <div>
            <p className="font-medium text-gray-800 hover:text-gray-900">
              {listedByUser.firstName} {listedByUser.lastName}
            </p>
          </div>
        </Link>

        <Button className="w-full mb-4 text-white" color="primary">
          <a
            className="flex items-center justify-center w-full h-full"
            href={callPhoneLink}
          >
            <PhoneIcon className="w-5 h-5 mr-2" />
            {listedByUser.phone}
          </a>
        </Button>
        <Button className="w-full mb-4 text-white" color="primary">
          <a
            className="flex items-center justify-center w-full h-full"
            href={mailtoLink}
          >
            <AtSymbolIcon className="w-5 h-5 mr-2" />
            {listedByUser.email}
          </a>
        </Button>
        <Button className="w-full mb-4" variant="ghost">
          Send a message
        </Button>
      </CardBody>
    </Card>
  );
}
