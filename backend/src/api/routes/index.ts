import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import propertyRouter from "./properties.routes";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.use("/user", authenticateJWT, userRouter);
router.use("/property", propertyRouter);
router.use("/auth", authRouter);

export default router;
