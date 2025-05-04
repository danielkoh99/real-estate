import { Router } from "express";
import {
  changePassword,
  deleteUserById,
  getAllUsers,
  getSessionUser,
  getUserById,
  updateUserById,
} from "../../controllers/user.controller";
import { auth } from "../../middlewares/auth.middleware";
import { createOne } from "../../services/user.service";
import { uploadAndOptimizeImages } from "../../middlewares/upload.middleware";

const userRouter = Router();
userRouter.get("/profile", [auth], getSessionUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", [auth], getAllUsers);
userRouter.post("/", createOne);
userRouter.put("/:id", [auth,
  uploadAndOptimizeImages({
    targetFolder: "profiles",
    resize: { width: 300, height: 300 },
    maxFiles: 1,
    maxFileSizeMB: 5
  })
], updateUserById);
userRouter.delete("/:id", [auth], deleteUserById);
userRouter.post("/change-password", [auth], changePassword);
export default userRouter;
