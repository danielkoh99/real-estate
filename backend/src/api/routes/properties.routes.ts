import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  relatedProperties,
  savePropertyListing
} from "../../controllers/property.controller";
import upload from "../../middlewares/upload.middleware";
import schemaValidator from "../../middlewares/validation.middleware";
import { auth } from "../../middlewares/auth.middleware";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.get("/:id/related", relatedProperties);
propertyRouter.put("/:id", [auth], updatePropertyById);
propertyRouter.delete("/:id", [auth], deletePropertyById);
propertyRouter.post("/save", [auth], savePropertyListing);
propertyRouter.post(
  "/",
  [
    auth,
    schemaValidator("createProperty"),
    upload.array("images", 5),
  ],
  createProperty
);

export default propertyRouter;
