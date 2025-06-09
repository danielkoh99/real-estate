import { NextFunction, Request,Response } from "express";

import logger from "../logger/logger";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
 const origin = req.get("Referer") || req.ip; // Get referrer or client IP
 const requestedRoute = req.originalUrl; // The requested route

 // Log request details
 logger.info(`Request Details:`);
 logger.info(`Origin: ${origin}`);
 logger.info(`Route: ${requestedRoute}`);
 logger.info(`Method: ${req.method}`);
 logger.info(`Query Params: ${JSON.stringify(req.query)}`);
 logger.info(`Route Params: ${JSON.stringify(req.params)}`);
 logger.info(`Body: ${JSON.stringify(req.body)}`);

 next(); // Pass to the next middleware or route handler
};
