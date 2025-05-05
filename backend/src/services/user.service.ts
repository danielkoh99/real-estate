import { FindOptions, UniqueConstraintError } from "sequelize";
import Property from "../db/models/Property/Property";
import User from "../db/models/User/User";
import { UserAttributes } from "../db/models/User/user.interface";
import logger from "../logger/logger";

const createOne = async (data: UserAttributes) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      console.log(error.errors[0].message);
      throw new Error(error.errors[0].message);
    } else {
      throw new Error("not found");
    }
  }
};
const updateOne = async (id: number, data: Partial<UserAttributes>) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  const updatedUser = await User.update(data, {
    where: {
      id: id,
    },
  });
  return updatedUser;
};

const getOne = async <
  T extends keyof typeof User.prototype
>(
  id: number,
  excludedAttributes: T[] = [],
  include: FindOptions["include"] = []
) => {
  const item = await User.findByPk(id, {
    attributes: { exclude: excludedAttributes.length > 0 ? excludedAttributes : [] },
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
