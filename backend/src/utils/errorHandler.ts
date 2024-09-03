import { Response } from "express";
import { ErrorResponse } from "../types/types";

// Generic error handler function
export const createError = (
  status: number,
  message: string,
  details?: any
): ErrorResponse => {
  return {
    status,
    message,
    details,
  };
};

export const sendErrorResponse = (res: Response, error: ErrorResponse) => {
  return res.status(error.status).json({
    status: error.status,
    message: error.message,
    ...(error.details && { details: error.details }),
  });
};
