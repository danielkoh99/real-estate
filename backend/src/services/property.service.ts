import multer from "multer";
import PropertyImage from "../db/models/Image/Image";
import Property from "../db/models/Property/Property";
import { PropertyAttributes } from "../db/models/Property/property.interface";
import logger from "../logger/logger";
import { uploadImageToS3 } from "../utils/s3Upload";
import User from "../db/models/User/User";
import { Op } from "sequelize";
import { PropertyFilter } from "../types/types";

export const createPropertyWithImages = async (
  data: PropertyAttributes,
  f: Express.Multer.File[]
) => {
  if (!f || (f as Express.Multer.File[]).length === 0) {
    return { message: "Please upload at least one image" };
  }

  const files = f as Express.Multer.File[];

  try {
    const { title, address, price, type, listedByUserId } = data;

    // Create property
    const property = await Property.create({
      title,
      address,
      price,
      type,
      listedByUserId,
    });

    // Upload each image to S3 and store the URL in the database
    const imageUploadPromises = files.map((file) => {
      // Save the image URL in the PropertyImage model
      return PropertyImage.create({
        url: file.path,
        propertyId: property.id,
      });
    });

    await Promise.all(imageUploadPromises);
    return property;
  } catch (error) {
    logger.error("Error creating property with images:", error);
    return;
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
const createOne = async (data: any) => {
  const property = await Property.create(data);
  return property;
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
        attributes: ["firstName", "lastName"],
      },
    ],
  });
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
          attributes: ["id", "firstName", "lastName", "email"], // Adjust attributes as needed
        },
      ],
    });
    return properties;
  } catch (error) {
    logger.error("Error fetching properties:", error);
    throw error;
  }
}



const isFiltering = (filters: PropertyFilter): boolean => {
  return filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.sizeMin !== undefined ||
    filters.sizeMax !== undefined ||
    filters.type !== undefined ||
    filters.listedByUserId !== undefined;
};
export const getPropertiesByFilter = async (filters: PropertyFilter) => {
  const limit = filters.limit || 10; // Default to 10 items per page
  const page = filters.page || 1;
  const offset = (page - 1) * limit; // Calculate the offset
  const whereClause: any = {};

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

    if (filters.listedByUserId) {
      whereClause.listedByUserId = filters.listedByUserId;
    }
  }
  // Query the Property model with pagination and filters
  const properties = await Property.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: PropertyImage,
        as: "images", // Include associated images
      },
    ],
    limit,   // Limit the number of results per page
    offset,  // Skip the number of records defined by the offset
  });

  // Return the results along with pagination info
  return {
    properties: properties.rows,
    totalItems: properties.count,
    totalPages: Math.ceil(properties.count / limit),
    currentPage: page,
  };
};
export { createOne, updateOne, getOne, deleteOne, getByUserId, getAll };
