import { Router } from "express";
import { getSessionUser, getUserById, getAllUsers, updateUserById, deleteUserById, changePassword, createUser } from "../../../controllers/user.controller";
import { auth } from "../../../middlewares/auth.middleware";
import { uploadAndOptimizeImages } from "../../../middlewares/upload.middleware";


const userRouter = Router();
userRouter.get("/profile", [auth], getSessionUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", [auth], getAllUsers);
userRouter.post("/", createUser);
userRouter.patch("/:id", [auth,
  uploadAndOptimizeImages({
    targetFolder: "profiles",
    resize: { width: 300, height: 300 },
    minFiles: 0,
    maxFiles: 1,
    maxFileSizeMB: 5
  })
], updateUserById);
userRouter.delete("/:id", [auth], deleteUserById);
userRouter.post("/change-password", [auth], changePassword);
export default userRouter;
