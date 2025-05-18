import {
  AtSymbolIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
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

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-bold mb-4">Contact Uplader</h3>
        <Link
          className="flex items-center gap-4 mb-4 transition duration-300 hover:bg-gray-100 hover:shadow-md p-2 rounded-lg"
          href={`/user/${listedByUser.id}`}
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

        <Button className="w-full mb-4 text-white" color="primary">
          <a
            className="flex items-center justify-center w-full h-full"
            href={callPhoneLink}
          >
            {listedByUser.phone}
            <PhoneIcon className="w-5 h-5 mx-2" />
          </a>
        </Button>
        <Button className="w-full mb-4 text-white" color="primary">
          <a
            className="flex items-center justify-center w-full h-full"
            href={mailtoLink}
          >
            {listedByUser.email}
            <AtSymbolIcon className="w-5 h-5 mx-2" />
          </a>
        </Button>
        <Button className="w-full mb-4" variant="ghost">
          Send a message
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mx-2" />
        </Button>
      </CardBody>
    </Card>
  );
}
