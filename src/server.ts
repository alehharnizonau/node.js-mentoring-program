import dotenv from "dotenv";
import { connect } from "./config/database";
import express, { Router } from "express";
import {
  cartsController,
  healthCheckController,
  productsController,
  userController,
} from "./controllers";
import { CurrentUser } from "./types";
import { verifyToken } from "./middleware/auth";
import morgan from "morgan";
import logger from "./log/logger";

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser;
    }
  }
}

export const bootstrap = async () => {
  dotenv.config();
  await connect();
  const app = express();

  const logStream = (message: string) => {
    logger.info(message.trim());
  };

  app.use(
    morgan("combined", {
      stream: {
        write: logStream,
      },
    }),
  );

  app.use(express.json());
  app.use("/health", healthCheckController(Router()));
  app.use("/api", userController(Router()));
  app.use("/api", verifyToken);
  app.use("/api/products", productsController(Router()));
  app.use("/api/profile/cart", cartsController(Router()));

  return app;
};
