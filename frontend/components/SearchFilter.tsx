import { Card, Input, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

export default function SearchFilter() {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedDistricts, setDistricts] = useState(new Set([]));
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleSelectDistricts = (e: any) => {
    setDistricts(new Set(e.target.value.split(",")));
  };

  return (
    <Card>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6 p-4 w-full">
        {/* Select and input side by side */}
        <div className="flex-1">
          <Select
            label="Select an option"
            placeholder="Choose..."
            onChange={handleSelectChange}
          >
            <SelectItem key="option1">Option 1</SelectItem>
            <SelectItem key="option2">Option 2</SelectItem>
            <SelectItem key="option3">Option 3</SelectItem>
          </Select>
        </div>

        <div className="flex-1">
          <Select
            className="max-w-xs"
            label="Keruletek"
            placeholder="Select an animal"
            selectedKeys={selectedDistricts}
            selectionMode="multiple"
            onChange={handleSelectDistricts}
          >
            <SelectItem key="option1">Option 1</SelectItem>
            <SelectItem key="option2">Option 2</SelectItem>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          {/* Start Input */}
          <div className="flex-1">
            <Input
              placeholder="Start value"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
            />
          </div>

          {/* Dash */}
          <span className="text-gray-500">-</span>

          {/* End Input */}
          <div className="flex-1">
            <Input
              placeholder="End value"
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Start Input */}
          <div className="flex-1">
            <Input
              placeholder="Start value"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
            />
          </div>

          {/* Dash */}
          <span className="text-gray-500">-</span>

          {/* End Input */}
          <div className="flex-1">
            <Input
              placeholder="End value"
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
