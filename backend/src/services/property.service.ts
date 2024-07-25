import Property from "../db/models/Property/Property";
import User from "../db/models/User/User";

const createProperty = async (data: any) => {
  const user = await Property.create(data);
  return user;
};
const updateProperty = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("not found");
  }
  const updatedUser = await User.update(data, {
    where: {
      id: data.id,
    },
  });
  return updatedUser;
};
const getPropertybyId = async (id: any) => {
  const user = await User.findByPk(id);
  return user;
};
const deletePropertybyId = async (data: any) => {
  const user = await User.destroy({
    where: {
      id: data.id,
    },
  });
  return user;
};
async function getPropertiesByUserId(userId: number) {
  try {
    const properties = await Property.findAll({
      where: { listedByUserId: userId },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "address", "price", "createdAt"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"], // Adjust attributes as needed
        },
      ],
    });
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}
getPropertiesByUserId(1)
  .then((properties) => {
    console.log("Properties for user:", properties);
  })

  .catch((error) => {
    console.error("Error:", error);
  });
export default {
  createProperty,
  updateProperty,
  deletePropertybyId,
  getPropertybyId,
  getPropertiesByUserId,
};
