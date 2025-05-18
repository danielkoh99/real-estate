import React from 'react';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import logger from '../logger/logger';
const resend = new Resend(process.env.RESEND_API_KEY);
import { render } from '@react-email/components';
import { VerifyEmail } from '@emails/verify-email';
const sendEmail = async ({ from, to, subject, react }: { from: string, to: string, subject: string, react: React.ReactNode }) => {
  try {

  const html =await render(react);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  transporter.sendMail({
    from,
    to,
    subject,
    html: html
  })
} catch (error) {
  logger.error(error);
  return error
}
  // In case of resend
  // try {
  //     const res = await resend.emails.send({
  //         from,
  //         to,
  //         subject,
  //         react
  //     });
  //     console.log(res);
  //     return res
  // } catch (error) {
  //     logger.error(error);
  //     return error
  // }
}
const sendVerificationEmail = async (email: string, username: string, verificationUrl: string) => {
  logger.info(`Sending verification email to ${email}`, { email, username, verificationUrl });
  return await sendEmail({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    react: <VerifyEmail userName={username} verificationUrl={verificationUrl} />
  })
}
// sendVerificationEmail('kohari.daniel@gmail.com', 'John Doe', 'https://example.com/verify')
export { sendVerificationEmail };