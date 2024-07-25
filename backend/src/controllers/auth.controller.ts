import { Request, Response } from "express";
import User from "../db/models/User/User";
import { hashPassword, verifyPassword } from "../utils/auth.utils";
import { UserRequestBody, UResponseBody } from "../types/types";
import { Roles } from "../db/models/User/user.interface";
import { signToken } from "../middlewares/auth.middleware";
const registerUser = async (
  req: Request<{}, {}, UserRequestBody>,
  res: Response<UResponseBody>
) => {
  try {
    const { email, password, role } = req.body;
    // Check if the email exists
    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .send({ error_message: "Email is already associated with an account" });
    }
    const hashedPassword = hashPassword(password);
    await User.create({
      role: Roles[role],
      username: email,
      email,
      password: hashedPassword,
    });
    return res.status(200).send({ error_message: "Registration successful" });
  } catch (err) {
    return res.status(500).send({ error_message: "Error in registering user" });
  }
};

const signInUser = async (
  req: Request<{}, {}, UserRequestBody>,
  res: Response<UResponseBody>
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error_message: "Email not found" });
    }

    // Verify password
    const passwordValid = verifyPassword(password, user.password);
    if (!passwordValid) {
      return res
        .status(404)
        .json({ error_message: "Incorrect email and password combination" });
    }
    // Authenticate user with jwt
    const token = signToken({ userId: user.id });
    res.cookie("token", token, { httpOnly: true, secure: false });

    return res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).send({ error_message: "Sign in error" });
  }
};
const signOutUser = async (
  req: Request,
  res: Response<{ message: string }>
) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    res.clearCookie("token");
    return res.json({ message: "Signed out successfully" });
  }
  return res.status(400).json({ message: "No token provided" });
};
export { registerUser, signInUser, signOutUser };