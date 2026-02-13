import { z } from "zod";
import { BPDistricts, PropertyCategory, PropertyType } from "@real-estate/shared";

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const stringOrNumber = z.union([z.string(), z.number()]);
const optionalStringOrNumber = stringOrNumber.optional();

const authSignup = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().regex(PASSWORD_REGEX).min(8),
});

const authSignin = z.object({
    email: z.string(),
    password: z.string(),
});

const propertySchema = z.object({
    price: stringOrNumber,
    size: stringOrNumber,
    address: z.string(),
    bedrooms: stringOrNumber,
    bathrooms: stringOrNumber,
    type: z.nativeEnum(PropertyType),
    category: z.nativeEnum(PropertyCategory),
    city: z.string(),
    district: z.nativeEnum(BPDistricts).optional(),
    yearBuilt: optionalStringOrNumber,
    description: z.string().optional(),
    images: z.array(z.object({})).optional(),
});

const propertyFiltersSchema = z.object({
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    city: z.string().optional(),
    type: z.nativeEnum(PropertyType),
    category: z.nativeEnum(PropertyCategory).optional(),
    districts: z.array(z.nativeEnum(BPDistricts)).optional(),
    priceMin: z.number().optional(),
    priceMax: z.number().optional(),
    sizeMin: z.number().optional(),
    sizeMax: z.number().optional(),
    petFriendly: z.boolean().optional(),
    hasElevator: z.boolean().optional(),
    hasGarden: z.boolean().optional(),
    hasTerrace: z.boolean().optional(),
    parkingSpace: z.boolean().optional(),
    yearBuilt: z.number().optional(),
    level: z.array(z.string()).optional(),
});

export {
    authSignin,
    authSignup,
    propertySchema,
    propertyFiltersSchema,
};