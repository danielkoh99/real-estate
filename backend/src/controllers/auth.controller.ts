import { NextFunction, Request, Response } from "express";
import User from "../db/models/User/User";
import { hashPassword, sendNewVerificationLink, verifyPassword } from "../utils/auth.utils";
import { UserRequestBody, UResponseBody } from "../types/types";
import { Roles } from "../db/models/User/user.interface";
import { signToken, verifyToken } from "../middlewares/auth.middleware";
import logger from "../logger/logger";
const verifyEmail = async (req: Request<{ token: string }>, res: Response, next: NextFunction) => {
 try {
  const { token } = req.params;

  if (typeof token !== "string") {
   throw new Error("Missing or invalid token");
  }

  const payload = verifyToken<{ email: string }>(token);

  if (!payload) {
   console.log("Invalid or expired token");
   throw new Error("Invalid or expired token");
  }

  const { email } = payload;
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
   return res.status(404).send({ message: "User not found" });
  }
  if (user.verified) {
   return res.status(200).send({ message: "Email already verified" });
  }
  user.verified = true;
  await user.save();

  return res.status(200).send({ message: "Email verified successfully" });
 } catch (err: any) {
  return next(err);
 }
};
const registerUser = async (
 req: Request<{}, {}, UserRequestBody>,
 res: Response<UResponseBody>
) => {
 try {
  const { firstName, lastName, email, password, role, phone } = req.body;
  const userExists = await User.findOne({
   where: { email },
  });
  if (userExists) {
   return res.status(400).send({ message: "Email is already associated with an account" });
  }
  const hashedPassword = hashPassword(password);
  await User.create({
   role: Roles[role],
   firstName: firstName,
   lastName: lastName,
   email: email,
   password: hashedPassword,
   phone: phone,
  });
  await sendNewVerificationLink(email, firstName);
  return res.status(200).send({ message: "Registration successful" });
 } catch (err) {
  logger.error(err);
  return res.status(500).send({ message: "Error in registering user" });
 }
};

const signInUser = async (req: Request<{}, {}, UserRequestBody>, res: Response<UResponseBody>) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({
   where: { email },
  });
  if (!user) {
   return res.status(404).json({ message: "Email not found" });
  }
  if (!user.verified) {
   return res.status(401).json({ message: "Email not verified" });
  }
  // Verify password
  const passwordValid = verifyPassword(password, user.password);
  if (!passwordValid) {
   return res.status(404).json({ message: "Incorrect email and password combination" });
  }
  // Authenticate user with jwt
  const token = signToken({ userId: user.id, role: user.role });
  res.cookie("token", token, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).send({
   id: user.id,
   email: user.email,
   firstName: user.firstName,
   lastName: user.lastName,
   accessToken: token,
  });
 } catch (err) {
  logger.error(err);
  return res.status(500).send({ message: "Sign in error" });
 }
};
const signOutUser = async (req: Request, res: Response<{ message: string }>) => {
 const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
 if (token) {
  res.clearCookie("token");
  return res.json({ message: "Signed out successfully" });
 }
 return res.status(400).json({ message: "No token provided" });
};
export { registerUser, signInUser, signOutUser, verifyEmail };
