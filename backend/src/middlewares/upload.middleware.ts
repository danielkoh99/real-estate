import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { __dirname, createError } from '../utils';
import sharp from 'sharp';
import logger from '../logger/logger';

const uploadDirectory = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: fileFilter,
}).array('images', 10);

export const uploadAndOptimizeImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(createError(400, `Multer Error: ${err.message}`, { code: err.code }));
      }

      return next(createError(400, "File upload failed", { error: err.message }));
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next(createError(400, "No files uploaded"));
    }

    try {
      const userId = req.session?.userId;
      if (!userId) {
        return next(createError(401, "User ID is required for file upload"));
      }

      const userFolder = path.join(uploadDirectory, userId.toString());
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }

      const processedImages = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const uniqueFilename = `${Date.now()}-${randomUUID()}`;
          const filePath = path.join(userFolder, `${uniqueFilename}.webp`);
          const tempPath = path.join(userFolder, `${uniqueFilename}${ext}`);

          fs.writeFileSync(tempPath, file.buffer);

          await sharp(tempPath)
            .resize({ width: 1000, height: 1000, fit: "inside" })
            .webp({ quality: 80 })
            .toFile(filePath);

          fs.unlinkSync(tempPath);
          const nameWithExtention = `${uniqueFilename}.webp`;
          return nameWithExtention;
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