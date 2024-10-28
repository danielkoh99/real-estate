import { signOut, useSession } from "next-auth/react";
import { Key, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
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
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User className="cursor-pointer" name={name} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={handleDropdownAction}>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="signout" className="text-danger">
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
