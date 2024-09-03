import s3Client from "../config/awsConfig";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // For generating signed URLs
import { randomUUID as uuidv4 } from "crypto";
interface UploadedFile extends Express.Multer.File {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

interface UploadedFile extends Express.Multer.File {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

// Function to upload image to S3
export const uploadImageToS3 = async (file: UploadedFile): Promise<string> => {
  const key = `${uuidv4()}-${file.originalname}`; // Unique file name using UUID

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
    Key: key, // File name in S3
    Body: file.buffer, // File buffer
    ACL: "public-read", // Make the file publicly accessible
    ContentType: file.mimetype, // File MIME type
  };

  try {
    // Use PutObjectCommand to upload the file
    const command = new PutObjectCommand(params);
    await s3Client.send(command); // Await the command execution

    // Return the file URL
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Function to generate a pre-signed URL (optional, for temporary uploads)
export const getSignedUrlForS3 = async (
  fileName: string,
  expiresInSeconds: number
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};
