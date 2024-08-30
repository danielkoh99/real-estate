import { Router } from "express";
import {
  getProperties,
  updatePropertyById,
} from "../../controllers/property.controller";

const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.put("/:id", updatePropertyById);
propertyRouter.delete("/:id", () => {});
propertyRouter.post("/", () => {});

export default propertyRouter;
