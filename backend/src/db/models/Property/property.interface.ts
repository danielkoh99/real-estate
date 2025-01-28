import { PropertyImageAttributes } from "../Image/image.interface";

interface PropertyAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  size: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  category: PropertyCategory;
  city: string;
  district?: BPDistricts;
  squarMeterPrice?: number;
  yearBuilt?: number;
  description?: string;
  savedByUserId?: number[];
  listedByUserId?: number;
  images?: PropertyImageAttributes[];
}
enum BPDistricts {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
  V = "V",
  VI = "VI",
  VII = "VII",
  VIII = "VIII",
  IX = "IX",
  X = "X",
  XI = "XI",
  XII = "XII",
  XIII = "XIII",
  XIV = "XIV",
  XV = "XV",
  XVI = "XVI",
  XVII = "XVII",
  XVIII = "XVIII",
  XIX = "XIX",
  XX = "XX",
  XXI = "XXI",
  XXII = "XXII",
  XXIII = "XXIII"
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
export { PropertyAttributes, PropertyType, PropertyCategory, BPDistricts };
