import { Request, Response, NextFunction } from "express";
import { createError, sendErrorResponse } from "../utils/errorHandler";
import logger from "../logger/logger";

// Enhanced Error-Handling Middleware
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
 const statusCode = err.status || 500;
 const errorMessage = err.message || "Something went wrong";

 logger.error("❌ Error Occurred:");
 logger.error(`🔹 Route: ${req.originalUrl}`);
 logger.error(`🔹 Method: ${req.method}`);
 logger.error(`🔹 Status: ${statusCode}`);
 logger.error(`🔹 Message: ${errorMessage}`);
 if (Object.keys(req.params).length) logger.error(`🔹 Params: ${JSON.stringify(req.params)}`);
 if (Object.keys(req.query).length) logger.error(`🔹 Query: ${JSON.stringify(req.query)}`);
 if (Object.keys(req.body).length) logger.error(`🔹 Body: ${JSON.stringify(req.body)}`);

 // Log stack trace only in development mode
 if (process.env.NODE_ENV === "development" && err.stack) {
  logger.error(`🛠 Stack Trace: ${err.stack}`);
 }

 // Send structured error response
 return sendErrorResponse(res, createError(statusCode, errorMessage, err.details));
};
