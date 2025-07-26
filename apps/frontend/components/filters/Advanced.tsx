"use client";
import {
  Accordion,
  AccordionItem,
  Switch,
  Select,
  SelectItem,
} from "@heroui/react";
import { BuildingType, HeatingType } from "@real-estate/shared";
import { ChangeEvent } from "react";
import { useLocalStorage } from "react-use";

import { PropertyFilters } from "@/types";

const buildingTypeOptions = Object.values(BuildingType);
const heatingTypeOptions = Object.values(HeatingType);

export default function Advanced({
  query,
  setValue,
  setArrayVal,
}: {
  query: Partial<PropertyFilters>;
  setValue: (key: string, val: any) => void;
  setArrayVal: (type: string, e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [storedValue, setStoredValue] = useLocalStorage(
    "use-advanced-filters",
    false,
  );
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "py-0  h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small",
  };

  return (
    <Accordion
      className="w-full"
      defaultSelectedKeys={storedValue ? ["1"] : []}
      itemClasses={itemClasses}
      onSelectionChange={() => {
        setStoredValue(!storedValue);
      }}
    >
      <AccordionItem
        key="1"
        aria-label="Advanced filters"
        title="Advanced Filters"
      >
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="mb-2 font-medium text-gray-700">
              Property Features
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Switch
                isSelected={!!query.petFriendly}
                onValueChange={(e) => setValue("petFriendly", e)}
              >
                Pet Friendly
              </Switch>
              <Switch
                isSelected={!!query.hasGarden}
                onValueChange={(e) => setValue("hasGarden", e)}
              >
                Has Garden
              </Switch>
              <Switch
                isSelected={!!query.hasTerrace}
                onValueChange={(e) => setValue("hasTerrace", e)}
              >
                Has Terrace
              </Switch>
              <Switch
                isSelected={!!query.hasElevator}
                onValueChange={(e) => setValue("hasElevator", e)}
              >
                Has Elevator
              </Switch>
              <Switch
                isSelected={!!query.parkingSpace}
                onValueChange={(e) => setValue("parkingSpace", e)}
              >
                Parking Space
              </Switch>
            </div>
          </div>

          <Select
            label="Levels"
            labelPlacement="outside"
            selectedKeys={query.level ?? []}
            selectionMode="multiple"
            onChange={(keys) => setArrayVal("level", keys)}
          >
            {[...Array(10)].map((_, i) => (
              <SelectItem key={(i + 1).toString()} textValue={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </Select>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Select
              className="flex-1"
              label="Building Type"
              labelPlacement="outside"
              placeholder="Select building type"
              selectedKeys={query.buildingType ? [query.buildingType] : []}
              onSelectionChange={(keys) =>
                setValue("buildingType", Array.from(keys)[0])
              }
            >
              {buildingTypeOptions.map((type) => (
                <SelectItem key={type} textValue={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>

            <Select
              className="flex-1"
              label="Heating Type"
              labelPlacement="outside"
              placeholder="Select heating type"
              selectedKeys={query.heatingType ? [query.heatingType] : []}
              onSelectionChange={(keys) =>
                setValue("heatingType", Array.from(keys)[0])
              }
            >
              {heatingTypeOptions.map((type) => (
                <SelectItem key={type} textValue={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
