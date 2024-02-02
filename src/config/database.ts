import mongoose from "mongoose";
import logger from "../log/logger";
import config from "../../config";

export const connect = async () => {
  try {
    await mongoose.connect(config.db_uri);
    logger.info("Successfully connected to database");
  } catch (e) {
    logger.error("DataBase connection failed");
    console.error(e);
  }
};
