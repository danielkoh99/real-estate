import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { randomUUID } from "crypto";
import { __dirname } from "../utils";
const uploadDirectory = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.session.userId;

    if (!userId) {
      return cb(new Error("User ID is required for file upload"), "");
    }

    const userFolder = path.join(uploadDirectory, userId.toString());

    // Ensure the user's folder exists
    fs.mkdirSync(userFolder, { recursive: true });

    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomUUID()}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
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
