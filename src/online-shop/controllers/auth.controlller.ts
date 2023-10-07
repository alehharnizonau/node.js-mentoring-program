import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { usersService } from "../services/users.service";
import { ErrorObject } from "../types";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(HTTP_STATUSES.Unauthorized).json({
        data: null,
        error: {
          message: "User is not authorized",
        },
      });
    }

    (req as any).user = await usersService.getUser(userId);
    next();
  } catch (err) {
    const { status, message } = err as ErrorObject;
    res.status(err instanceof Error ? HTTP_STATUSES.ServerError : status).json({
      data: null,
      error: {
        message: err instanceof Error ? err.message : message,
      },
    })
  }
}