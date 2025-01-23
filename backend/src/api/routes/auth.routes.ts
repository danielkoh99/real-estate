import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import {
  registerUser,
  signInUser,
  signOutUser,
} from "../../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/signup", registerUser);
authRouter.post("/login", signInUser);
authRouter.post("/logout", auth, signOutUser);

export default authRouter;
