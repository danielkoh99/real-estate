import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import v1routes from "./api/routes/v1";
import path from "path";
import logger from "./logger/logger";
import { errorMiddleware } from "./middlewares/error.middleware";
import rateLimit from "express-rate-limit";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { logRequest } from "./middlewares/logRequest.middleware";
import helmet from "helmet";
import { __dirname } from "./utils";
import dbInit from "./db/init";
import db from "db/config_postgres";

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 10000,
 message: "Too many requests from this IP, please try again after 15 minutes",
 headers: true,
 standardHeaders: true,
 legacyHeaders: false,
});

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(helmet());
const allowedOrigins = [
 `http://localhost:${process.env.FRONTEND_PORT || 3001}`,
 "https://daningatlan.duckdns.org",
];
app.use(
 cors({
  origin: (origin, callback) => {
   if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
   } else {
    callback(new Error("Not allowed by CORS"));
   }
  },
  credentials: true,
 })
);
app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.use(
 "/docs",
 swaggerUi.serve,
 swaggerUi.setup(undefined, {
  swaggerOptions: {
   url: "/swagger.json",
  },
 })
);
app.use("/api/v1", v1routes);
app.use("/uploads", express.static(path.join(__dirname, "../../", "uploads")));
app.use("/static", express.static(path.join(__dirname, "../../src/emails", "static")));
app.get("/", (req: Request, res: Response) => {
 res.send("Server is running");
});
app.get("/health", async (req: Request, res: Response) => {
 try {
  await db.authenticate();
  res.status(200).json({ status: "ok", db: "connected" });
 } catch (error) {
  res.status(500).json({ status: "error", db: "disconnected" });
 }
});
app.use((req: Request, res: Response, next: NextFunction) => {
 res.status(404).json({ message: "Route not found" });
});
app.use(errorMiddleware);

app.listen(port, async () => {
 try {
  await dbInit();
  logger.info(`Database connected to discover`);
  logger.info(`[server]: Server is running at http://localhost:${port}`);
  logger.info(path.join(__dirname, "../../", "uploads"));
 } catch (err) {
  logger.error(err);
 }
});
