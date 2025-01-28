import { HeartIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import useUserStore from "@/stores/userStore";

const SaveListingBtn: React.FC<{ propertyId: string; isSaved: boolean }> = ({
  propertyId,
  isSaved,
}) => {
  const [clicked, setClicked] = useState(isSaved);
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: session } = useSession();
  const { saveProperty } = useUserStore();

  const fetch = async () => {
    if (session?.user) await saveProperty(propertyId, session?.user.id);
  };

  const toggleSaveListing = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await fetch();

    setClicked((prev) => !prev);

    if (!clicked) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
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
          className={`h-8 w-8 transition-all duration-500 ease-out transform hover:text-white hover:fill-red-600 ${
            clicked ? "fill-red-600" : "text-gray-500"
          } ${isAnimating ? "scale-125 fill-yellow-500" : "scale-100"}`}
        />
      </button>
    </Tooltip>
  );
};

export default SaveListingBtn;
