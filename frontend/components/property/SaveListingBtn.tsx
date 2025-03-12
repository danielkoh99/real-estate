import { HeartIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import clsx from "clsx";

import useUserStore from "@/stores/userStore";
import { useModal } from "@/contexts/ModalContext";
import usePropertyStore from "@/stores/propertyStore";

const SaveListingBtn: React.FC<{
  propertyId: string;
  color?: "white" | "black";
}> = ({ propertyId, color = "white" }) => {
  const { getIsSaved } = usePropertyStore();

  const isSaved = getIsSaved(propertyId);
  const [clicked, setClicked] = useState(isSaved);
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: session } = useSession();
  const { saveProperty } = useUserStore();
  const { openModal } = useModal();
  const { currentUser } = useUserStore();
  const fetch = async () => {
    if (session?.user) await saveProperty(propertyId, session?.user.id);
  };

  const toggleSaveListing = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!currentUser) {
      openModal();
    } else {
      await fetch();
      setClicked((prev) => !prev);
      if (!clicked) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }
  };

  return (
    <Tooltip content={clicked ? "Unsave listing" : "Save listing"}>
      <button
        className="p-0 bg-transparent border-none cursor-pointer"
        type="button"
        onClick={toggleSaveListing}
      >
        <HeartIcon
          className={clsx(
            "h-8 w-8 transition ease-in-out duration-500  transform hover:fill-red-600",
            clicked ? "fill-red-600" : `text-${color}`,
            isAnimating ? "scale-125 fill-red-600" : "scale-100",
          )}
        />
      </button>
    </Tooltip>
  );
};

export default SaveListingBtn;
