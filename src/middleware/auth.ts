import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CurrentUser } from "../types";
import { HTTP_STATUSES } from "../utils";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(HTTP_STATUSES.Unauthorized).json({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(HTTP_STATUSES.Forbidden).json({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;

    req.user = user;
  } catch (err) {
    return res.status(HTTP_STATUSES.Unauthorized).json({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  }
  return next();
};
