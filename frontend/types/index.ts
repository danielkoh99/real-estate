import { SVGProps } from "react";

export interface PropertyImageAttributes {
  id: string;
  url: string;
  propertyId: string;
}
export interface PropertyRes {
  properties: PropertyResponse[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
export interface BaseProperty {
  price: number;
  size: number;
  address: string;
  type: PropertyType;
  city: string;
  district?: BPDistricts;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  description: string;
}

export interface AddProperty extends BaseProperty {
  images: FileWithPreview[];
}
interface LocationData {
  lat: string;
  lon: string;
  boundingBox: [string, string, string, string];
}

export interface PropertyResponse extends BaseProperty {
  id: string;
  createdAt: string;
  updatedAt: string;
  savedByUserId?: number[];
  listedByUserId?: number;
  lastUpdated?: string;
  images: PropertyImageAttributes[];
  squarMeterPrice: number;
  listedByUser: ListedByUser;
  location: LocationData;
}
export interface ListedByUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
export enum UserRole {
  ADMIN = "Agent",
  USER = "Private",
}
export enum PropertyType {
  APARTMENT = "Apartment",
  HOUSE = "House",
}
export enum BPDistricts {
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
  XXIII = "XXIII",
}
export enum PropertyCategory {
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
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  savedProperties?: PropertyResponse[];
  listedProperties?: PropertyResponse[];
  createdAt: string;
}
export interface LoginResponse extends User, ErrorResponse {
  accessToken: string;
}
export type UserInfoResponse = User;
interface ErrorResponse {
  status: number;
  message?: string;
}
export enum SortDirection {
  asc = "ASC",
  desc = "DESC",
}

export interface PropertyFilters {
  page: number;
  limit: number;
  priceMin: number | null;
  priceMax: number | null;
  sizeMin: number | null;
  sizeMax: number | null;
  type: PropertyType | null;
  yearBuilt: number | null;
  sortBy: string;
  sortDirection: SortDirection;
  districts: BPDistricts[] | null;
}
export interface FileWithPreview extends File {
  url: string;
}
