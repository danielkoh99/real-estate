import User from "../models/User";

const createUser = async (data: any) => {
  const user = await User.create(data);
  return user;
};
const updateUser = async (id: number, data: any) => {
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
const getUserById = async (id: any) => {
  const user = await User.findByPk(id);
  return user;
};
const deleteUserById = async (data: any) => {
  const user = await User.destroy({
    where: {
      id: data.id,
    },
  });
  return user;
};
export default { createUser, updateUser, deleteUserById, getUserById };
