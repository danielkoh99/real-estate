import { Router } from "express";

import authRouter from "./auth.routes";
import propertyRouter from "./properties.routes";
import userRouter from "./user.routes";
import aiRouter from "./ai.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/auth", authRouter);
router.use("/ai", aiRouter);

export default router;
