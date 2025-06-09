import { Router } from "express";

import authRouter from "./auth.routes";
import propertyRouter from "./properties.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/auth", authRouter);

export default router;
