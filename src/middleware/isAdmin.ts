import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../utils";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;

  if (currentUser.role !== "admin") {
    return res.status(HTTP_STATUSES.Forbidden).json({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
  }
  next();
};
