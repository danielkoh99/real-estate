import { Response } from "express";

import { ErrorResponse } from "../types/types";

// Generic error handler function
export const createError = (status: number, message: string, details?: any): ErrorResponse => {
 return {
  status,
  message,
  details: details instanceof Error ? details.message : details,
 };
};

export const sendErrorResponse = (res: Response, error: ErrorResponse) => {
 return res.status(error.status || 500).json({
  status: error.status || 500,
  message: error.message || "An error occurred",
  details: error.details || null, // Ensures details are always included properly
 });
};
