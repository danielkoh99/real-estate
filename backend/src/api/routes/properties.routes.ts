import { Router } from "express";
import {
  createProperty,
  getProperties,
  updatePropertyById,
} from "../../controllers/property.controller";
import upload from "../../middlewares/upload.middleware";
import schemaValidator from "../../middlewares/validation.middleware";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.put("/:id", updatePropertyById);
propertyRouter.delete("/:id", () => {});
propertyRouter.post(
  "/",
  [schemaValidator("createProperty"), upload.array("images", 5)],
  createProperty
);

export default propertyRouter;
