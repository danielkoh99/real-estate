import { z } from "zod";
import { PropertyType, UserRole } from "./types";
export const signinScheme = z.object({
  email: z
    .string()
    .min(3, "Your email is requires")
    .email("invalid Email address"),
  password: z.string().min(3, "Password is required"),
});

export const signupScheme = z.object({
  name: z.string().min(3, "Name is required"),
  email: z
    .string()
    .min(3, "Your email is requires")
    .email("invalid Email address"),
  password: z.string().min(3, "Password is required"),
  phone: z.string().min(3, "Phone is required"),
  role: z.nativeEnum(UserRole),

});

export const propertySchema = z.object({
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  size: z.coerce.number().min(1, "Size must be greater than 0"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  bedrooms: z.coerce.number().min(1, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "Must be at least 1"),
  type: z.nativeEnum(PropertyType),
  category: z.string().min(3, "Category is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().optional(),
  yearBuilt: z.coerce.number().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});