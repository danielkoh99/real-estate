import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { __dirname, createError } from "../utils";
import sharp from "sharp";
import logger from "../logger/logger";

const uploadDirectory = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDirectory)) {
 fs.mkdirSync(uploadDirectory, { recursive: true });
}

const allowedImageTypes = /jpeg|jpg|png/;

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
 const extName = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
 const mimeType = allowedImageTypes.test(file.mimetype);
 if (extName && mimeType) {
  cb(null, true);
 } else {
  cb(new Error("Only images are allowed"));
 }
};

const createUploader = (fieldName: string, maxCount: number, maxSizeMB: number) =>
 multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
  fileFilter: fileFilter,
 }).array(fieldName, maxCount);

interface UploadOptions {
 targetFolder: "properties" | "profiles";
 resize: { width: number; height: number };
 maxFiles: number;
 maxFileSizeMB: number;
 minFiles: number;
}

export const uploadAndOptimizeImages = (options: UploadOptions) => {
 const uploader = createUploader("images", options.maxFiles, options.maxFileSizeMB);

 return (req: Request, res: Response, next: NextFunction) => {
  uploader(req, res, async (err) => {
   const files = req.files as Express.Multer.File[];
   if (err) {
    if (err instanceof multer.MulterError) {
     return next(createError(400, `Multer Error: ${err.message}`, { code: err.code }));
    }
    return next(createError(400, "File upload failed", { error: err.message }));
   }
   if (!files || files.length === 0) {
    return next();
   }
   if (files.length < options.minFiles) {
    return next(createError(400, `At least ${options.minFiles} files are required`));
   }
   if (!req.files || !Array.isArray(req.files)) {
    return next(createError(400, "No files uploaded"));
   }

   try {
    const userId = req.session?.userId;
    if (!userId) {
     return next(createError(401, "User ID is required for file upload"));
    }

    const userFolder = path.join(uploadDirectory, options.targetFolder, userId.toString());
    if (!fs.existsSync(userFolder)) {
     fs.mkdirSync(userFolder, { recursive: true });
    }

    const processedImages = await Promise.all(
     (files as Express.Multer.File[]).map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueFilename = `${Date.now()}-${randomUUID()}`;
      const finalPath = path.join(userFolder, `${uniqueFilename}.webp`);
      const tempPath = path.join(userFolder, `${uniqueFilename}${ext}`);

      fs.writeFileSync(tempPath, file.buffer);

      await sharp(tempPath)
       .resize({
        width: options.resize.width,
        height: options.resize.height,
        fit: "cover",
       })
       .webp({ quality: 80 })
       .toFile(finalPath);

      fs.unlinkSync(tempPath);

      return `${uniqueFilename}.webp`;
     })
    );

    req.body.imagePaths = processedImages;
    logger.info("Images processed successfully", processedImages);
    next();
   } catch (error: any) {
    return next(createError(500, "Error processing images", { error: error.message }));
   }
  });
 };
};
