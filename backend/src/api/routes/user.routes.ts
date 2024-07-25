import { Router } from "express";
import User from "../../db/models/User/User";
import { getAllUsers } from "../../controllers/user.controller";

const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.put("/:id", () => {});
usersRouter.delete("/:id", () => {});
usersRouter.post("/", () => {});

export default usersRouter;
