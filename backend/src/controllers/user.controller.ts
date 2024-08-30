import { Request, Response } from "express";
import { getAll, getOne, deleteOne, updateOne } from "../services/user.service";
import logger from "../logger/logger";
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAll();
    return res.status(200).send(users);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getOne(id);
    return res.status(200).send(user);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const updateUserById = async (req: Request, res: Response) => {};

const deleteUserById = async (req: Request, res: Response) => {};

export { getAllUsers, deleteUserById, getUserById, updateUserById };
