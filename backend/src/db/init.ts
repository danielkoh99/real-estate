import User from "./models/User";
const isDev = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV);
const dbInit = async () => {
  await User.sync({ alter: isDev, force: isDev });
};
export default dbInit;
