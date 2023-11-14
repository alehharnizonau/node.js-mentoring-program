import mongoose from "mongoose";
import logger from "../log/logger";

export const connect = async () => {
  const { MONGO_URI } = process.env;

  try {
    await mongoose.connect(String(MONGO_URI));
    logger.info("Successfully connected to database");
  } catch (e) {
    logger.error("DataBase connection failed");
    console.error(e);
  }
};
