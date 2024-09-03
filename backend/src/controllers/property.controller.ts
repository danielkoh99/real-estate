import { Request, Response } from "express";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
  createPropertyWithImages,
} from "../services/property.service";
import logger from "../logger/logger";
import { CustomRequest } from "../types/types";
import { PropertyAttributes } from "../db/models/Property/property.interface";
const createProperty = async (req: CustomRequest, res: Response) => {
  try {
    const data = req.body as PropertyAttributes;
    const files = req.files as Express.Multer.File[];
    data.listedByUserId = req.userId;
    logger.info(files);
    const response = await createPropertyWithImages(data, files);
    return res.status(200).send(response);
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
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
