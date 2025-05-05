import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import db from "./db/config";
import router from "./api/routes";
import path from "path";
import logger from "./logger/logger";
import { errorMiddleware } from "./middlewares/error.middleware";
import rateLimit from "express-rate-limit";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { logRequest } from "./middlewares/logRequest.middleware";
import session from "express-session";
import { __dirname } from "./utils";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10000,
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true, // Send rate limit info back in the response headers
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app: Express = express();
const port = process.env.PORT || 3000;
//middleware
app.use(cors());
app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',  // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure: true if using HTTPS
}));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, '../../', 'uploads')));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorMiddleware);

app.listen(port, async () => {
  try {
    await db.authenticate();
    logger.info(`Database connected to discover`);
    logger.info(`[server]: Server is running at http://localhost:${port}`);
    logger.info(path.join(__dirname, '../../', 'uploads'));
  } catch (err) {
    logger.error(err);
  }
});
