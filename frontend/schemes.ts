import { z } from "zod";

import { PropertyType, PublicRoles } from "./types";
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(100, "Password is too long.")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
  .regex(/[a-z]/, "Password must include at least one lowercase letter.")
  .regex(/[0-9]/, "Password must include at least one number.")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const signinScheme = z.object({
  email: z
    .string()
    .min(3, "Your email is required")
    .email("invalid Email address"),
  password: z.string().min(3, "Password is required"),
});

export const signupScheme = z.object({
  email: z
    .string()
    .min(3, "Your email is required")
    .email("invalid Email address"),
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  password: passwordSchema,
  phone: z.string().min(3, "Phone is required"),
  role: z.nativeEnum(PublicRoles),
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

export const passwordResetScheme = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
