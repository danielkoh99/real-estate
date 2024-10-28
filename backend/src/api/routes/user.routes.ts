import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getSessionUser,
  getUserById,
  updateUserById,
} from "../../controllers/user.controller";

const userRouter = Router();
userRouter.get("/profile", getSessionUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
