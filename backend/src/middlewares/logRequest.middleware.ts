import { NextFunction, Response, Request } from "express";
import logger from "../logger/logger";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get("Referer") || req.ip; // Get referrer or client IP
  const requestedRoute = req.originalUrl; // The requested route

  // Log the details
  logger.info(`Request from: ${origin}, Route requested: ${requestedRoute}`);

  next(); // Pass to the next middleware or route handler
};
