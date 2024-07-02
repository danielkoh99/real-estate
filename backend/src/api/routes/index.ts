import { Router } from "express";
import usersRouter from "./user.routes";

const router = Router();

router.use("/ingredients", usersRouter);

export default router;
