import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
} from "../../controllers/property.controller";
import upload from "../../middlewares/upload.middleware";
import schemaValidator from "../../middlewares/validation.middleware";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.put("/:id", updatePropertyById);
// propertyRouter.delete("/:id",authenticateJWT, deletePropertyById);
propertyRouter.post(
  "/",
  [
    authenticateJWT,
    schemaValidator("createProperty"),
    upload.array("images", 5),
  ],
  createProperty
);

export default propertyRouter;
