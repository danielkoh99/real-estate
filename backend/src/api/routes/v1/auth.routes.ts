import { Router } from "express";
import {
 registerUser,
 signInUser,
 signOutUser,
 verifyEmail,
 forgotPassword,
} from "../../../controllers/auth.controller";
import { auth } from "../../../middlewares/auth.middleware";

const authRouter = Router();
authRouter.post("/verify-email/:token", verifyEmail);
authRouter.post("/signup", registerUser);
authRouter.post("/login", signInUser);
authRouter.post("/logout", auth, signOutUser);
authRouter.get("/forgot-password/:token", forgotPassword);

export default authRouter;
