import { z } from "zod";

import { PropertyType, Roles } from "./types";
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
  role: z.nativeEnum(Roles),
});

export const propertySchema = z.object({
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  size: z.coerce.number().min(1, "Size must be greater than 0"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  bedrooms: z.coerce.number().min(1, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "Must be at least 1"),
  type: z.nativeEnum(PropertyType).refine((val) => val !== undefined, {
    message: "Property type is required",
  }),
  category: z.string().min(3, "Category is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().optional(),
  yearBuilt: z.coerce.number().optional(),

  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });