import { SVGProps } from "react";

export interface PropertyImageAttributes {
  id: string;
  url: string;
  propertyId: string;
}
export interface PropertyRes {
  properties: Property[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
export interface Property {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  title: string;
  size: number;
  address: string;
  type: PropertyType;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  yearBuilt?: number;
  description: string;
  squarMeterPrice: number;
  savedByUserId?: number[];
  listedByUserId?: number;
  listedByUser: {
    firstName: string;
    lastName: string;
  };
  images: PropertyImageAttributes[];
}
export enum PropertyType {
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
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  savedProperties?: Property[];
  listedProperties?: Property[];
  createdAt?: string;
}
export interface LoginResponse extends User, ErrorResponse {
  accessToken: string;
}
export type UserInfoResponse = User;
interface ErrorResponse {
  status: number;
  message?: string;
}
