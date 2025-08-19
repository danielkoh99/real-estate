import React from "react";
import nodemailer from "nodemailer";
import logger from "../logger/logger";
import { render } from "@react-email/components";
import VerifyEmail from "@/emails/VerifyEmail";
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
 } catch (e: unknown) {
  logger.error(e);
  return Promise.reject(
   new Error(`Failed to send email to ${to}. Please check the configuration or network.`)
  );
 }
};
const sendVerificationEmail = async (email: string, username: string, verificationUrl: string) => {
 logger.info(`Sending verification email to ${email}`, { email, username, verificationUrl });
 return await sendEmail({
  from: process.env.GMAIL_USER as string,
  to: email,
  subject: "Verify your email",
  react: VerifyEmail({ userName: username, verificationUrl }),
 });
};
export { sendVerificationEmail };
