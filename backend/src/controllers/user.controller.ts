import { Request, Response } from "express";
import { getAll, getOne, deleteOne, updateOne, createOne } from "../services/user.service";
import logger from "../logger/logger";
import Property from "../db/models/Property/Property";
import User from "db/models/User/User";
import { verifyToken } from "middlewares/auth.middleware";
const createUser = async (req: Request, res: Response) => {
 try {
  const user = await createOne(req.body);
  return res.status(200).send(user);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};
const getAllUsers = async (req: Request, res: Response) => {
 try {
  const users = await getAll();
  return res.status(200).send(users);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};
const getUserById = async (req: Request<{ id: number }>, res: Response) => {
 const { id } = req.params;
 try {
  const user = await getOne(
   id,
   ["password"],
   [
    {
     model: Property,
     as: "listedProperties",
    },
   ]
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).send(user);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};
const getSessionUser = async (req: Request, res: Response) => {
 const { userId } = req.session;
 if (!userId) return res.status(404).json({ message: "User not found" });
 try {
  const user = await getOne(userId, ["password"]);
  return res.status(200).send(user);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};

const updateUserById = async (req: Request<{ id: string }>, res: Response) => {
 const { id } = req.params;
 try {
  const user = await updateOne(Number(id), req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).send(user);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};

const deleteProfile = async (req: Request<{ id: number }>, res: Response) => {
 const { id } = req.params;
 try {
  const { userId } = req.session;
  if (userId !== id) return res.status(401).json({ message: "Unauthorized" });
  const user = await deleteOne(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ message: "Deleted user" });
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};
const deleteUserById = async (req: Request<{ id: number }>, res: Response) => {
 const { id } = req.params;
 try {
  const user = await deleteOne(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ message: "Deleted user" });
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};

export {
 getAllUsers,
 deleteUserById,
 getUserById,
 updateUserById,
 getSessionUser,
 deleteProfile,
 createUser,
};
