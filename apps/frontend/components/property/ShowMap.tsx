import { XMarkIcon, MapIcon } from "@heroicons/react/24/outline";
import { Switch } from "@heroui/react";

const ShowMap: React.FC<{
  showMap: boolean;
  setShowMap: (value: boolean) => void;
}> = ({ showMap, setShowMap }) => {
  return (
    <Switch
      isSelected={showMap}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <XMarkIcon className={className} />
        ) : (
          <MapIcon className={className} />
        )
      }
      onValueChange={setShowMap}
    >
      {showMap ? "Hide Map" : "Show Map"}
    </Switch>
  );
};

export default ShowMap;
