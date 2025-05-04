import PropertyImage from "../db/models/Image/Image";
import Property from "../db/models/Property/Property";
import { PropertyAttributes } from "../db/models/Property/property.interface";
import logger from "../logger/logger";
import User from "../db/models/User/User";
import { Op } from "sequelize";
import { PropertyParams } from "../types/types";
import Location from "../db/models/Location/Location";
import fetchPropertyLocation from "../utils/fetchPropertyLocation";
import { createLocation, getAllLocations } from "./location.service";
const getNearbyProperties = async (lat: number, lon: number, minLat: number, maxLat: number, minLon: number, maxLon: number) => {
  try {
    const locations = await getAllLocations({
      where: {
        lat: { [Op.between]: [minLat, maxLat] },
        lon: { [Op.between]: [minLon, maxLon] }
      }
    })
    return locations
  } catch (error) {
    logger.error("Error fetching nearby properties:", error);
    return [];
  }
}
const createOne = async (data: PropertyAttributes, files: string[]) => {

  try {
    const { address, price, type, listedByUserId, size, bedrooms, bathrooms, yearBuilt, category, city, district, description } = data;
    const computedAddress = `${data.address} ${data.city}`;
    const response = await fetchPropertyLocation(computedAddress);

    if ("message" in response) {
      throw new Error(response.message);
    }

    const { lat, lon, boundingbox } = response;

    const location = await createLocation({
      lat,
      lon,
      boundingbox
    });

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
      description,
      squarMeterPrice: price / size,
      locationId: location.id,
    });

    const imageUploadPromises = files.map((file) => {
      const imageUrl = `${process.env.SERVER_URL}/uploads/${listedByUserId}/${file}`;
      return PropertyImage.create({
        url: imageUrl,
        propertyId: property.id,
      });
    });

    await Promise.all(imageUploadPromises);

    return { message: "Property created successfully", id: property.id };
  } catch (error) {
    logger.error("Error creating property ", error);
    return { error: true, status: 500, message: "An error occurred while creating the property" };
  }
};

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
        attributes: ["lat", "lon", "boundingbox"]
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
        attributes: ["lat", "lon", "boundingbox"],

      },
    ],
  });
  return property;
}

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
  let page = filters.page || 1;
  const offset = (page - 1) * limit;
  const whereClause: any = {};
  const order: any = [];

  if (isFiltering(filters)) {
    if (filters.priceMin || filters.priceMax) {
      whereClause.price = {};
      if (filters.priceMin) whereClause.price[Op.gte] = filters.priceMin;
      if (filters.priceMax) whereClause.price[Op.lte] = filters.priceMax;
    }

    if (filters.sizeMin || filters.sizeMax) {
      whereClause.size = {};
      if (filters.sizeMin) whereClause.size[Op.gte] = filters.sizeMin;
      if (filters.sizeMax) whereClause.size[Op.lte] = filters.sizeMax;
    }

    if (filters.type) {
      whereClause.type = filters.type;
    }

    if (filters.districts?.length) {
      whereClause.district = { [Op.in]: filters.districts };
    }

    if (filters.sortBy) {
      order.push([filters.sortBy || "createdAt", filters.sortDirection || "ASC"]);
    }
  }

  const { count: totalItems } = await Property.findAndCountAll({
    where: whereClause,
    distinct: true,
  });

  const totalPages = Math.ceil(totalItems / limit) || 1;
  if (page > totalPages) page = 1;

  const properties = await Property.findAll({
    where: whereClause,
    include: [
      {
        model: PropertyImage,
        as: "images",
        required: false,
      },
    ],
    limit,
    offset: (page - 1) * limit,
    order,
  });

  return {
    properties,
    totalItems,
    totalPages,
    currentPage: page,
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
