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
  console.log(listedByUser);

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-bold mb-4">Contact Uplader</h3>
        <Link
          className="flex items-center gap-4 mb-4"
          href={`/user/profile/${listedByUser.id}`}
        >
          <Avatar name={listedByUser.firstName} size="lg" />
          <div>
            <p className="font-medium">
              {listedByUser.firstName} {listedByUser.lastName}
            </p>
          </div>
        </Link>

        <Button className="w-full mb-4 text-white" color="primary">
          <PhoneIcon className="w-5 h-5 mr-2" />
          {listedByUser.phone}
        </Button>
        <Button className="w-full mb-4 text-white" color="primary">
          <AtSymbolIcon className="w-5 h-5 mr-2" />
          {listedByUser.email}
        </Button>
        <Button className="w-full mb-4" variant="ghost">
          Send a message
        </Button>

        <Button className="w-full" color="secondary">
          Save listing
        </Button>
      </CardBody>
    </Card>
  );
}
