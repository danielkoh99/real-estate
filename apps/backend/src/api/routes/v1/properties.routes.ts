import { Router } from "express";

import {
 createProperty,
 deletePropertyById,
 getListedProperties,
 getProperties,
 getPropertyById,
 getSavedProperties,
 relatedProperties,
 savePropertyListing,
 updatePropertyById,
} from "../../../controllers/property.controller";
import { auth } from "../../../middlewares/auth.middleware";
import { uploadAndOptimizeImages } from "../../../middlewares/upload.middleware";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.get("/saved", [auth], getSavedProperties);
propertyRouter.get("/listed", [auth], getListedProperties);
propertyRouter.post("/save", [auth], savePropertyListing);
propertyRouter.post(
 "/",
 [
  auth,
  uploadAndOptimizeImages({
   targetFolder: "properties",
   resize: { width: 1000, height: 1000 },
   minFiles: 1,
   maxFiles: 10,
   maxFileSizeMB: 25,
  }),
 ],
 createProperty
);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.get("/:id/related", relatedProperties);
propertyRouter.put("/:id", [auth], updatePropertyById);
propertyRouter.delete("/:id", [auth], deletePropertyById);

export default propertyRouter;
