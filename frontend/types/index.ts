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
  savedByUserId?: number[];
  listedByUserId?: number;
  listedByUser: {
    firstName: string;
    lastName: string;
  };
  images: PropertyImageAttributes[];
}
enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
}
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  savedProperties?: Property[];
  listedProperties?: Property[];
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
