import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import propertyRouter from "./properties.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/auth", authRouter);

export default router;
