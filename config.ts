import dotenv from "dotenv";

dotenv.config();

export const config = {
  app_name: process.env["APP_NAME"],
  port: process.env["API_PORT"] ?? 3000,
  db_uri: process.env["MONGO_URI"] ?? "mongodb://localhost:27017/online-shop",
  db_options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default config;
