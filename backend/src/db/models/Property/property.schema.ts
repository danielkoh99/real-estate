import Joi from "joi";

export const propertySchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),
  type: Joi.string().valid("apartment", "house").required().messages({
    "string.empty": "Property type is required",
    "any.only": "Type must be either apartment or house",
  }),
  listedByUserId: Joi.number().required().messages({
    "number.base": "ListedByUserId must be a number",
    "number.required": "ListedByUserId is required",
  }),
});
