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
    if (key === "signout") {
      signOut();
    }
    if (key === "profile") {
      router.push("/user/profile");
    }
    if (key === "saved-listings") {
      router.push("/user/saved-listings");
    }
    if (key === "messages") {
      router.push("/user/messages");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User className="cursor-pointer" name={name} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={handleDropdownAction}>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="saved-listings">Saved Listings</DropdownItem>
        <DropdownItem key="messages">Messages</DropdownItem>
        <DropdownItem key="signout" className="text-danger">
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
