import User from "./models/User/User";

const isDev = process.env.NODE_ENV === "development";
const dbInit = async () => {
  await User.sync({ alter: isDev, force: isDev });
};
export default dbInit;
