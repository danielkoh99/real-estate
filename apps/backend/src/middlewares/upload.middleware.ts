import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";

import logger from "../logger/logger";
import { createError } from "../utils";
import { uploadImageToS3 } from "@/aws/s3Upload";
import { optimizeImage } from "@/utils/imageOptimizer";

const allowedImageTypes = /jpeg|jpg|png/;

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
 const extName = allowedImageTypes.test(file.originalname.toLowerCase());
 const mimeType = allowedImageTypes.test(file.mimetype);
 if (extName && mimeType) {
  cb(null, true);
 } else {
  cb(new Error("Only images are allowed (jpeg, jpg, png)"));
 }
};

const createUploader = (fieldName: string, maxCount: number, maxSizeMB: number) =>
 multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
  fileFilter,
 }).array(fieldName, maxCount);

interface UploadOptions {
 targetFolder: "properties" | "profiles";
 resize: { width: number; height: number };
 maxFiles: number;
 maxFileSizeMB: number;
 minFiles: number;
 fieldName?: string;
}

const uploadOptimizedImagesToS3 = async (
 files: Express.Multer.File[],
 options: UploadOptions,
 userId: number
): Promise<string[]> => {
 return await Promise.all(
  files.map(async (file) => {
   const uniqueFilename = `${Date.now()}-${randomUUID()}.webp`;

   const webpBuffer = await optimizeImage(file.buffer, options.resize.width, options.resize.height);

   const imageUrl = await uploadImageToS3(
    {
     buffer: webpBuffer,
     originalname: uniqueFilename,
     mimetype: "image/webp",
    },
    userId.toString()
   );

   return imageUrl;
  })
 );
};

export const uploadAndOptimizeImages = (options: UploadOptions) => {
 const uploader = createUploader(
  options.fieldName || "images",
  options.maxFiles,
  options.maxFileSizeMB
 );

 return (req: Request, res: Response, next: NextFunction) => {
  uploader(req, res, async (err) => {
   const files = req.files as Express.Multer.File[];

   if (err) {
    if (err instanceof multer.MulterError) {
     return next(createError(400, `Multer Error: ${err.message}`, { code: err.code }));
    }
    return next(createError(400, "File upload failed", { error: err.message }));
   }

   if (files.length < options.minFiles) {
    return next(createError(400, `At least ${options.minFiles} files are required`));
   }

   try {
    const userId = req.user?.id;
    if (!userId) {
     return next(createError(401, "User ID is required for file upload"));
    }

    const processedImages = await uploadOptimizedImagesToS3(files, options, userId);
    req.body.imagePaths = processedImages;

    logger.info("Images uploaded to S3", processedImages);
    next();
   } catch (error: any) {
    return next(createError(500, "Error processing images", { error: error.message }));
   }
  });
 };
};
