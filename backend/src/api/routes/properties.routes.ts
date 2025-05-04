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
import { auth } from "../../middlewares/auth.middleware";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.get("/saved", [auth], getSavedProperties);
propertyRouter.post("/save", [auth], savePropertyListing);
propertyRouter.post(
  "/", [
  auth,
  uploadAndOptimizeImages({
    targetFolder: 'properties',
    resize: { width: 1000, height: 1000 },
    maxFiles: 10,
    maxFileSizeMB: 25
  })
],
  createProperty
);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.get("/:id/related", relatedProperties);
propertyRouter.put("/:id", [auth], updatePropertyById);
propertyRouter.delete("/:id", [auth], deletePropertyById);


export default propertyRouter;
