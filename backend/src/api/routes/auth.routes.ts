import { Router } from "express";
import { authenticateJWT } from "../../middlewares/auth.middleware";
import {
  registerUser,
  signInUser,
  signOutUser,
} from "../../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", signInUser);
authRouter.put("/logout", authenticateJWT, signOutUser);

export default authRouter;
