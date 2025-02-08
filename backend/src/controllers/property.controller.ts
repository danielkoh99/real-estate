import { Request, Response } from "express";
import {
  getOne,
  deleteOne,
  createPropertyWithImages,
  getPropertiesByFilter,
  getRelatedProperties,
} from "../services/property.service";
import {
  getOne as getUser,
} from "../services/user.service";
import logger from "../logger/logger";
import { CustomRequest, PropertyParams, PropertyType } from "../types/types";
import { BPDistricts, PropertyAttributes } from "../db/models/Property/property.interface";
import Property from "../db/models/Property/Property";
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

const getProperties = async (req: Request<{}, {}, {}, PropertyParams>, res: Response) => {
  try {
    const { priceMax, priceMin, sizeMax, sizeMin, type, listedByUserId, page, limit, sortBy, sortDirection, districts } = req.query;

    const properties = await getPropertiesByFilter({
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      sizeMin: sizeMin ? Number(sizeMin) : undefined,
      sizeMax: sizeMax ? Number(sizeMax) : undefined,
      type: type ? type as PropertyType : undefined,
      listedByUserId: listedByUserId ? Number(listedByUserId) : undefined,
      page: page ? Number(page) : 1,  // Page number
      limit: limit ? Number(limit) : 10, // Number of items per page
      sortBy: sortBy ? sortBy as string : undefined,
      sortDirection: sortDirection ? sortDirection as string : undefined,
      districts: typeof districts === "string"
        ? (districts.split(",") as BPDistricts[])
        : undefined
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

const relatedProperties = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const relatedProperties = await getRelatedProperties(id);
    res.status(200).send(relatedProperties);
  } catch (err) {
    res.status(500).json(err);
  }
};

const savePropertyListing = async (req: CustomRequest, res: Response) => {
  const userId = req.session.userId;
  logger.info(userId)
  try {
    const { propertyId, userId } = req.body;
    const user = await getUser(userId)
    if (!user) return res.status(404).json({ message: "User not found" });
    const isSaved = await user.hasSavedProperty(propertyId);
    if (isSaved) {
      await user.removeSavedProperty(propertyId);
      return res.status(200).json({ message: "Property unsaved successfully" });
    }
    await user.addSavedProperty(propertyId);
    return res.status(200).json({ message: "Property saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save property", error });
  }
};

const getSavedProperties = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.status(404).json({ message: "User not found" });
  try {
    const user = await getUser(userId)
    if (!user) return res.status(404).json({ message: "User not found" });
    const userSavedProperties = await user.getSavedProperties()
    const mappedToId = userSavedProperties.map(property => property.id)
    return res.status(200).send(mappedToId);
  } catch (err) {
    logger.error(err);
    return res.status(500).send(err);
  }
}
const getListedProperties = async (req: Request<{ userId: number }>, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await getUser(userId,
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
}
export {
  createProperty,
  getProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  relatedProperties,
  savePropertyListing,
  getSavedProperties,
  getListedProperties
};
