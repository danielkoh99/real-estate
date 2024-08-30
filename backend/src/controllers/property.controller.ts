import { Request, Response } from "express";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} from "../services/property.service";
import logger from "../logger/logger";
const createSavedProperty = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const property = await createOne(data);
    return res.status(200).send(property);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await getAll();
    return res.status(200).send(properties);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getOne(id);
    return res.status(200).send(user);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const updatePropertyById = async (req: Request, res: Response) => {};

const deletePropertyById = async (req: Request, res: Response) => {};

export {
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
