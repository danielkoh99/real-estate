import { Request, Response } from "express";
import { getUsers } from "../services/user.service";
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
export { getAllUsers };
