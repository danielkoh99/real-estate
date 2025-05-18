import React from "react";
import nodemailer from "nodemailer";
import logger from "../logger/logger";
import { render } from "@react-email/components";
import { VerifyEmail } from "@emails/verify-email";
const sendEmail = async ({
 from,
 to,
 subject,
 react,
}: {
 from: string;
 to: string;
 subject: string;
 react: React.ReactNode;
}) => {
 try {
  const html = await render(react);
  const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
   },
  });
  return await transporter.sendMail({
   from,
   to,
   subject,
   html: html,
  });
 } catch (error) {
  logger.error(error);
  return error;
 }
};
const sendVerificationEmail = async (email: string, username: string, verificationUrl: string) => {
 logger.info(`Sending verification email to ${email}`, { email, username, verificationUrl });
 return await sendEmail({
  from: process.env.GMAIL_USER,
  to: email,
  subject: "Verify your email",
  react: <VerifyEmail userName={username} verificationUrl={verificationUrl} />,
 });
};
export { sendVerificationEmail };
