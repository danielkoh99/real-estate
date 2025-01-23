import { Attributes, FindAttributeOptions, FindOptions, Model } from "sequelize";
import Property from "../db/models/Property/Property";
import User from "../db/models/User/User";
import { UserAttributes } from "../db/models/User/user.interface";

const createOne = async (data: any) => {
  const user = await User.create(data, { include: [Property] });
  return user;
};
const updateOne = async (id: number, data: any) => {
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
// const getOne = async (id: number) => {
//   const user = await User.findByPk(id, {
//     attributes: { exclude: ["password"] },
//     include: [
//       {
//         model: Property,
//         as: "listedProperties",
//       },
//       // {
//       //   model: Property,
//       //   as: "savedProperties",
//       //   through: {
//       //     attributes: [],
//       //   }
//       // },
//     ],
//   });
//   return user;
// };
const getOne = async <
  T extends keyof typeof User.prototype
>(
  id: number,
  excludedAttributes: T[] = [], // Typed attributes as keys of User
  include: FindOptions["include"] = [] // Include relationships
) => {
  const item = await User.findByPk(id, {
    attributes: { exclude: excludedAttributes.length > 0 ? excludedAttributes : [] }, // Set undefined if no attributes are provided
    include: include || [],
  });

  return item;
};

const getAll = async () => {
  const users = await User.findAll({
    include: [
      {
        model: Property,
        as: "savedProperties",
      },
      {
        model: Property,
        as: "listedProperties",
      },
    ],
  });
  return users;
};
const deleteOne = async (id: number) => {
  const user = await User.destroy({
    where: {
      id: id,
    },
  });
  return user;
};
export { getOne, createOne, updateOne, getAll, deleteOne };
