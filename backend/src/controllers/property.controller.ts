import { Request, Response } from "express";
import {
  getOne,
  deleteOne,
  getPropertiesByFilter,
  getRelatedProperties,
  createOne,
} from "../services/property.service";
import {
  getOne as getUser,
} from "../services/user.service";
import logger from "../logger/logger";
import { CustomRequest, PropertyParams } from "../types/types";
import { BPDistricts, PropertyAttributes, PropertyType } from "../db/models/Property/property.interface";
import Property from "../db/models/Property/Property";
const createProperty = async (req: CustomRequest, res: Response) => {
  try {
    const data = req.body as PropertyAttributes;
    const files = req.body.imagePaths as string[];
    const userId = req.session.userId;
    data.listedByUserId = userId;
    const response = await createOne(data, files);
    if (response.error) {
      return res.status(response.status).send(response);
    }
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
    return res.status(500).send(err);
  }
};
const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const property = await getOne(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found", propertyId: id });
    }

    return res.status(200).json(property);
  } catch (err: any) {
    console.error("Error fetching property:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
const updatePropertyById = async (req: Request, res: Response) => { };

const deletePropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const property = await deleteOne(id);
    return res.status(200).send(property);
  } catch (err) {
    return res.status(500).json(err);
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
    const userSavedProperties = await user.getSavedProperties({
      attributes: [
        'id', 'description', 'price', 'size', 'type', 'yearBuilt', 'address', 'city', 'district', 'category', 'bedrooms', 'bathrooms', 'squarMeterPrice'
      ]
    })
    return res.status(200).send(userSavedProperties);
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
