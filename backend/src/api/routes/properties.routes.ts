import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  relatedProperties,
  savePropertyListing,
  getSavedProperties
} from "../../controllers/property.controller";
import { uploadAndOptimizeImages } from "../../middlewares/upload.middleware";
import schemaValidator from "../../middlewares/validation.middleware";
import { auth } from "../../middlewares/auth.middleware";
import { validateProperty } from "../../schemas";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.get("/saved", [auth], getSavedProperties);
propertyRouter.post("/save", [auth], savePropertyListing);
propertyRouter.post(
  "/", [
  auth,
  uploadAndOptimizeImages
],
  createProperty
);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.get("/:id/related", relatedProperties);
propertyRouter.put("/:id", [auth], updatePropertyById);
propertyRouter.delete("/:id", [auth], deletePropertyById);


export default propertyRouter;
