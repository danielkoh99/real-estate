import { Router } from "express";
import usersRouter from "./user.routes";
import authRouter from "./auth.routes";
import propertiesRouter from "./properties.routes";

const router = Router();

router.use("/user", usersRouter);
router.use("/properties", propertiesRouter);
router.use("/auth", authRouter);

export default router;
