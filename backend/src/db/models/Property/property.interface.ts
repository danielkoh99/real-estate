import { PropertyImageAttributes } from "../Image/image.interface";

interface PropertyAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  title: string;
  size?: number;
  address: string;
  type: PropertyType;
  savedByUserId?: number[];
  listedByUserId?: number;
  images?: PropertyImageAttributes[];
}
enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
}

export { PropertyAttributes, PropertyType };
