import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const authSignup = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

const authSignin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const propertySchema = Joi.object({
  price: Joi.number().required(),
  size: Joi.number().required(),
  address: Joi.string().required(),
  bedrooms: Joi.number().integer().min(0).required(),
  bathrooms: Joi.number().integer().min(0).required(),
  type: Joi.string().valid("apartment", "house").required(),
  category: Joi.string().required(),
  city: Joi.string().required(),
  district: Joi.string().optional(),
  yearBuilt: Joi.number().integer().optional(),
  description: Joi.string().optional(),
  images: Joi.array().items(Joi.object()).optional(),
});

export default {
  signin: authSignin,
  signup: authSignup,
  createProperty: propertySchema,
} as { [key: string]: ObjectSchema };
