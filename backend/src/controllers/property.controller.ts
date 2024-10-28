import { Request, Response } from "express";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
  createPropertyWithImages,
  getPropertiesByFilter,
} from "../services/property.service";
import logger from "../logger/logger";
import { CustomRequest, PropertyQueryParams, PropertyType } from "../types/types";
import { PropertyAttributes } from "../db/models/Property/property.interface";
const createProperty = async (req: CustomRequest, res: Response) => {
  try {
    const data = req.body as PropertyAttributes;
    const files = req.files as Express.Multer.File[];
    data.listedByUserId = req.userId;
    const response = await createPropertyWithImages(data, files);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

const getProperties = async (req: Request<{}, {}, {}, PropertyQueryParams>, res: Response) => {
  try {
    const { priceMax, priceMin, sizeMax, sizeMin, type, listedByUserId, page, limit } = req.query;

    const properties = await getPropertiesByFilter({
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      sizeMin: sizeMin ? Number(sizeMin) : undefined,
      sizeMax: sizeMax ? Number(sizeMax) : undefined,
      type: type ? type as PropertyType : undefined,
      listedByUserId: listedByUserId ? Number(listedByUserId) : undefined,
      page: page ? Number(page) : 1,  // Page number
      limit: limit ? Number(limit) : 10, // Number of items per page
    });
    return res.status(200).send(properties);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const property = await getOne(id);
    return res.status(200).send(property);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};
const updatePropertyById = async (req: Request, res: Response) => { };

const deletePropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const property = await deleteOne(id);
    return res.status(200).send(property);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
};

export {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
