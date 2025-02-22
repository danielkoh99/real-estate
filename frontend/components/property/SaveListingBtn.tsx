import { HeartIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import useUserStore from "@/stores/userStore";
import { useModal } from "@/contexts/ModalContext";

const SaveListingBtn: React.FC<{ propertyId: string; isSaved: boolean }> = ({
  propertyId,
  isSaved,
}) => {
  const [clicked, setClicked] = useState(isSaved);
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: session } = useSession();
  const { saveProperty } = useUserStore();
  const { openModal, isOpen } = useModal();
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
        className="p-0 bg-transparent border-none"
        type="button"
        onClick={toggleSaveListing}
      >
        <HeartIcon
          className={`h-8 w-8 transition-all duration-500 ease-out transform hover:fill
              -re
            d-600 ${clicked ? "fill-red-600" : "texthite"
            } ${isAnimating ? "scale-125 fill-red-600" : "scale-100"}`}
        />
      </button>
    </Tooltip>
  );
};

export default SaveListingBtn;
