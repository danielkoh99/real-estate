import PropertyImage from "../db/models/Image/Image";
import Property from "../db/models/Property/Property";
import User from "../db/models/User/User";
import logger from "../logger/logger";

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
