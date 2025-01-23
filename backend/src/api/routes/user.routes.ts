import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getSessionUser,
  getUserById,
  updateUserById,
} from "../../controllers/user.controller";
import { auth } from "../../middlewares/auth.middleware";

const userRouter = Router();
userRouter.get("/profile", [auth], getSessionUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", [auth], getAllUsers);
userRouter.put("/:id", [auth], updateUserById);
userRouter.delete("/:id", [auth], deleteUserById);

export default userRouter;
