import { Router } from "express";

import {
 createUser,
 deleteUserById,
 getAllUsers,
 getSessionUser,
 getUserById,
 updateUserById,
 updatePassword,
} from "../../../controllers/user.controller";
import { auth } from "../../../middlewares/auth.middleware";
import { uploadAndOptimizeImages } from "../../../middlewares/upload.middleware";

const userRouter = Router();
userRouter.get("/profile", [auth], getSessionUser);
userRouter.get("/public/:id", getUserById);
userRouter.get("/:id", getUserById);
userRouter.get("/", [auth], getAllUsers);
userRouter.post("/", createUser);
userRouter.patch("/:id/update-password", [auth], updatePassword);
userRouter.patch(
 "/:id",
 [
  auth,
  uploadAndOptimizeImages({
   targetFolder: "profiles",
   resize: { width: 300, height: 300 },
   minFiles: 0,
   maxFiles: 1,
   maxFileSizeMB: 5,
  }),
 ],
 updateUserById
);
userRouter.delete("/:id", [auth], deleteUserById);
export default userRouter;
