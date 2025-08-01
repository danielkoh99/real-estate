import { BPDistricts, BuildingType, HeatingType, PropertyType } from "@real-estate/shared";
import { NextFunction, Request, Response } from "express";

import { Location, PropertyImage } from "@/db/models";

import { PropertyAttributes } from "../db/models/Property/Property";
import logger from "../logger/logger";
import {
 createOne,
 deleteOne,
 getOne,
 getPropertiesByFilter,
 getRelatedProperties,
} from "../services/property.service";
import { getOne as getUser } from "../services/user.service";
import { CustomRequest, PropertyParams } from "../types/types";
const createProperty = async (
 req: Request<{}, {}, PropertyAttributes & { imagePaths: string[] }>,
 res: Response
) => {
 try {
  const data = req.body;
  const files = req.body.imagePaths as string[];
  const userId = req.user.id;
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
  const {
   priceMax,
   priceMin,
   sizeMax,
   sizeMin,
   type,
   listedByUserId,
   page,
   limit,
   sortBy,
   sortDirection,
   districts,
   petFriendly,
   level,
   buildingType,
   hasGarden,
   hasTerrace,
   heatingType,
   parkingSpace,
   hasElevator,
  } = req.query;

  const properties = await getPropertiesByFilter({
   priceMin: priceMin ? Number(priceMin) : undefined,
   priceMax: priceMax ? Number(priceMax) : undefined,
   sizeMin: sizeMin ? Number(sizeMin) : undefined,
   sizeMax: sizeMax ? Number(sizeMax) : undefined,
   type: type ? (type as PropertyType) : undefined,
   listedByUserId: listedByUserId ? Number(listedByUserId) : undefined,
   page: page ? Number(page) : 1,
   limit: limit ? Number(limit) : 10,
   sortBy: sortBy ? (sortBy as string) : undefined,
   sortDirection: sortDirection ? (sortDirection as string) : undefined,
   districts: typeof districts === "string" ? (districts.split(",") as BPDistricts[]) : undefined,
   petFriendly: petFriendly ? Boolean(petFriendly) : undefined,
   level: typeof level === "string" ? (level.split(",") as string[]) : undefined,
   buildingType: buildingType ? (buildingType as BuildingType) : undefined,
   hasGarden: hasGarden ? Boolean(hasGarden) : undefined,
   hasTerrace: hasTerrace ? Boolean(hasTerrace) : undefined,
   heatingType: heatingType ? (heatingType as HeatingType) : undefined,
   parkingSpace: parkingSpace ? Boolean(parkingSpace) : undefined,
   hasElevator: hasElevator ? Boolean(hasElevator) : undefined,
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
const updatePropertyById = async (req: Request, res: Response) => {};

const deletePropertyById = async (req: Request, res: Response) => {
 const { id } = req.params;
 try {
  const property = await deleteOne(id);
  return res.status(200).send(property);
 } catch (err) {
  return res.status(500).json(err);
 }
};

const relatedProperties = async (req: Request, res: Response, next: NextFunction) => {
 const { id } = req.params;
 try {
  const relatedProperties = await getRelatedProperties(id);
  res.status(200).send(relatedProperties);
 } catch (err) {
  next(err);
 }
};

const savePropertyListing = async (req: CustomRequest, res: Response, next: NextFunction) => {
 try {
  const { propertyId, userId } = req.body;
  const user = await getUser(userId);
  if (!user) throw new Error("User not found");
  const isSaved = await user.hasSavedProperty(propertyId);
  const isListed = await user.hasListedProperty(propertyId);
  if (isListed) {
   throw new Error("Property listed cannot be saved");
  }
  if (isSaved) {
   await user.removeSavedProperty(propertyId);
   res.status(200).json({ message: "Property unsaved successfully" });
  } else {
   await user.addSavedProperty(propertyId);
   res.status(200).json({ message: "Property saved successfully" });
  }
 } catch (error) {
  next(error);
 }
};

const getSavedProperties = async (req: Request, res: Response) => {
 logger.info(JSON.stringify(req.user));
 try {
  const userId = req.user.id;
  if (!userId) return res.status(404).json({ message: "User id found" });
  const user = await getUser(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  const userSavedProperties = await user.getSavedProperties({
   attributes: [
    "id",
    "description",
    "price",
    "size",
    "type",
    "yearBuilt",
    "address",
    "city",
    "district",
    "category",
    "bedrooms",
    "bathrooms",
    "squarMeterPrice",
   ],
   include: [
    {
     model: PropertyImage,
     as: "images",
    },
    {
     model: Location,
     as: "location",
     attributes: ["lat", "lon", "boundingbox"],
    },
   ],
  });
  return res.status(200).send(userSavedProperties);
 } catch (err) {
  logger.error(err);
  return res.status(500).send(err);
 }
};
const getListedProperties = async (req: Request, res: Response, next: NextFunction) => {
 const userId = req.user.id;
 try {
  const user = await getUser(userId);
  if (!user) throw new Error("User not found");
  const listedProperties = await user?.getListedProperties({
   include: [
    {
     model: PropertyImage,
     as: "images",
    },
    {
     model: Location,
     as: "location",
     attributes: ["lat", "lon", "boundingbox"],
    },
   ],
  });
  if (!listedProperties) throw new Error("No listed properties found");
  res.status(200).send(listedProperties);
 } catch (err) {
  next(err);
 }
};
export {
 createProperty,
 deletePropertyById,
 getListedProperties,
 getProperties,
 getPropertyById,
 getSavedProperties,
 relatedProperties,
 savePropertyListing,
 updatePropertyById,
};
