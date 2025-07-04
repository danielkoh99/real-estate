import "./models";
import "./models/associations";

import db from "./config_postgres";

const isDev = process.env.NODE_ENV === "development";

const dbInit = async () => {
 try {
  await db.authenticate();
  console.log("✅ Database connection established.");

  if (isDev) {
   await db.sync({ alter: true });
   console.log("🛠️ Database synchronized (dev mode).");
  }
 } catch (error) {
  console.error("❌ Unable to connect to the database:", error);
  throw error;
 }
};

export default dbInit;
