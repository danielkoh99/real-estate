import { signOut, useSession } from "next-auth/react";
import { Key, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UserAvatar() {
  const router = useRouter();
  const { data: session } = useSession();
  const name = useMemo(
    () => session?.user.firstName + " " + session?.user.lastName,
    [session],
  );
  const handleDropdownAction = (key: Key) => {
    const keyString = key.toString();

    if (keyString === "signout") {
      signOut();
    } else {
      router.push(keyString);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User className="cursor-pointer" name={name} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={handleDropdownAction}>
        <DropdownItem key="/user/profile">Profile</DropdownItem>
        <DropdownItem key="/user/listed-properties">
          Listed properties
        </DropdownItem>
        <DropdownItem key="/user/saved-properties">
          Saved properties
        </DropdownItem>
        <DropdownItem key="/user/messages">Messages</DropdownItem>
        <DropdownItem key="signout" className="text-danger">
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
