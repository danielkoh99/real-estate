import { Router } from "express";

const usersRouter = Router();
usersRouter.get("/", () => {});
usersRouter.put("/:id", () => {});
usersRouter.delete("/:id", () => {});
usersRouter.post("/", () => {});

export default usersRouter;
