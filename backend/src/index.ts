import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import db from "./db/config";
import dbInit from "./db/init";

const app: Express = express();
const port = process.env.PORT || 3000;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

app.listen(port, () => {
  db.authenticate()
    .then(async () => {
      console.log(`Database connected to discover`);
      await dbInit();
    })
    .catch((err: any) => {
      console.log(err);
    });

  console.log(`[server]: Server is running at http://localhost:${port}`);
});
