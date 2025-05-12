import { Router } from "express";
import { registerUser, signInUser, signOutUser } from "../../../controllers/auth.controller";
import { auth } from "../../../middlewares/auth.middleware";

const authRouter = Router();
authRouter.post("/signup", registerUser);
authRouter.post("/login", signInUser);
authRouter.post("/logout", auth, signOutUser);

export default authRouter;
