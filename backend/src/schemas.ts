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
  title: Joi.string().required(),
  address: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string().valid("apartment", "house").required(),
  listedByUserId: Joi.number().required(),
});

export default {
  signin: authSignin,
  signup: authSignup,
  createProperty: propertySchema,
} as { [key: string]: ObjectSchema };
