import { FindOptions, Includeable, Op, UniqueConstraintError } from "sequelize";

import Property from "../db/models/Property/Property";
import User from "../db/models/User/User";
import { Roles, UserAttributes } from "../db/models/User/user.interface";

const createOne = async (data: User) => {
 try {
  const user = await User.create(data);
  return user;
 } catch (error) {
  if (error instanceof UniqueConstraintError) {
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

const getOne = async (
 { id, uuid }: { id?: number; uuid?: string },
 excludedAttributes: string[] = [],
 include: Includeable[] = []
) => {
 if (!id && !uuid) {
  throw new Error("Either id or uuid must be provided");
 }

 const where: any = {
  role: { [Op.ne]: Roles.admin },
 };

 if (id) where.id = id;
 if (uuid) where.uuid = uuid;

 const item = await User.findOne({
  where,
  attributes: { exclude: excludedAttributes },
  include,
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
export { createOne, deleteOne, getAll, getOne, updateOne };
