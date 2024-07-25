import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import db from "./db/config";
import router from "./api/routes";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import logger from "./logger/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app: Express = express();
const port = process.env.PORT || 3000;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, async () => {
  try {
    await db.authenticate();
    logger.info(`Database connected to discover`);
    logger.info(`[server]: Server is running at http://localhost:${port}`);
  } catch (err) {
    logger.error(err);
  }
});
