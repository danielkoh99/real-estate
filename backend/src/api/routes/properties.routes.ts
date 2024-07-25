import { Router } from "express";

const propertiesRouter = Router();
propertiesRouter.get("/", () => {});
propertiesRouter.put("/:id", () => {});
propertiesRouter.delete("/:id", () => {});
propertiesRouter.post("/", () => {});

export default propertiesRouter;
