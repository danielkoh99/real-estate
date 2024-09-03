import multer from "multer";
import PropertyImage from "../db/models/Image/Image";
import Property from "../db/models/Property/Property";
import { PropertyAttributes } from "../db/models/Property/property.interface";
import User from "../db/models/User/User";
import logger from "../logger/logger";
import { uploadImageToS3 } from "../utils/s3Upload";

export const createPropertyWithImages = async (
  data: PropertyAttributes,
  f: Express.Multer.File[]
) => {
  console.log(data);
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
        model: User,
        as: "user",
        attributes: ["username", "email"], // Adjust attributes as needed
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
          attributes: ["id", "username", "email"], // Adjust attributes as needed
        },
      ],
    });
    return properties;
  } catch (error) {
    logger.error("Error fetching properties:", error);
    throw error;
  }
}
export { createOne, updateOne, getOne, deleteOne, getByUserId, getAll };
