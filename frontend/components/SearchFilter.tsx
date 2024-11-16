import { Card, Input, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

import { PropertyType } from "@/types";
import { capitalizeFirst } from "@/utils/stringUtils";

export default function SearchFilter() {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [selectedType, setType] = useState<PropertyType>(
    PropertyType.APARTMENT,
  );
  const [selectedDistricts, setDistricts] = useState(new Set([]));
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as PropertyType);
  };
  const handleSelectDistricts = (e: any) => {
    setDistricts(new Set(e.target.value.split(",")));
  };

  return (
    <Card>
      <div className="flex flex-col md:items-cente p-4 w-full gap-3">
        <div className="flex w-full gap-3">
          <div className="flex-1 ">
            <Select
              defaultSelectedKeys={[selectedType]}
              label="Select type"
              value={selectedType}
              onChange={handleSelectChange}
            >
              {Object.values(PropertyType).map((type) => (
                <SelectItem key={type} value={type}>
                  {capitalizeFirst(type)}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex-1">
            <Select
              label="Districts"
              placeholder="Select a districts"
              selectedKeys={selectedDistricts}
              selectionMode="multiple"
              onChange={handleSelectDistricts}
            >
              <SelectItem key="option1">Option 1</SelectItem>
              <SelectItem key="option2">Option 2</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Start value"
                value={startValue}
                onChange={(e) => setStartValue(e.target.value)}
              />
            </div>

            <span className="text-gray-500">-</span>

            <div className="flex-1">
              <Input
                placeholder="End value"
                value={endValue}
                onChange={(e) => setEndValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Start value"
                value={startValue}
                onChange={(e) => setStartValue(e.target.value)}
              />
            </div>

            <span className="text-gray-500">-</span>

            <div className="flex-1">
              <Input
                placeholder="End value"
                value={endValue}
                onChange={(e) => setEndValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
