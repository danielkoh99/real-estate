import PropertyImage from "../db/models/Image/Image";
import Property from "../db/models/Property/Property";
import { PropertyAttributes } from "../db/models/Property/property.interface";
import logger from "../logger/logger";
import { uploadImageToS3 } from "../utils/s3Upload";
import User from "../db/models/User/User";
import { Op } from "sequelize";
import { PropertyParams } from "../types/types";
import axios from 'axios';
import Location from "../db/models/Location/Location";
import fetchPropertyLocation from "../utils/fetchPropertyLocation";
import { getAllLocations } from "./location.service";
const getNearbyProperties = async (lat: number, lon: number, boundingBox: [number, number, number, number]) => {
  try {
    const locations = await getAllLocations()
  } catch (error) {
    logger.error("Error fetching nearby properties:", error);
    return [];
  }
}
const createOne = async (data: PropertyAttributes, files: string[]) => {
  if (!files || files.length === 0) {
    return { message: "Please upload at least one image" };
  }

  try {
    const { address, price, type, listedByUserId, size, bedrooms, bathrooms, yearBuilt, category, city, district } = data;
    const computedAddress = data.address + " " + data.city;
    const { lat, lon, boundingBox } = await fetchPropertyLocation(computedAddress)
    const location = await Location.create({
      lat,
      lon,
      boundingBox
    })
    const property = await Property.create({
      address,
      price,
      bedrooms,
      bathrooms,
      yearBuilt,
      city,
      district,
      category,
      size,
      type,
      listedByUserId,
      squarMeterPrice: price / size,
      locationId: location.id,
    });

    const imageUploadPromises = files.map((file) => {
      const imageUrl = `http://localhost:3000/uploads/${listedByUserId}/${file}`;
      return PropertyImage.create({
        url: imageUrl,
        propertyId: property.id,
      });
    });

    await Promise.all(imageUploadPromises);

    return { message: "Property created successfully", property };
  } catch (error) {
    logger.error("Error creating property ", error);
    return { message: "An error occurred" };
  }
};
// export const createPropertyWithImages = async (
//   data: PropertyAttributes,
//   files: Express.Multer.File[]
// ) => {
//   try {
//     const { title, address, price, type, listedByUserId } = data;

//     // Create property
//     const property = await Property.create({
//       title,
//       address,
//       price,
//       type,
//       listedByUserId,
//     });

//     // Upload each image to S3 and store the URL in the database
//     const imageUploadPromises = files.map(async (file) => {
//       const imageUrl = await uploadImageToS3(file);

//       // Save the image URL in the PropertyImage model
//       return PropertyImage.create({
//         url: imageUrl,
//         propertyId: property.id,
//       });
//     });

//     await Promise.all(imageUploadPromises);
//     return property;
//   } catch (error) {
//     logger.error("Error creating property with images:", error);
//     return;
//   }
// };

const updateOne = async (id: number, data: any) => {
  const user = await Property.findByPk(id);
  if (!user) {
    throw new Error("not found");
  }
  const updatedProperty = await Property.update(data, {
    where: {
      id: data.id,
    },
  });
  return updatedProperty;
};


const getAll = async () => {
  const property = await Property.findAll({
    include: [
      {
        model: PropertyImage,
        as: "images",
        attributes: ["id", "url"],
      },
      {
        model: Location,
        as: "location",
        attributes: ["lat", "lon", "boundingBox"]
      },
    ],
  });
  return property;
};
const getOne = async (id: any) => {
  const property = await Property.findByPk(id, {
    include: [
      {
        model: PropertyImage,
        as: "images",
        attributes: ["id", "url"],
      },
      {
        model: User,
        as: "listedByUser",
        attributes: ["firstName", "lastName", "email", "phone", "id"],
      },
      {
        model: Location,
        as: "location",
        attributes: ["lat", "lon", "boundingBox"],
      },
    ],
  });
  if (property && property.location) {
    const boundingBox = property.location.boundingBox;
    if (boundingBox && typeof boundingBox === 'string') {
      property.location.boundingBox = JSON.parse(boundingBox)
    }
  }
  return property;
};

const deleteOne = async (id: string) => {
  const property = await Property.destroy({
    where: {
      id: id,
    },
  });
  return property;
};

async function getByUserId(userId: number) {
  try {
    const properties = await Property.findAll({
      where: { listedByUserId: userId },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "address", "price", "createdAt"],
      include: [
        {
          model: Property,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email", "phone"],
        },
      ],
    });
    return properties;
  } catch (error) {
    logger.error("Error fetching properties:", error);
    throw error;
  }
}

const isFiltering = (filters: PropertyParams): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (value == null) return false;
    if (typeof value === "string") return value.trim() !== "";
    return true;
  });
};

export const getPropertiesByFilter = async (filters: PropertyParams) => {
  const limit = filters.limit || 10;
  const page = filters.page || 1;

  const offset = (page - 1) * limit;
  const whereClause: any = {};
  const order: any = [];

  if (isFiltering(filters)) {
    if (filters.priceMin || filters.priceMax) {
      whereClause.price = {};
      if (filters.priceMin) {
        whereClause.price[Op.gte] = filters.priceMin;
      }
      if (filters.priceMax) {
        whereClause.price[Op.lte] = filters.priceMax;
      }
    }

    if (filters.sizeMin || filters.sizeMax) {
      whereClause.size = {};
      if (filters.sizeMin) {
        whereClause.size[Op.gte] = filters.sizeMin;
      }
      if (filters.sizeMax) {
        whereClause.size[Op.lte] = filters.sizeMax;
      }
    }

    if (filters.type) {
      whereClause.type = filters.type;
    }
    if (filters.districts && filters.districts.length > 0) {
      whereClause.district = { [Op.in]: filters.districts };
    }

    if (filters.sortBy) {
      order.push([filters.sortBy || "createdAt", filters.sortDirection || "ASC"]);
    }
  }
  const properties = await Property.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: PropertyImage,
        as: "images",
        required: false,
      },
    ],
    distinct: true,
    limit,
    offset,
    order
  });

  const totalItems = properties.count;
  const totalPages = Math.ceil(totalItems / limit);

  const currentPage = page > totalPages ? totalPages : page;
  const rows = page > totalPages ? [] : properties.rows;

  return {
    properties: rows,
    totalItems,
    totalPages,
    currentPage,
  };
};
const getRelatedProperties = async (propertyId: string) => {
  // !TODO get related properties based on location
  // Fetch the main property
  const mainProperty = await Property.findByPk(propertyId);
  if (!mainProperty) {
    throw new Error("Property not found");
  }

  // Find related properties based on price range and type
  const relatedProperties = await Property.findAll({
    where: {
      id: { [Op.ne]: propertyId }, // Exclude the current property
      type: mainProperty.type, // Match the same type
      [Op.or]: [
        {
          price: {
            [Op.between]: [
              mainProperty.price * 0.8, // 20% below the price
              mainProperty.price * 1.2, // 20% above the price
            ],
          },
        },
        {
          size: {
            [Op.between]: [
              mainProperty.size * 0.8, // 20% below the size
              mainProperty.size * 1.2, // 20% above the size
            ],
          },
        },
      ],
    },
    limit: 10,
    include: [
      {
        model: PropertyImage,
        as: "images",
      },
    ],
  });
  return relatedProperties;
};
export { createOne, updateOne, getOne, deleteOne, getByUserId, getAll, getRelatedProperties };
