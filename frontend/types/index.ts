import { SVGProps } from "react";

export enum PublicRoles {
  User = "user",
  Agent = "agent",
}
export enum Roles {
  agent = "agent",
  user = "user",
  admin = "admin",
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

export enum SortDirection {
  asc = "ASC",
  desc = "DESC",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface FileWithPreview extends File {
  url: string;
}
export interface CreateUser extends User {
  password: string;
  message?: string;
}
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt?: string;
  profileImage?: string;
  role?: Roles | PublicRoles;
  name?: string;
  phone?: string;
}

export interface UpdateUser extends User {
  message?: string;
}

export interface UserInfoResponse extends User {
  savedProperties: PropertyResponse[];
  listedProperties: PropertyResponse[];
}

export interface LoginResponse extends User, ErrorResponse {
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  message?: string;
}

export interface PropertyImageAttributes {
  id: string;
  url: string;
  propertyId: string;
}

export interface LocationData {
  lat: number;
  lon: number;
  boundingbox: [number, number, number, number];
}
export interface MapLocationData extends LocationData {
  display_name: string;
}
export interface ListedByUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  profileImage?: string;
}
export interface AddProperty extends BaseProperty {
  images: FileWithPreview[];
  message?: string;
}
export interface BaseProperty {
  id: string;
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

export type NewProperty = Omit<BaseProperty, "id"> & {
  images: FileWithPreview[];
  message?: string;
};

export interface PropertyResponse extends BaseProperty {
  createdAt: string;
  updatedAt: string;
  savedByUserId?: number[];
  listedByUserId: number;
  lastUpdated?: string;
  images: PropertyImageAttributes[];
  squarMeterPrice: number;
  listedByUser: ListedByUser;
  location: LocationData;
}

export interface PropertyRes {
  properties: PropertyResponse[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
export type PropertyForDisplay = BaseProperty & {
  images: FileWithPreview[] | PropertyImageAttributes[];
  listedByUser?: ListedByUser;
  location: MapLocationData;
  squarMeterPrice?: number;
};
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
