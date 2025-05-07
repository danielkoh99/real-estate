import { z } from "zod";

import { PropertyType, Roles } from "./types";
export const signinScheme = z.object({
  email: z
    .string()
    .min(3, "Your email is required")
    .email("invalid Email address"),
  password: z.string().min(3, "Password is required"),
});

export const signupScheme = z.object({
  name: z.string().min(3, "Name is required"),
  email: z
    .string()
    .min(3, "Your email is required")
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
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
