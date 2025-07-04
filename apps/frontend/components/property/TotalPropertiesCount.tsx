import usePropertyStore from "@/stores/propertyStore";

const TotalPropertiesCount = () => {
  const { totalItems } = usePropertyStore();

  return (
    <div className="text-md flex gap-2">
      Total number of listings:
      <p className="font-semibold">{totalItems}</p>
    </div>
  );
};

export default TotalPropertiesCount;
