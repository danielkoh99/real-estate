import s3Client from "@/aws/config";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { randomUUID as uuidv4 } from "crypto";

interface UploadedFile {
 originalname: string;
 mimetype: string;
 buffer: Buffer;
}

export const uploadImageToS3 = async (file: UploadedFile, userId: string): Promise<string> => {
 const key = `users/${userId}/${uuidv4()}-${file.originalname}`;

 const params: PutObjectCommandInput = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: key,
  Body: file.buffer,
  ContentType: file.mimetype,
 };

 try {
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
 } catch (error) {
  console.error("Error uploading to S3:", error);
  throw error;
 }
};
