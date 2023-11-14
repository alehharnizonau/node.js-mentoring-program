import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../utils";
import mongoose from "mongoose";
import debug from "debug";
import { DatabaseStateMessage } from "../types";

export const getHealthCheckRoute = (router: Router) =>
  router.get("/", async (req: Request, res: Response) => {
    const databaseLog = debug("online-shop:database");
    try {
      const checkState = await mongoose.connection.readyState;
      if (checkState === 1) {
        databaseLog(DatabaseStateMessage.Healthy);
        return res.send({
          data: { message: DatabaseStateMessage.Healthy },
          error: null,
        });
      }
      databaseLog(DatabaseStateMessage.Error);
      res.status(HTTP_STATUSES.ServerError).json({
        data: null,
        error: {
          message: DatabaseStateMessage.Error,
        },
      });
    } catch (err) {
      res.status(HTTP_STATUSES.ServerError).json({
        data: null,
        error: { message: err || DatabaseStateMessage.Error },
      });
    }
  });
