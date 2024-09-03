import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const uploadDirectory = "./uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Set the folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Generate a unique filename
  },
});

// Filter to only accept images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Configure the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
  fileFilter: fileFilter,
});

// S3 configuration
// const storage: StorageEngine = multer.memoryStorage(); // Store files in memory before uploading

// const upload = multer({ storage });

export default upload;
