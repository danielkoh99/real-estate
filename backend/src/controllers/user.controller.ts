import { Request, Response } from "express";
import { getAll, getOne, deleteOne, updateOne } from "../services/user.service";
import logger from "../logger/logger";
import Property from "../db/models/Property/Property";
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
    const user = await getOne(id,
      ['password'],
      [{
        model: Property,
        as: "listedProperties",
      }]
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
    const user = await getOne(userId, ['password'], [{
      model: Property,
      as: "listedProperties",
    }]);
    return res.status(200).send(user);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

const updateUserById = async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;
  try {
    const user = await updateOne(id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).send(user);
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


export { getAllUsers, deleteUserById, getUserById, updateUserById, getSessionUser };
