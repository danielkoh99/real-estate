import { PropertyImageAttributes } from "../Image/image.interface";

interface PropertyAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  title: string;
  size: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  category: PropertyCategory;
  squarMeterPrice?: number;
  yearBuilt?: number;
  description?: string;
  savedByUserId?: number[];
  listedByUserId?: number;
  images?: PropertyImageAttributes[];
}
enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
}
enum PropertyCategory {
  USED = "Used",
  NEWLY_BUILT = "Newly Built",
  UNDER_CONSTRUCTION = "Under Construction",
  RENOVATED = "Renovated",
  LUXURY = "Luxury",
  COMMERCIAL = "Commercial",
  INDUSTRIAL = "Industrial",
  VACATION_HOME = "Vacation Home",
  OTHER = "Other",
}
export { PropertyAttributes, PropertyType, PropertyCategory };
