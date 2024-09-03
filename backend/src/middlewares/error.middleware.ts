import { Request, Response, NextFunction } from "express";
import { createError, sendErrorResponse } from "../utils/errorHandler";
import logger from "../logger/logger";

// Error-handling middleware
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error:", err);

  if (err.status && err.message) {
    // If the error has a status and message, send it as a response
    return sendErrorResponse(
      res,
      createError(err.status, err.message, err.details)
    );
  }

  // Fallback to a generic 500 internal server error
  const genericError = createError(500, "Something went wrong");
  return sendErrorResponse(res, genericError);
};
